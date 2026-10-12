// Pink Console preset for Tailwind. Usage: presets: [require('./design-system/tailwind.preset.js')]
module.exports = {
  theme: {
    extend: {
      colors: {
        bg: '#F7F8FA', panel: '#FFFFFF', sub: '#F9FAFB',
        line: { DEFAULT: '#E4E7EC', 2: '#D0D5DD' },
        ink: { DEFAULT: '#101828', 2: '#344054', mute: '#667085' },
        brand: { DEFAULT: '#E91E63', ink: '#C2185B', tint: '#FDECF3' },
        ai: { bg: '#FFF7FA', line: '#F8BBD0' },
        ok: { DEFAULT: '#067647', bg: '#ECFDF3', line: '#ABEFC6' },
        warn: { DEFAULT: '#B54708', bg: '#FFFAEB', line: '#FEDF89' },
        err: { DEFAULT: '#B42318', bg: '#FEF3F2', line: '#FECDCA' },
        info: { DEFAULT: '#175CD3', bg: '#EFF8FF', line: '#B2DDFF' },
        series: { 1: '#2E90FA', 2: '#7A5AF8', 3: '#E91E63', 4: '#F79009', 5: '#12B76A', 6: '#0BA5EC' },
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: { base: ['13px', '1.5'], tag: ['11px', '1.4'] },
      borderRadius: { tag: '4px', control: '6px', card: '8px' },
      boxShadow: { raised: '0 1px 2px rgba(16,24,40,.12)', pop: '0 12px 24px rgba(16,24,40,.14)' },
      height: { header: '52px', nav: '32px', btn: '34px' },
    },
  },
};
