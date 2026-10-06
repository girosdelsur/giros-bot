// templates.mjs — plantillas de historia (1080x1920) y post de feed (1080x1350) con datos reales de Giros del Sur.
// Línea gráfica: crema / verde #90C149 / grafito #3C4858, Montserrat + Open Sauce, iconos 3D, fotos de personas.
// Historias: 3 familias (A, B, C) x 4 plantillas. Cada día de la semana usa una familia (lun/jue A, mar/vie B, mié/sáb C).
import { icon } from "./icons.mjs";

const f = (n, min = 0, max = min) => n.toLocaleString("es-CL", { minimumFractionDigits: min, maximumFractionDigits: max });

// ---------- corredores (pares de la API api.girosdelsur.com) ----------
export const CORRIDORS = {
  BS: { key: "BS", from: "CLP", to: "BS", unit: "Bs", fromUnit: "CLP", fromFlag: "CL", toFlag: "VE", label: "Chile → Venezuela", short: "Chile", base: 1, amounts: [10000, 50000, 100000] },
  PE: { key: "PE", from: "PEN", to: "BS", unit: "Bs", fromUnit: "PEN", fromFlag: "PE", toFlag: "VE", label: "Perú → Venezuela", short: "Perú", base: 1, amounts: [50, 100, 500] },
  CO: { key: "CO", from: "COP", to: "BS", unit: "Bs", fromUnit: "COP", fromFlag: "CO", toFlag: "VE", label: "Colombia → Venezuela", short: "Colombia", base: 1000, amounts: [50000, 100000, 500000] },
};

// ---------- banderas circulares vectoriales ----------
let _fid = 0;
const star = (cx, cy, R, r, fill) => {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = (-90 + i * 36) * (Math.PI / 180), rad = i % 2 ? r : R;
    return `${(cx + rad * Math.cos(a)).toFixed(2)},${(cy + rad * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
  return `<polygon points="${pts}" fill="${fill}"/>`;
};
const FLAGS = {
  CL: { dx: 0, svg: `<rect width="150" height="50" fill="#fff"/><rect y="50" width="150" height="50" fill="#D52B1E"/><rect width="50" height="50" fill="#0039A6"/>${star(25, 25, 14, 5.6, "#fff")}` },
  VE: { dx: -25, svg: `<rect width="150" height="33.4" fill="#FFCC00"/><rect y="33.4" width="150" height="33.3" fill="#00247D"/><rect y="66.7" width="150" height="33.3" fill="#CF142B"/>${Array.from({ length: 8 }, (_, i) => { const a = (-155 + i * (130 / 7)) * (Math.PI / 180); return star(75 + 28 * Math.cos(a), 72 + 28 * Math.sin(a), 3.6, 1.5, "#fff"); }).join("")}` },
  PE: { dx: -25, svg: `<rect width="50" height="100" fill="#D91023"/><rect x="50" width="50" height="100" fill="#fff"/><rect x="100" width="50" height="100" fill="#D91023"/>` },
  CO: { dx: -25, svg: `<rect width="150" height="50" fill="#FCD116"/><rect y="50" width="150" height="25" fill="#003893"/><rect y="75" width="150" height="25" fill="#CE1126"/>` },
};
export const flag = (code, size, ring = "#fff") => {
  const id = "fc" + _fid++, fl = FLAGS[code];
  return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" style="display:block;filter:drop-shadow(0 4px 8px rgba(0,0,0,.3))"><defs><clipPath id="${id}"><circle cx="50" cy="50" r="50"/></clipPath></defs><g clip-path="url(#${id})"><g transform="translate(${fl.dx},0)">${fl.svg}</g></g><circle cx="50" cy="50" r="48.5" fill="none" stroke="${ring}" stroke-width="3.5"/></svg>`;
};
const arrowSvg = (s) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}"><path d="M4 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const flagsRow = (c, size, ring) =>
  `<span style="display:inline-flex;align-items:center;gap:${Math.round(size * 0.22)}px;vertical-align:middle">${flag(c.fromFlag, size, ring)}${arrowSvg(Math.round(size * 0.5))}${flag(c.toFlag, size, ring)}</span>`;

// ---------- formatos ----------
const rateFmt = (c, v) => f(v * c.base, 2, 6);
const unitRate = (c, cur) => `${c.base === 1000 ? "1.000" : "1"} ${c.fromUnit} = ${rateFmt(c, cur)} ${c.unit}`;
const conv = (x, amt) => f(amt * x.cur, 2);
const money = (c, amt) => `${f(amt)} ${c.fromUnit}`;
const varPct = (x) => f(((x.mx - x.mn) / x.mn) * 100, 1);

// ---------- piezas comunes ----------
const logo = (v, h, style) => `<img src="assets/logos/${v}/logo_horizontal_sin_eslogan.png" style="position:absolute;height:${h}px;${style}">`;
const dot = `<span style="display:inline-block;width:16px;height:16px;border-radius:50%;background:#3CE07A;box-shadow:0 0 0 6px rgba(60,224,122,.28);margin-right:14px;vertical-align:middle"></span>`;
const play = `<svg viewBox="0 0 24 24" fill="currentColor" style="width:34px;height:34px"><path d="M8 4l10 8-10 8z"/></svg>`;
const cta = (t, bg = "var(--grafito)", color = "#fff") =>
  `<span class="m" style="display:inline-flex;align-items:center;gap:16px;background:${bg};color:${color};font-weight:800;font-size:36px;padding:24px 44px;border-radius:999px;box-shadow:0 14px 34px rgba(44,54,68,.3);white-space:nowrap">${t} ${play}</span>`;
