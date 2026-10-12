// One-off: converts Claude Design canvas boards (design/project/*.dc.html) into React components.
// The output in src/boards/ is hand-edited afterwards, so do not re-run over edited files.
import { parse } from 'node-html-parser';
import fs from 'fs';
import path from 'path';

const SRC = path.resolve('../design/project');
const OUT = path.resolve(process.argv[2] || 'src/boards/raw');
fs.mkdirSync(OUT, { recursive: true });

const ROUTES = {
  'Main.dc.html': '/app', 'Plan.dc.html': '/app/dispatch', 'Approvals.dc.html': '/app/approvals',
  'Orders.dc.html': '/app/orders', 'Messages.dc.html': '/app/messages', 'Drivers.dc.html': '/app/drivers',
  'AddressBook.dc.html': '/app/addresses', 'Autonomy.dc.html': '/app/autonomy', 'Activity.dc.html': '/app/audit',
  'DriverRoute.dc.html': '/driver', 'DriverPOD.dc.html': '/driver/proof', 'DriverIncident.dc.html': '/driver/report',
  'CustomerThread.dc.html': '/customer',
};
const VOID = new Set(['img', 'input', 'br', 'hr', 'meta', 'link', 'source', 'area', 'col', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'ellipse', 'stop', 'use']);
const NO_WS = new Set(['table', 'thead', 'tbody', 'tfoot', 'tr', 'colgroup', 'svg', 'g', 'defs', 'ul', 'ol', 'select', 'linearGradient', 'radialGradient', 'pattern', 'clipPath', 'mask']);
const ATTR = { class: 'className', for: 'htmlFor', tabindex: 'tabIndex', colspan: 'colSpan', rowspan: 'rowSpan', readonly: 'readOnly', maxlength: 'maxLength', autocomplete: 'autoComplete', viewbox: 'viewBox', 'xlink:href': 'xlinkHref', checked: 'defaultChecked', value: 'defaultValue', srcset: 'srcSet', crossorigin: 'crossOrigin', preserveaspectratio: 'preserveAspectRatio', gradientunits: 'gradientUnits', patternunits: 'patternUnits' };
const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
const hole = (s) => { const m = /^\{\{\s*([\w.]+)\s*\}\}$/.exec(s.trim()); return m ? m[1] : null; };
const jsStr = (s) => JSON.stringify(s);

function styleObj(s) {
  const out = [];
  // split on ; not inside parentheses
  let depth = 0, cur = '';
  const parts = [];
  for (const ch of s) { if (ch === '(') depth++; if (ch === ')') depth--; if (ch === ';' && !depth) { parts.push(cur); cur = ''; } else cur += ch; }
  parts.push(cur);
  for (const p of parts) {
    const i = p.indexOf(':'); if (i < 0) continue;
    const k = p.slice(0, i).trim(); const v = p.slice(i + 1).trim(); if (!k) continue;
    const key = k.startsWith('--') ? jsStr(k) : camel(k);
    out.push(`${key}: ${jsStr(v.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&'))}`);
  }
  return `{{ ${out.join(', ')} }}`;
}

function attrs(el) {
  const res = [];
  for (const [k0, v] of Object.entries(el.attributes)) {
    const k = k0.toLowerCase();
    if (k === 'hint-placeholder-val' || k === 'data-dc-script') continue;
    if (k === 'style') { res.push(`style=${styleObj(v)}`); continue; }
    if (k.startsWith('on')) { const h = hole(v); res.push(`${k0}={h.${h}}`); continue; }
    if (k === 'href' && ROUTES[v]) { res.push(`href=${jsStr(ROUTES[v])}`); continue; }
    let name = ATTR[k] || (k.startsWith('aria-') || k.startsWith('data-') ? k : camel(k));
    const h = hole(v);
    if (h) { res.push(`${name}={v.${h}}`); continue; }
    if (v === '' && ['disabled', 'checked', 'readonly', 'required', 'hidden', 'open', 'selected', 'autofocus'].includes(k)) { res.push(name); continue; }
    res.push(`${name}=${jsStr(v.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&'))}`);
  }
  return res.length ? ' ' + res.join(' ') : '';
}

function text(t, parentTag) {
  if (!t.trim()) return NO_WS.has(parentTag) ? '' : (t.includes('\n') ? '{" "}' : t);
  // holes
  return t.replace(/\{\{\s*([\w.]+)\s*\}\}/g, '\u0000$1\u0001')
    .replace(/[{}]/g, (c) => `{'${c}'}`).replace(/[<>]/g, (c) => (c === '<' ? '&lt;' : '&gt;'))
    .replace(/\u0000([\w.]+)\u0001/g, '{v.$1}')
    .replace(/^\s*\n\s*/, '{" "}').replace(/\s*\n\s*$/, '{" "}').replace(/\s*\n\s*/g, ' ');
}

function node(n, parentTag, ind) {
  if (n.nodeType === 3) return text(n.rawText, parentTag);
  if (n.nodeType !== 1) return '';
  const tag = n.rawTagName;
  if (tag === 'sc-if') {
    const h = hole(n.getAttribute('value'));
    const inner = kids(n, parentTag, ind + 1);
    if (h === 'true') return `<>${inner}</>`;
    if (h === 'false') return '';
    return `{v.${h} && (<>${inner}</>)}`;
  }
  if (tag === 'style') return `<style dangerouslySetInnerHTML={{ __html: ${jsStr(n.rawText)} }} />`;
  const a = attrs(n);
  if (VOID.has(tag) && !n.childNodes.length) return `<${tag}${a} />`;
  return `<${tag}${a}>${kids(n, tag, ind + 1)}</${tag}>`;
}
function kids(n, tag, ind) { return n.childNodes.map((c) => node(c, tag, ind)).join(''); }

const names = [];
for (const f of fs.readdirSync(SRC).filter((f) => f.endsWith('.dc.html'))) {
  const s = fs.readFileSync(path.join(SRC, f), 'utf8');
  const root = parse(s, { comment: false, voidTag: { closingSlash: false } });
  const x = root.querySelector('x-dc');
  const rootDiv = x.childNodes.find((c) => c.nodeType === 1 && c.rawTagName === 'div');
  const name = f.replace('.dc.html', '');
  let body;
  const shell = rootDiv.childNodes.find((c) => c.nodeType === 1 && c.rawTagName === 'header' && /height: 52px/.test(c.getAttribute('style') || ''));
  if (shell) {
    const cols = rootDiv.childNodes.find((c) => c.nodeType === 1 && c.rawTagName === 'div');
    const parts = cols.childNodes.filter((c) => !(c.nodeType === 1 && c.rawTagName === 'nav'));
    body = parts.map((c) => node(c, 'div', 2)).join('');
    fs.writeFileSync(path.join(OUT, `${name}.shell.txt`), `<>${node(shell, 'div', 0)}${node(cols.childNodes.find((c) => c.rawTagName === 'nav'), 'div', 0)}</>`);
  } else {
    body = node(rootDiv, 'div', 0);
  }
  const holes = [...new Set([...s.matchAll(/\{\{\s*([A-Za-z_]\w*)/g)].map((m) => m[1]).filter((h) => h !== 'true' && h !== 'false'))];
  names.push(name);
  fs.writeFileSync(path.join(OUT, `${name}.tsx`),
`/* eslint-disable */
// Converted from design/project/${f}. Holes: ${holes.join(', ') || 'none'}
export default function ${name}Board({ v = {} as any, h = {} as any }: { v?: any; h?: any }) {
  return (<>${body}</>);
}
`);
}
console.log(names.join(' '));
