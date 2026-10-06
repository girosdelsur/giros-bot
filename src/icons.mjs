// icons.mjs — iconos "3D" (SVG con gradientes/brillos) en la paleta de marca
const defs = `<defs>
<linearGradient id="gGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFE38A"/><stop offset=".5" stop-color="#F2B92F"/><stop offset="1" stop-color="#C98A10"/></linearGradient>
<linearGradient id="gGoldD" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E7A928"/><stop offset="1" stop-color="#A86F08"/></linearGradient>
<linearGradient id="gGreen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#B9E07E"/><stop offset=".55" stop-color="#90C149"/><stop offset="1" stop-color="#5F8A22"/></linearGradient>
<linearGradient id="gGraf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5B6A80"/><stop offset="1" stop-color="#2A3442"/></linearGradient>
<radialGradient id="gSphere" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#C9EA92"/><stop offset=".55" stop-color="#90C149"/><stop offset="1" stop-color="#4E7A1A"/></radialGradient>
<linearGradient id="gRed" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF8A9B"/><stop offset="1" stop-color="#E23A55"/></linearGradient>
</defs>`;
const wrap = (vb, inner) => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">${defs}${inner}</svg>`;

const coin = (cx, cy, r, sym = "$") => `
<ellipse cx="${cx}" cy="${cy + r * .16}" rx="${r}" ry="${r}" fill="url(#gGoldD)"/>
<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#gGold)"/>
<circle cx="${cx}" cy="${cy}" r="${r * .78}" fill="none" stroke="#B8790A" stroke-width="${r * .07}" opacity=".55"/>
<text x="${cx}" y="${cy + r * .34}" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="${r * 1.05}" fill="#B8790A" opacity=".8">${sym}</text>
<path d="M${cx - r * .7} ${cy - r * .35} A${r * .8} ${r * .8} 0 0 1 ${cx + r * .1} ${cy - r * .78}" stroke="#fff" stroke-width="${r * .09}" fill="none" stroke-linecap="round" opacity=".7"/>`;

export const ICONS = {
  coin: wrap("0 0 200 200", coin(100, 96, 80)),
  coins: wrap("0 0 300 260", coin(90, 170, 62) + coin(200, 150, 70) + coin(140, 78, 60)),
  globe: wrap("0 0 200 200", `
<circle cx="100" cy="100" r="84" fill="url(#gSphere)"/>
<g fill="none" stroke="#fff" stroke-width="4" opacity=".55"><ellipse cx="100" cy="100" rx="36" ry="84"/><ellipse cx="100" cy="100" rx="70" ry="84"/><path d="M16 100H184M28 62H172M28 138H172"/></g>
<path d="M45 70q25-22 40-6t-6 26-30 8z M115 112q22-12 38 4t-12 30-26-8z" fill="#3E6B12" opacity=".5"/>
<ellipse cx="72" cy="58" rx="26" ry="14" fill="#fff" opacity=".35" transform="rotate(-28 72 58)"/>`),
  shield: wrap("0 0 200 220", `
<path d="M100 10 L176 36 V102 C176 152 140 188 100 208 C60 188 24 152 24 102 V36 Z" fill="url(#gGraf)"/>
<path d="M100 22 L164 44 V102 C164 146 134 178 100 196 C66 178 36 146 36 102 V44 Z" fill="url(#gGreen)"/>
<path d="M66 106 l24 26 46-54" stroke="#fff" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M50 60 L100 42" stroke="#fff" stroke-width="6" opacity=".4" stroke-linecap="round"/>`),
  phone: wrap("0 0 200 260", `
<rect x="34" y="12" width="132" height="236" rx="28" fill="url(#gGraf)"/>
<rect x="44" y="26" width="112" height="208" rx="20" fill="#fff"/>
<rect x="44" y="26" width="112" height="70" rx="20" fill="url(#gGreen)"/>
<circle cx="100" cy="150" r="30" fill="url(#gGreen)"/>
<path d="M86 150 l10 11 20-24" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="66" y="196" width="68" height="12" rx="6" fill="#DCE2DA"/>
<rect x="76" y="20" width="48" height="8" rx="4" fill="#2A3442"/>`),
  clock: wrap("0 0 200 220", `
<circle cx="58" cy="26" r="20" fill="url(#gGreen)"/><circle cx="142" cy="26" r="20" fill="url(#gGreen)"/>
<circle cx="100" cy="122" r="84" fill="url(#gGreen)"/>
<circle cx="100" cy="122" r="66" fill="#fff"/>
<g stroke="#3C4858" stroke-width="6" stroke-linecap="round"><path d="M100 122V78"/><path d="M100 122L128 138"/></g>
<circle cx="100" cy="122" r="8" fill="#3C4858"/>
<g fill="#90C149"><circle cx="100" cy="66" r="4"/><circle cx="100" cy="178" r="4"/><circle cx="44" cy="122" r="4"/><circle cx="156" cy="122" r="4"/></g>`),
  heart: wrap("0 0 200 190", `
<path d="M100 178 C20 118 8 66 34 40 C58 18 88 30 100 56 C112 30 142 18 166 40 C192 66 180 118 100 178Z" fill="url(#gRed)"/>
<path d="M46 56 C58 42 76 46 84 58" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" opacity=".6"/>`),
  chat: wrap("0 0 220 200", `
<path d="M30 20 h160 a20 20 0 0 1 20 20 v82 a20 20 0 0 1 -20 20 H96 L52 180 V142 H30 a20 20 0 0 1 -20 -20 V40 a20 20 0 0 1 20 -20z" fill="url(#gGreen)"/>
<g fill="#fff"><circle cx="72" cy="81" r="11"/><circle cx="110" cy="81" r="11"/><circle cx="148" cy="81" r="11"/></g>`),
  card: wrap("0 0 240 170", `
<rect x="10" y="12" width="220" height="140" rx="22" fill="url(#gGraf)"/>
<rect x="10" y="44" width="220" height="30" fill="#1f2733"/>
<rect x="30" y="100" width="70" height="14" rx="7" fill="url(#gGreen)"/>
<circle cx="190" cy="118" r="16" fill="url(#gGold)"/><circle cx="172" cy="118" r="16" fill="url(#gGoldD)" opacity=".85"/>`),
  plane: wrap("0 0 240 200", `
<path d="M14 96 L226 20 L172 176 L120 128 L92 158 L88 112Z" fill="url(#gGreen)"/>
<path d="M88 112 L226 20 L120 128Z" fill="#fff" opacity=".35"/>
<path d="M120 128 L226 20" stroke="#5F8A22" stroke-width="3" opacity=".6"/>`),
  check: wrap("0 0 200 200", `
<circle cx="100" cy="100" r="84" fill="url(#gGreen)"/>
<circle cx="100" cy="100" r="84" fill="none" stroke="#fff" stroke-width="6" opacity=".35"/>
<path d="M58 102 l30 30 56-64" stroke="#fff" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`),
  bolt: wrap("0 0 160 220", `
<path d="M96 8 L20 122 H74 L58 212 L142 88 H88 Z" fill="url(#gGold)"/>
<path d="M96 8 L20 122 H74 Z" fill="#fff" opacity=".3"/>`),
  house: wrap("0 0 220 200", `
<path d="M18 96 L110 16 L202 96 V184 H18Z" fill="url(#gGraf)"/>
<path d="M6 100 L110 8 L214 100" stroke="url(#gGreen)" stroke-width="20" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="88" y="120" width="44" height="64" rx="8" fill="url(#gGreen)"/>`),
};

export const icon = (name, style = "") => `<div class="ico" style="${style}">${ICONS[name]}</div>`;