const badgeHTML = (badge, bg, color, border, extra = "") =>
  badge ? `<div class="m" style="display:inline-block;background:${bg};color:${color};border:3px solid ${border};font-weight:700;font-size:28px;padding:12px 28px;border-radius:999px;${extra}">${badge}</div>` : "";
const kicker = (t, color) => `<div class="m" style="font-weight:800;font-size:27px;letter-spacing:.14em;text-transform:uppercase;color:${color}">${t}</div>`;
const photo = (x, style) => `<img src="assets/photos/${x.photo}.jpg" style="position:absolute;object-fit:cover;object-position:${x.pos || "50% 20%"};${style}">`;
const hl = (s, c) => s.replace(/##(.+?)##/g, `<span style="background:var(--green);color:#fff;padding:0 18px;border-radius:16px;box-decoration-break:clone">$1</span>`).replace(/\*\*(.+?)\*\*/g, `<span style="color:${c}">$1</span>`);

// bloque inferior: dato + horario + aviso de tasa (obligatorio en toda pieza con tasa)
const bottom = (x, ink, dim, acc, { tip = true } = {}) => `
  <div class="abs" style="left:70px;right:70px;bottom:112px;text-align:center">
    ${tip ? `<div style="font-weight:600;font-size:29px;line-height:1.28;color:${acc}">Dato: ${x.tip}</div>` : ""}
    <div style="font-weight:600;font-size:27px;color:${ink};margin-top:9px">${x.note}</div>
    <div style="font-weight:500;font-size:23px;line-height:1.34;color:${dim};margin-top:11px">${x.disclaimer}</div>
  </div>
  <div class="m abs" style="left:80px;right:80px;bottom:44px;display:flex;justify-content:space-between;font-weight:700;font-size:25px;color:${dim}"><span>@girosdelsur</span><span>girosdelsur.com</span></div>`;

// ---------- gráficos de 24 h ----------
function chart(x, w, h, kind, { line, area, grid, ink, dotFill = "#fff", labels = true }) {
  const { rates, mx, mn } = x, c = x.cor;
  const padT = 40, padB = 30, padX = 22;
  const span = mx - mn || mx * 0.001;
  const lo = mn - span * 0.14, hi = mx + span * 0.14;
  const X = (i) => padX + (i * (w - 2 * padX)) / (rates.length - 1);
  const Y = (v) => padT + (1 - (v - lo) / (hi - lo)) * (h - padT - padB);
  const pts = rates.map((v, i) => [X(i), Y(v)]);
  const gridL = [0.25, 0.5, 0.75].map((t) => { const y = (padT + t * (h - padT - padB)).toFixed(1); return `<line x1="${padX}" x2="${w - padX}" y1="${y}" y2="${y}" stroke="${grid}" stroke-width="2" stroke-dasharray="6 10"/>`; }).join("");
  const iMax = rates.indexOf(mx);
  const maxLbl = labels ? `<circle cx="${pts[iMax][0].toFixed(1)}" cy="${pts[iMax][1].toFixed(1)}" r="9" fill="${ink}"/><text x="${Math.min(Math.max(pts[iMax][0], 150), w - 150).toFixed(1)}" y="${(pts[iMax][1] - 22).toFixed(1)}" text-anchor="middle" font-family="Montserrat" font-weight="800" font-size="28" fill="${ink}">máx ${rateFmt(c, mx)}</text>` : "";
  const [lx, ly] = pts[pts.length - 1];
  const head = `<circle cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="26" fill="${line}" opacity=".28"/><circle cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="13" fill="${line}" stroke="${dotFill}" stroke-width="5"/>`;
  if (kind === "bars") {
    const bw = ((w - 2 * padX) / rates.length) * 0.66;
    const bars = rates.map((v, i) => {
      const y = Y(v), last = i === rates.length - 1;
      return `<rect x="${(X(i) - bw / 2).toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${(h - padB - y).toFixed(1)}" rx="${(bw / 2.4).toFixed(1)}" fill="${last ? dotFill : line}" opacity="${last ? 1 : 0.55 + 0.45 * (i / rates.length)}"/>`;
    }).join("");
    return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="display:block;overflow:visible">${gridL}${bars}${maxLbl}</svg>`;
  }
  const lineP = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  if (kind === "dots") {
    const dts = pts.map((p, i) => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${i === pts.length - 1 ? 0 : 7}" fill="${line}"/>`).join("");
    return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="display:block;overflow:visible">${gridL}<path d="${lineP}" fill="none" stroke="${line}" stroke-width="4" opacity=".55" stroke-linecap="round" stroke-linejoin="round"/>${dts}${maxLbl}${head}</svg>`;
  }
  const areaP = lineP + ` L${lx.toFixed(1)} ${h - padB} L${pts[0][0].toFixed(1)} ${h - padB} Z`;
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="display:block;overflow:visible"><defs><linearGradient id="ga${w}${h}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${area || line}" stop-opacity=".5"/><stop offset="1" stop-color="${area || line}" stop-opacity="0"/></linearGradient></defs>${gridL}<path d="${areaP}" fill="url(#ga${w}${h})"/><path d="${lineP}" fill="none" stroke="${line}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>${maxLbl}${head}</svg>`;
}

const statChips = (x, bg, ink, hiBg, hiInk) => {
  const c = x.cor, per = c.base === 1000 ? " (x1.000)" : "";
  return [["Mín.", rateFmt(c, x.mn), bg, ink], ["Ahora", rateFmt(c, x.cur), hiBg, hiInk], ["Máx.", rateFmt(c, x.mx), bg, ink]]
    .map(([l, v, b, col]) => `<div style="flex:1;background:${b};color:${col};border-radius:30px;padding:18px 8px;text-align:center;box-shadow:0 10px 26px rgba(44,54,68,.16)"><div style="font-weight:600;font-size:23px;opacity:.82">${l}${per}</div><div class="m" style="font-weight:800;font-size:40px">${v}</div></div>`)
    .join("");
};

const bgGreen = `<div class="abs" style="inset:0;background:linear-gradient(160deg,#9bcc55 0%,#90C149 55%,#7fae3a 100%)"></div>`;
const bgGraf = `<div class="abs" style="inset:0;background:linear-gradient(160deg,#465468 0%,#3C4858 60%,#2c3644 100%)"></div>`;
const bgCream = `<div class="abs" style="inset:0;background:#F3EFE6"></div><div class="abs" style="inset:0;background:radial-gradient(1200px 700px at 85% -10%,rgba(144,193,73,.18),transparent 60%),radial-gradient(900px 600px at -10% 110%,rgba(60,72,88,.09),transparent 60%)"></div>`;
const orb = (style) => `<div class="abs" style="border-radius:50%;${style}"></div>`;
const sticker = (t, bg, color, style) => `<div class="m abs" style="${style};background:${bg};color:${color};font-weight:800;font-size:44px;padding:20px 34px;border-radius:26px;box-shadow:0 14px 34px rgba(0,0,0,.28);white-space:nowrap">${t}</div>`;
const chip = (x, bg, color, style, size = 56) => `<div class="m abs" style="${style};background:${bg};color:${color};font-weight:800;font-size:${size}px;padding:20px 44px;border-radius:999px;white-space:nowrap;box-shadow:0 16px 40px rgba(0,0,0,.3)">${unitRate(x.cor, x.cur)}</div>`;

// =====================================================================
//  HISTORIAS — FAMILIA A (crema · lunes y jueves)
// =====================================================================
// A1 · Sorpresa: foto arriba + hoja crema
function a1(x) {
  const c = x.cor;
  return `${bgCream}
  ${photo(x, "left:0;top:0;width:1080px;height:1010px")}
  <div class="abs" style="left:0;right:0;top:0;height:300px;background:linear-gradient(to bottom,rgba(44,54,68,.5),transparent)"></div>
  ${logo("white-t", 70, "left:50%;top:84px;transform:translateX(-50%)")}
  ${sticker("¡Mira la tasa!", "var(--green)", "#fff", "right:56px;top:330px;transform:rotate(6deg)")}
  <div class="abs" style="left:0;right:0;top:900px;bottom:0;background:var(--cream);border-radius:80px 80px 0 0;box-shadow:0 -24px 70px rgba(0,0,0,.35)"></div>
  ${chip(x, "var(--green)", "#fff", "left:50%;top:820px;transform:translateX(-50%) rotate(-3deg)")}
  <div class="abs" style="left:70px;right:70px;top:985px;text-align:center">
    <div style="margin-bottom:12px">${flagsRow(c, 64)}</div>
    ${kicker(`${dot}Tasa de las ${x.hh} · ${c.label}`, "var(--green-d)")}
    <div style="font-weight:600;font-size:40px;margin-top:18px;color:var(--grafito)">Si envías <b class="m" style="font-weight:800">${money(c, c.amounts[0])}</b>, tu contacto recibe</div>
    <div class="m" style="font-weight:900;font-size:116px;letter-spacing:-.02em;line-height:1.1;color:var(--green-d);margin-top:4px">${conv(x, c.amounts[0])} ${c.unit}</div>
    <div style="margin-top:14px">${badgeHTML(x.badge, "rgba(111,154,48,.14)", "var(--green-d)", "var(--green)")}</div>
  </div>
  <div class="abs" style="left:70px;right:70px;top:1445px;text-align:center">${cta("COTIZAR EN GIROSDELSUR.COM")}</div>
  ${bottom(x, "var(--grafito)", "var(--gray)", "var(--green-d)")}`;
}

// A2 · Gráfico de 24 h (área) + polaroid
function a2(x) {
  const c = x.cor;
  return `${bgCream}
  ${logo("color", 70, "left:70px;top:90px")}
  <div class="abs" style="right:64px;top:84px;width:340px;height:430px;border:10px solid #fff;border-radius:34px;transform:rotate(4deg);box-shadow:0 20px 50px rgba(44,54,68,.35);overflow:hidden;background:#fff">${photo(x, "left:0;top:0;width:100%;height:100%")}</div>
  <div class="abs" style="left:70px;top:290px;width:580px">
    <div style="display:flex;align-items:center;gap:16px">${flagsRow(c, 52)}${kicker(`Tasa de las ${x.hh}`, "var(--green-d)")}</div>
    <div class="m" style="font-weight:800;font-size:92px;line-height:1.02;letter-spacing:-.02em;margin-top:20px;color:var(--grafito)">Así va<br><span style="color:var(--green)">la tasa hoy</span></div>
  </div>
  <div class="abs" style="left:56px;right:56px;top:600px;background:#fff;border-radius:44px;padding:30px 36px 24px;box-shadow:0 24px 60px rgba(44,54,68,.18)">
    <div style="font-weight:600;font-size:26px;color:var(--gray);margin-bottom:4px">${c.label} · últimas 24 horas · variación de ${varPct(x)} %</div>
    ${chart(x, 920, 380, "area", { line: "#90C149", area: "#90C149", grid: "rgba(60,72,88,.18)", ink: "#3C4858", dotFill: "#fff" })}
    <div style="display:flex;justify-content:space-between;margin-top:6px;font-weight:600;font-size:25px;color:var(--gray)"><span>hace 24 h</span><span>ahora</span></div>
  </div>
  <div class="abs" style="left:56px;right:56px;top:1150px;display:flex;gap:18px">${statChips(x, "#fff", "var(--grafito)", "var(--green)", "#fff")}</div>
  <div class="abs" style="left:70px;right:70px;top:1300px;text-align:center;color:var(--grafito)">
    ${x.badge ? badgeHTML(x.badge, "rgba(111,154,48,.14)", "var(--green-d)", "var(--green)") : `<div style="font-weight:600;font-size:38px">Hoy <b class="m">${money(c, c.amounts[0])}</b> → <b class="m" style="color:var(--green-d)">${conv(x, c.amounts[0])} ${c.unit}</b></div>`}
  </div>
  <div class="abs" style="left:70px;right:70px;top:1400px;text-align:center">${cta("COTIZA EN GIROSDELSUR.COM", "var(--green)")}</div>
  ${bottom(x, "var(--grafito)", "var(--gray)", "var(--green-d)", { tip: false })}`;
}

// tabla de montos (la usan A3, B3, C3 y los corredores)
const tableRows = (x, { rowInk, numInk, border }) => x.cor.amounts.map((m, i) =>
  `<div style="display:flex;justify-content:space-between;align-items:baseline;padding:11px 0;${i < 2 ? `border-bottom:3px solid ${border};` : ""}"><span style="font-weight:600;font-size:40px;color:${rowInk}">${money(x.cor, m)}</span><span class="m" style="font-weight:800;font-size:48px;color:${numInk}">${conv(x, m)} ${x.cor.unit}</span></div>`).join("");

// A3 · Tabla de montos sobre retrato a pantalla completa
function a3(x, copy = {}) {
  const c = x.cor;
  const l1 = copy.l1 ?? "Mira cuánto", l2 = copy.l2 ?? "recibe **tu gente**";
  return `${photo(x, "left:0;top:-230px;width:1080px;height:2150px")}
  <div class="abs" style="inset:0;background:linear-gradient(to bottom,rgba(44,54,68,.7) 0%,rgba(44,54,68,.35) 38%,rgba(44,54,68,.88) 100%)"></div>
  ${logo("white-t", 70, "left:50%;top:84px;transform:translateX(-50%)")}
  <div class="abs" style="top:230px;left:70px;right:70px;text-align:center"><span style="display:inline-flex;align-items:center;gap:16px;background:var(--green);color:#fff;border-radius:999px;padding:10px 28px 10px 14px"><span>${flagsRow(c, 48)}</span><span class="m" style="font-weight:800;font-size:26px">Tasa de las ${x.hh} · ${c.label}</span></span></div>
  <div class="abs" style="top:380px;left:70px;right:70px;text-align:center"><div class="m" style="font-weight:800;font-size:92px;line-height:1.04;color:#fff;letter-spacing:-.02em">${l1}<br>${hl(l2, "var(--green)")}</div></div>
  <div class="abs" style="left:60px;right:60px;top:960px;background:#fff;border-radius:44px;padding:14px 44px;box-shadow:0 24px 60px rgba(0,0,0,.4)">${tableRows(x, { rowInk: "var(--grafito)", numInk: "var(--green-d)", border: "rgba(60,72,88,.14)" })}</div>
  <div class="abs" style="top:1290px;left:70px;right:70px;text-align:center;color:#fff">
    <div style="font-weight:700;font-size:40px">${unitRate(c, x.cur)}</div>
    <div style="margin-top:12px">${badgeHTML(x.badge, "rgba(144,193,73,.25)", "#fff", "var(--green)", "font-size:26px")}</div>
  </div>
  <div class="abs" style="top:1450px;left:70px;right:70px;text-align:center">${cta(copy.cta ?? "ENVIAR AHORA", "var(--green)")}</div>
  ${bottom({ ...x, tip: copy.tip ?? x.tip }, "#fff", "rgba(255,255,255,.8)", "var(--green-l)", { tip: !!copy.tip })}`;
}

// A4 · Cotizador: tarjeta con "tú envías / recibe" bajo foto circular
const quote = (x, { bg, ink, boxBg, boxInk, numInk, arrowBg, rateBg, rateInk, amt }) => {
  const c = x.cor, m = c.amounts[amt ?? 2];
  return `<div class="abs" style="left:56px;right:56px;background:${bg};border-radius:48px;padding:40px 44px;box-shadow:0 26px 70px rgba(44,54,68,.3);color:${ink}">
    <div style="font-weight:600;font-size:28px;opacity:.75;margin-bottom:10px">Tú envías</div>
    <div style="display:flex;align-items:center;gap:20px;background:${boxBg};border-radius:28px;padding:20px 26px">${flag(c.fromFlag, 70)}<span class="m" style="font-weight:800;font-size:56px;color:${boxInk}">${money(c, m)}</span></div>
    <div style="display:flex;justify-content:center;margin:-14px 0 -14px"><span style="position:relative;z-index:2;width:76px;height:76px;border-radius:50%;background:${arrowBg};color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 20px rgba(0,0,0,.25);transform:rotate(90deg)">${arrowSvg(42)}</span></div>
    <div style="font-weight:600;font-size:28px;opacity:.75;margin-bottom:10px">Tu contacto recibe</div>
    <div style="display:flex;align-items:center;gap:20px;background:${boxBg};border-radius:28px;padding:20px 26px">${flag(c.toFlag, 70)}<span class="m" style="font-weight:900;font-size:62px;color:${numInk}">${conv(x, m)} ${c.unit}</span></div>
    <div class="m" style="margin-top:24px;text-align:center;background:${rateBg};color:${rateInk};font-weight:800;font-size:34px;padding:16px;border-radius:999px">${unitRate(c, x.cur)}</div>
  </div>`;
};

function a4(x) {
  const c = x.cor;
  return `${bgCream}
  ${orb("left:-180px;top:-120px;width:560px;height:560px;background:rgba(144,193,73,.2)")}
  ${logo("color", 70, "left:50%;top:84px;transform:translateX(-50%)")}
  <div class="abs" style="left:310px;top:210px;width:460px;height:460px;border-radius:50%;border:14px solid var(--green);overflow:hidden;box-shadow:0 24px 60px rgba(44,54,68,.3)">${photo(x, "left:0;top:0;width:100%;height:100%")}</div>
  ${sticker("¡Cotiza hoy!", "var(--grafito)", "#fff", "right:70px;top:230px;transform:rotate(7deg);font-size:40px")}
  <div class="abs" style="left:70px;right:70px;top:700px;text-align:center">${kicker(`${dot}Tasa de las ${x.hh} · ${c.label}`, "var(--green-d)")}</div>
  <div class="abs" style="top:750px;left:0;right:0">${quote(x, { bg: "#fff", ink: "var(--grafito)", boxBg: "var(--cream)", boxInk: "var(--grafito)", numInk: "var(--green-d)", arrowBg: "var(--green)", rateBg: "var(--grafito)", rateInk: "#fff" }).replace('class="abs" style="', 'class="abs" style="top:0;')}</div>
  <div class="abs" style="left:70px;right:70px;top:1370px;text-align:center">${x.badge ? badgeHTML(x.badge, "rgba(111,154,48,.14)", "var(--green-d)", "var(--green)") : ""}</div>
  <div class="abs" style="left:70px;right:70px;top:1500px;text-align:center">${cta("ENVIAR EN GIROSDELSUR.COM", "var(--green)")}</div>
  ${bottom(x, "var(--grafito)", "var(--gray)", "var(--green-d)", { tip: false })}`;
}

// =====================================================================
//  HISTORIAS — FAMILIA B (verde · martes y viernes)
// =====================================================================
// B1 · Sorpresa: foto en arco sobre verde
function b1(x) {
  const c = x.cor;
  return `${bgGreen}
  ${orb("right:-220px;top:-160px;width:700px;height:700px;background:rgba(255,255,255,.13)")}
  ${orb("left:-260px;bottom:200px;width:640px;height:640px;background:rgba(255,255,255,.09)")}
  ${logo("white-t", 70, "left:50%;top:84px;transform:translateX(-50%)")}
  <div class="abs" style="left:130px;top:210px;width:820px;height:720px;border-radius:410px 410px 48px 48px;border:12px solid #fff;overflow:hidden;box-shadow:0 26px 70px rgba(44,54,68,.35)">${photo(x, "left:0;top:0;width:100%;height:100%")}</div>
  ${sticker("¡Mira la tasa!", "var(--grafito)", "#fff", "left:40px;top:300px;transform:rotate(-7deg)")}
  ${chip(x, "#fff", "var(--grafito)", "left:50%;top:880px;transform:translateX(-50%) rotate(2deg)", 54)}
  <div class="abs" style="left:70px;right:70px;top:1010px;text-align:center;color:#fff">
    <div style="margin-bottom:10px">${flagsRow(c, 60)}</div>
    ${kicker(`${dot}Tasa de las ${x.hh} · ${c.label}`, "#fff")}
    <div style="font-weight:600;font-size:40px;margin-top:16px">Si envías <b class="m" style="font-weight:800">${money(c, c.amounts[0])}</b>, tu contacto recibe</div>
    <div class="m" style="font-weight:900;font-size:118px;letter-spacing:-.02em;line-height:1.1;color:var(--grafito);margin-top:2px">${conv(x, c.amounts[0])} ${c.unit}</div>
    <div style="margin-top:12px">${badgeHTML(x.badge, "rgba(255,255,255,.22)", "#fff", "#fff")}</div>
  </div>
  <div class="abs" style="left:70px;right:70px;top:1445px;text-align:center">${cta("COTIZAR AHORA", "#fff", "var(--grafito)")}</div>
  ${bottom(x, "#fff", "rgba(255,255,255,.85)", "#fff")}`;
}

// B2 · Barras de 24 h + foto circular
function b2(x) {
  const c = x.cor;
  return `${bgGreen}
  ${orb("right:-200px;bottom:300px;width:620px;height:620px;background:rgba(255,255,255,.1)")}
  ${logo("white-t", 70, "left:50%;top:84px;transform:translateX(-50%)")}
  <div class="abs" style="left:70px;top:230px;width:380px;height:380px;border-radius:50%;border:12px solid #fff;overflow:hidden;box-shadow:0 22px 56px rgba(44,54,68,.35)">${photo(x, "left:0;top:0;width:100%;height:100%")}</div>
  <div class="abs" style="left:490px;top:250px;width:520px;color:#fff">
    <div style="display:flex;align-items:center;gap:14px">${flagsRow(c, 46)}</div>
    ${kicker(`Tasa de las ${x.hh}`, "#fff")}
    <div class="m" style="font-weight:800;font-size:80px;line-height:1.04;letter-spacing:-.02em;margin-top:14px">Así se<br>movió <span style="color:var(--grafito)">hoy</span></div>
  </div>
  <div class="abs" style="left:56px;right:56px;top:670px;background:var(--grafito);border-radius:44px;padding:30px 36px 24px;box-shadow:0 24px 60px rgba(44,54,68,.35)">
    <div style="font-weight:600;font-size:26px;color:rgba(255,255,255,.75);margin-bottom:6px">${c.label} · cada hora, últimas 24 h · variación de ${varPct(x)} %</div>
    ${chart(x, 920, 360, "bars", { line: "#90C149", grid: "rgba(255,255,255,.18)", ink: "#fff", dotFill: "#fff" })}
    <div style="display:flex;justify-content:space-between;margin-top:6px;font-weight:600;font-size:25px;color:rgba(255,255,255,.75)"><span>hace 24 h</span><span>ahora</span></div>
  </div>
  <div class="abs" style="left:56px;right:56px;top:1190px;display:flex;gap:18px">${statChips(x, "rgba(255,255,255,.95)", "var(--grafito)", "var(--grafito)", "#fff")}</div>
  <div class="abs" style="left:70px;right:70px;top:1335px;text-align:center;color:#fff">
    ${x.badge ? badgeHTML(x.badge, "rgba(255,255,255,.22)", "#fff", "#fff", "font-size:27px") : `<div style="font-weight:600;font-size:38px">Hoy <b class="m">${money(c, c.amounts[0])}</b> → <b class="m" style="color:var(--grafito)">${conv(x, c.amounts[0])} ${c.unit}</b></div>`}
  </div>
  <div class="abs" style="left:70px;right:70px;top:1430px;text-align:center">${cta("COTIZA EN GIROSDELSUR.COM", "#fff", "var(--grafito)")}</div>
  ${bottom(x, "#fff", "rgba(255,255,255,.85)", "#fff", { tip: false })}`;
}

// B3 · Tabla de montos con retrato circular sobre verde
function b3(x, copy = {}) {
  const c = x.cor;
  const l1 = copy.l1 ?? "Mira cuánto", l2 = copy.l2 ?? "recibe **tu gente**";
  return `${bgGreen}
  ${orb("left:-240px;top:300px;width:620px;height:620px;background:rgba(255,255,255,.1)")}
  ${logo("white-t", 70, "left:50%;top:84px;transform:translateX(-50%)")}
  <div class="abs" style="left:290px;top:190px;width:500px;height:500px;border-radius:50%;border:14px solid #fff;overflow:hidden;box-shadow:0 26px 70px rgba(44,54,68,.38)">${photo(x, "left:0;top:0;width:100%;height:100%")}</div>
  <div class="abs" style="left:0;right:0;top:700px;display:flex;justify-content:center"><span style="display:inline-flex;align-items:center;gap:16px;background:var(--grafito);color:#fff;border-radius:999px;padding:10px 28px 10px 14px;box-shadow:0 12px 30px rgba(0,0,0,.25)"><span>${flagsRow(c, 48)}</span><span class="m" style="font-weight:800;font-size:26px">Tasa de las ${x.hh} · ${c.label}</span></span></div>
  <div class="abs" style="top:800px;left:70px;right:70px;text-align:center"><div class="m" style="font-weight:800;font-size:80px;line-height:1.04;color:#fff;letter-spacing:-.02em">${l1}<br>${hl(l2, "var(--grafito)")}</div></div>
  <div class="abs" style="left:60px;right:60px;top:1030px;background:var(--grafito);border-radius:44px;padding:14px 44px;box-shadow:0 24px 60px rgba(0,0,0,.35)">${tableRows(x, { rowInk: "rgba(255,255,255,.9)", numInk: "#fff", border: "rgba(255,255,255,.18)" })}</div>
  <div class="abs" style="top:1355px;left:70px;right:70px;text-align:center;color:#fff">
    <div style="font-weight:700;font-size:38px">${unitRate(c, x.cur)}</div>
    <div style="margin-top:12px">${badgeHTML(x.badge, "rgba(255,255,255,.22)", "#fff", "#fff", "font-size:26px")}</div>
  </div>
  <div class="abs" style="top:1480px;left:70px;right:70px;text-align:center">${cta(copy.cta ?? "ENVIAR AHORA", "#fff", "var(--grafito)")}</div>
  ${bottom({ ...x, tip: copy.tip ?? x.tip }, "#fff", "rgba(255,255,255,.85)", "#fff", { tip: !!copy.tip })}`;
}

// B4 · Cotizador con foto a sangre arriba
function b4(x) {
  const c = x.cor;
  return `${bgGreen}
  ${photo(x, "left:0;top:0;width:1080px;height:760px;border-radius:0 0 120px 120px")}
  <div class="abs" style="left:0;right:0;top:0;height:260px;background:linear-gradient(to bottom,rgba(44,54,68,.5),transparent);border-radius:0 0 120px 120px"></div>
  ${logo("white-t", 70, "left:50%;top:84px;transform:translateX(-50%)")}
  ${sticker("Cotiza hoy", "var(--grafito)", "#fff", "left:60px;top:640px;transform:rotate(-4deg);font-size:40px")}
  <div class="abs" style="left:60px;right:60px;top:810px;text-align:center;color:#fff">${kicker(`${dot}Tasa de las ${x.hh} · ${c.label}`, "#fff")}</div>
  <div class="abs" style="top:860px;left:0;right:0">${quote(x, { bg: "var(--cream)", ink: "var(--grafito)", boxBg: "#fff", boxInk: "var(--grafito)", numInk: "var(--green-d)", arrowBg: "var(--grafito)", rateBg: "var(--green)", rateInk: "#fff", amt: 1 }).replace('class="abs" style="', 'class="abs" style="top:0;')}</div>
  <div class="abs" style="left:70px;right:70px;top:1500px;text-align:center">${cta("ENVIAR EN GIROSDELSUR.COM", "#fff", "var(--grafito)")}</div>
  ${bottom(x, "#fff", "rgba(255,255,255,.85)", "#fff", { tip: false })}`;
}

// =====================================================================
//  HISTORIAS — FAMILIA C (grafito · miércoles y sábado)
// =====================================================================
// C1 · Sorpresa a pantalla completa, texto a la izquierda
function c1(x) {
  const c = x.cor;
  return `${photo(x, "left:0;top:-300px;width:1080px;height:2220px")}
  <div class="abs" style="inset:0;background:linear-gradient(to bottom,rgba(60,72,88,.45) 0%,rgba(60,72,88,0) 22%,rgba(44,54,68,0) 42%,rgba(44,54,68,.93) 68%,rgba(36,44,56,.98) 100%)"></div>
  ${logo("white-t", 70, "left:50%;top:84px;transform:translateX(-50%)")}
  ${sticker("¡Mira la tasa!", "var(--green)", "#fff", "left:60px;top:290px;transform:rotate(-5deg)")}
  <div class="abs" style="left:70px;right:70px;top:940px;color:#fff">
    <div style="display:flex;align-items:center;gap:18px">${flagsRow(c, 62)}</div>
    <div style="margin-top:16px">${kicker(`${dot}Tasa de las ${x.hh} · ${c.label}`, "var(--green-l)")}</div>
    <div class="m" style="font-weight:700;font-size:50px;margin-top:20px">${c.base === 1000 ? "1.000" : "1"} ${c.fromUnit} =</div>
    <div class="m" style="font-weight:900;font-size:150px;letter-spacing:-.03em;line-height:1;margin-top:2px">${rateFmt(c, x.cur)} <span style="color:var(--green)">${c.unit}</span></div>
    <div style="font-weight:600;font-size:40px;margin-top:22px">Con <b class="m">${money(c, c.amounts[0])}</b> tu contacto recibe <b class="m" style="color:var(--green)">${conv(x, c.amounts[0])} ${c.unit}</b></div>
    <div style="margin-top:20px">${badgeHTML(x.badge, "rgba(144,193,73,.22)", "#fff", "var(--green)")}</div>
  </div>
  <div class="abs" style="left:70px;top:1490px">${cta("COTIZAR AHORA", "var(--green)")}</div>
  ${bottom(x, "#fff", "rgba(255,255,255,.8)", "var(--green-l)", { tip: false })}`;
}

// C2 · Puntos de 24 h sobre tarjeta crema + foto sticker
function c2(x) {
  const c = x.cor;
  return `${bgGraf}
  ${orb("right:-240px;top:-200px;width:700px;height:700px;background:rgba(144,193,73,.16)")}
  ${logo("white-t", 70, "left:70px;top:90px")}
  <div class="abs" style="left:70px;top:260px;width:560px;color:#fff">
    <div style="display:flex;align-items:center;gap:16px">${flagsRow(c, 52)}</div>
    ${kicker(`Tasa de las ${x.hh}`, "var(--green-l)")}
    <div class="m" style="font-weight:800;font-size:90px;line-height:1.02;letter-spacing:-.02em;margin-top:18px">¿Cómo<br>va la <span style="color:var(--green)">tasa</span>?</div>
  </div>
  <div class="abs" style="right:56px;top:110px;width:330px;height:440px;border-radius:200px 200px 40px 40px;border:10px solid var(--green);overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,.4)">${photo(x, "left:0;top:0;width:100%;height:100%")}</div>
  <div class="abs" style="left:56px;right:56px;top:620px;background:var(--cream);border-radius:44px;padding:30px 36px 24px;box-shadow:0 24px 60px rgba(0,0,0,.35)">
    <div style="font-weight:600;font-size:26px;color:var(--gray);margin-bottom:4px">${c.label} · últimas 24 horas · variación de ${varPct(x)} %</div>
    ${chart(x, 920, 380, "dots", { line: "#6f9a30", grid: "rgba(60,72,88,.2)", ink: "#3C4858", dotFill: "#fff" })}
    <div style="display:flex;justify-content:space-between;margin-top:6px;font-weight:600;font-size:25px;color:var(--gray)"><span>hace 24 h</span><span>ahora</span></div>
  </div>
  <div class="abs" style="left:56px;right:56px;top:1170px;display:flex;gap:18px">${statChips(x, "var(--cream)", "var(--grafito)", "var(--green)", "#fff")}</div>
  <div class="abs" style="left:70px;right:70px;top:1315px;text-align:center;color:#fff">
    ${x.badge ? badgeHTML(x.badge, "rgba(144,193,73,.22)", "#fff", "var(--green)", "font-size:27px") : `<div style="font-weight:600;font-size:38px">Hoy <b class="m">${money(c, c.amounts[0])}</b> → <b class="m" style="color:var(--green)">${conv(x, c.amounts[0])} ${c.unit}</b></div>`}
  </div>
  <div class="abs" style="left:70px;right:70px;top:1420px;text-align:center">${cta("COTIZA EN GIROSDELSUR.COM", "var(--green)")}</div>
  ${bottom(x, "#fff", "rgba(255,255,255,.8)", "var(--green-l)", { tip: false })}`;
}

// C3 · Tabla de montos: foto con corte diagonal arriba y tarjeta crema
function c3(x, copy = {}) {
  const c = x.cor;
  const l1 = copy.l1 ?? "Mira cuánto", l2 = copy.l2 ?? "recibe **tu gente**";
  return `${bgGraf}
  ${photo(x, "left:0;top:0;width:1080px;height:980px;clip-path:polygon(0 0,100% 0,100% 82%,0 100%)")}
  <div class="abs" style="left:0;top:0;width:1080px;height:980px;clip-path:polygon(0 0,100% 0,100% 82%,0 100%);background:linear-gradient(to bottom,rgba(44,54,68,.55),rgba(44,54,68,.1) 40%,rgba(44,54,68,.65))"></div>
  <div class="abs" style="left:0;top:0;width:1080px;height:1000px;pointer-events:none"><svg width="1080" height="1000"><polygon points="0,980 1080,804 1080,830 0,1004" fill="#90C149"/></svg></div>
  ${logo("white-t", 70, "left:70px;top:84px")}
  <div class="abs" style="top:185px;left:70px"><span style="display:inline-flex;align-items:center;gap:16px;background:var(--green);color:#fff;border-radius:999px;padding:10px 28px 10px 14px"><span>${flagsRow(c, 46)}</span><span class="m" style="font-weight:800;font-size:25px">Tasa de las ${x.hh} · ${c.label}</span></span></div>
  <div class="abs" style="top:275px;left:70px;right:70px"><div class="m" style="font-weight:800;font-size:84px;line-height:1.04;color:#fff;letter-spacing:-.02em;text-shadow:0 4px 24px rgba(0,0,0,.45)">${l1}<br>${hl(l2, "var(--green)")}</div></div>
  <div class="abs" style="left:60px;right:60px;top:960px;background:var(--cream);border-radius:44px;padding:14px 44px;box-shadow:0 24px 60px rgba(0,0,0,.4)">${tableRows(x, { rowInk: "var(--grafito)", numInk: "var(--green-d)", border: "rgba(60,72,88,.16)" })}</div>
  <div class="abs" style="top:1300px;left:70px;right:70px;text-align:center;color:#fff">
    <div style="font-weight:700;font-size:38px">${unitRate(c, x.cur)}</div>
    <div style="margin-top:12px">${badgeHTML(x.badge, "rgba(144,193,73,.22)", "#fff", "var(--green)", "font-size:26px")}</div>
  </div>
  <div class="abs" style="top:1430px;left:70px;right:70px;text-align:center">${cta(copy.cta ?? "ENVIAR AHORA", "var(--green)")}</div>
  ${bottom({ ...x, tip: copy.tip ?? x.tip }, "#fff", "rgba(255,255,255,.8)", "var(--green-l)", { tip: !!copy.tip })}`;
}

// C4 · Cotizador con foto lateral y moneda 3D
function c4(x) {
  const c = x.cor;
  return `${bgGraf}
  ${orb("left:-260px;bottom:120px;width:760px;height:760px;background:rgba(144,193,73,.12)")}
  ${logo("white-t", 70, "left:70px;top:90px")}
  <div class="abs" style="right:56px;top:190px;width:430px;height:620px;border-radius:44px;border:10px solid var(--green);overflow:hidden;transform:rotate(3deg);box-shadow:0 24px 60px rgba(0,0,0,.45)">${photo(x, "left:0;top:0;width:100%;height:100%")}</div>
  ${icon("coins", "left:50px;top:630px;width:250px;height:216px;transform:rotate(-8deg)")}
  <div class="abs" style="left:70px;top:230px;width:480px;color:#fff">
    <div style="display:flex;align-items:center;gap:14px">${flagsRow(c, 50)}</div>
    ${kicker(`Tasa de las ${x.hh}`, "var(--green-l)")}
    <div class="m" style="font-weight:800;font-size:76px;line-height:1.05;letter-spacing:-.02em;margin-top:18px">Mira lo que<br>recibe <span style="color:var(--green)">tu familia</span></div>
  </div>
  <div class="abs" style="top:880px;left:0;right:0">${quote(x, { bg: "#fff", ink: "var(--grafito)", boxBg: "var(--cream)", boxInk: "var(--grafito)", numInk: "var(--green-d)", arrowBg: "var(--green)", rateBg: "var(--grafito)", rateInk: "#fff", amt: 2 }).replace('class="abs" style="', 'class="abs" style="top:0;')}</div>
  <div class="abs" style="left:70px;right:70px;top:1520px;text-align:center">${cta("ENVIAR EN GIROSDELSUR.COM", "var(--green)")}</div>
  ${bottom(x, "#fff", "rgba(255,255,255,.8)", "var(--green-l)", { tip: false })}`;
}

// =====================================================================
//  CORREDORES (Perú → Venezuela, Colombia → Venezuela): una por familia
// =====================================================================
const corrCopy = (x) => ({
  l1: `¿Envías desde`,
  l2: `${x.set === "B" ? "**" : "##"}${x.cor.short}${x.set === "B" ? "**" : "##"}?`,
  cta: `COTIZA ${x.cor.short.toUpperCase()} → VENEZUELA`,
  tip: "tu familia en Venezuela recibe en bolívares (Bs).",
});
const cA = (x) => a3(x, corrCopy(x));
const cB = (x) => b3(x, corrCopy(x));
const cC = (x) => c3(x, corrCopy(x));

export const STORY_SETS = { A: ["a1", "a2", "a3", "a4"], B: ["b1", "b2", "b3", "b4"], C: ["c1", "c2", "c3", "c4"] };
export const STORY_TEMPLATES = { a1, a2, a3, a4, b1, b2, b3, b4, c1, c2, c3, c4, cA, cB, cC };
export const setForWeekday = { 1: "A", 2: "B", 3: "C", 4: "A", 5: "B", 6: "C" };

const wrapStory = (inner) => `<!doctype html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=1080,height=1920">
<link rel="stylesheet" href="kit.css"></head><body class="story"><div id="root">${inner}</div></body></html>`;
export const buildStory = (key, x) => wrapStory(STORY_TEMPLATES[key](x));

// piezas compartidas con feed.mjs
export const H = { f, flag, flagsRow, rateFmt, unitRate, conv, money, varPct, logo, dot, cta, badgeHTML, kicker, photo, hl, chart, statChips, bgGreen, bgGraf, bgCream, orb, sticker, chip, quote, tableRows, icon };
