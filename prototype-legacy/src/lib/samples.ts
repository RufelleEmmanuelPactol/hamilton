// Illustrative proof-of-delivery photos (SVG) used by the simulator & driver demo.
const svg = (body: string, blur = false) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240">
      <defs><filter id="b"><feGaussianBlur stdDeviation="7"/></filter>
      <linearGradient id="w" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#e8e2d6"/><stop offset="1" stop-color="#d6cdbd"/></linearGradient></defs>
      <g ${blur ? 'filter="url(#b)"' : ""}>
        <rect width="320" height="240" fill="url(#w)"/>
        <rect x="0" y="190" width="320" height="50" fill="#9c8f7c"/>
        <rect x="105" y="30" width="110" height="165" rx="3" fill="#7a4b2a"/>
        <rect x="113" y="40" width="94" height="70" fill="#8d5a35"/>
        <rect x="113" y="118" width="94" height="68" fill="#8d5a35"/>
        <circle cx="196" cy="118" r="5" fill="#d9b44a"/>
        <rect x="232" y="60" width="34" height="22" rx="2" fill="#f5f5f4" stroke="#57534e"/>
        <text x="249" y="76" font-size="12" text-anchor="middle" font-family="Arial" fill="#292524">12</text>
        ${body}
      </g>
    </svg>`
  );

const box = `<g>
  <rect x="120" y="150" width="78" height="52" rx="3" fill="#c79a5b" stroke="#8a6431" stroke-width="2"/>
  <rect x="152" y="150" width="14" height="52" fill="#e9d3a6"/>
  <path d="M135 150 C 130 120, 150 108, 158 132 C 166 108, 190 118, 182 150 Z" fill="#e11d48"/>
  <circle cx="148" cy="128" r="9" fill="#f43f5e"/><circle cx="168" cy="124" r="10" fill="#be123c"/><circle cx="160" cy="138" r="8" fill="#fb7185"/>
  <path d="M150 140 l-6 12 M166 140 l5 12" stroke="#15803d" stroke-width="3"/>
</g>`;

export const SAMPLE_PHOTOS = {
  good: svg(box),
  blurry: svg(box, true),
  nopackage: svg(""),
};

export type SampleKind = keyof typeof SAMPLE_PHOTOS;
