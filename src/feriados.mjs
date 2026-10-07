// feriados.mjs — piezas especiales de feriados en que Giros del Sur trabaja con normalidad
// (post de feed 1080x1350 + 2 historias 1080x1920 por feriado). Uso: node src/feriados.mjs
// Salida: content/feriados/<fecha>_<pieza>.jpg  (se programan en Metricool con la URL raw de GitHub)
import { H } from "./templates.mjs";
import { renderPage, closeBrowser } from "./render.mjs";
const { logo, cta, kicker, hl, orb, bgGreen, bgCream, bgGraf, icon, photo, flag } = H;

// Datos verificados: feriados oficiales de Chile 2026 (12-oct lunes, 31-oct sábado). Horario de Giros del Sur: L–V 08:30–20:00, sáb 08:30–16:00.
export const FERIADOS = [
  { date: "2026-10-12", dia: "Lunes 12 de octubre", nombre: "Encuentro de Dos Mundos", titulo: "Encuentro de **Dos Mundos**", horario: "08:30 a 20:00", cierre: "20:00", photo: "fer_barco-atardecer", pos: "50% 45%",
    motivo: "Se recuerda el encuentro entre Europa y América de 1492. Hoy es una fecha para reflexionar sobre la diversidad cultural y los pueblos indígenas.",
    texto: "Se recuerda el encuentro entre Europa y América, que comenzó con la llegada de Cristóbal Colón el 12 de octubre de 1492. Antes se llamaba Día de la Raza; hoy es una fecha para reflexionar sobre la diversidad cultural y los pueblos indígenas.", emoji: "🌎",
    tambien: [{ code: "VE", pais: "Venezuela" }, { code: "CO", pais: "Colombia" }] },
  { date: "2026-10-31", dia: "Sábado 31 de octubre", nombre: "Día de las Iglesias Evangélicas y Protestantes", titulo: "Día de las Iglesias **Evangélicas y Protestantes**", horario: "08:30 a 16:00", cierre: "16:00", photo: "fer_portal-wittenberg", pos: "50% 50%",
    motivo: "Se recuerda el inicio de la Reforma Protestante en 1517 y se reconoce el aporte de las iglesias evangélicas y protestantes y la libertad de culto.",
    texto: "Se conmemora cada 31 de octubre porque ese día de 1517 Martín Lutero dio inicio a la Reforma Protestante. El feriado se instituyó con la Ley 20.299 (2008) para reconocer el aporte social, espiritual y cultural de las iglesias evangélicas y protestantes, y la libertad de culto.", emoji: "🙏" },
  { date: "2026-12-08", dia: "Martes 8 de diciembre", nombre: "Inmaculada Concepción", titulo: "Inmaculada **Concepción**", horario: "08:30 a 20:00", cierre: "20:00", photo: "fer_inmaculada", pos: "50% 30%",
    motivo: "Se celebra la Inmaculada Concepción de la Virgen María, una fiesta religiosa del calendario católico que en Chile es feriado.",
    texto: "Se celebra la Inmaculada Concepción de la Virgen María, una fiesta religiosa del calendario católico que en Chile es feriado cada 8 de diciembre.", emoji: "🕊️",
    tambien: [{ code: "CO", pais: "Colombia" }, { code: "PE", pais: "Perú" }] },
];

const cal = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="cg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#B9E07E"/><stop offset=".55" stop-color="#90C149"/><stop offset="1" stop-color="#5F8A22"/></linearGradient><linearGradient id="cf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5B6A80"/><stop offset="1" stop-color="#2A3442"/></linearGradient></defs>
<rect x="20" y="34" width="160" height="146" rx="26" fill="url(#cf)"/><rect x="28" y="62" width="144" height="110" rx="18" fill="#fff"/>
<rect x="28" y="34" width="144" height="40" rx="18" fill="url(#cg)"/><rect x="58" y="14" width="16" height="36" rx="8" fill="#3C4858"/><rect x="126" y="14" width="16" height="36" rx="8" fill="#3C4858"/>
<path d="M62 124 l26 26 52-58" stroke="#90C149" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const calIcon = (style) => `<div class="ico" style="${style}">${cal}</div>`;

// Domingo 1 de noviembre (Todos los Santos): feriado en que NO operamos; se avisa que volvemos el lunes 2 a las 8:30
export const DOMINGO = { date: "2026-11-01", dia: "Domingo 1 de noviembre", titulo: "Día de **Todos los Santos**", tambien: [{ code: "PE", pais: "Perú" }] };

const page = (w, h, cls, inner) => `<!doctype html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=${w},height=${h}"><link rel="stylesheet" href="kit.css"></head><body class="${cls}"><div id="root">${inner}</div></body></html>`;
const foot = (dark) => `<div class="m abs" style="left:80px;right:80px;bottom:60px;display:flex;justify-content:space-between;font-weight:700;font-size:26px;color:${dark ? "rgba(255,255,255,.88)" : "var(--gray)"}"><span>@girosdelsur</span><span>girosdelsur.com</span></div>`;
const hoursPill = (f, bg, color) => `<span class="m" style="display:inline-block;background:${bg};color:${color};font-weight:800;font-size:40px;padding:22px 40px;border-radius:999px;box-shadow:0 14px 34px rgba(44,54,68,.28)">Atendemos de ${f.horario}</span>`;
// "También es feriado en" + banderas (Venezuela, Colombia, Perú)
export const tambienHTML = (f, color, size = 34) => f.tambien?.length
  ? `<div style="display:flex;align-items:center;flex-wrap:wrap;gap:8px 22px;font-weight:600;font-size:${size}px;color:${color}"><span>También feriado en</span>${f.tambien.map((t) => `<span style="display:inline-flex;align-items:center;gap:10px">${flag(t.code, Math.round(size * 1.35))}<b class="m" style="font-weight:800">${t.pais}</b></span>`).join("")}</div>`
  : "";
const big = (f) => (f.nombre.length > 30 ? 84 : 112);

// Historia 1 — apertura: aviso del feriado (verde)
export function storyApertura(f) {
  return page(1080, 1920, "story", `${bgGreen}
  ${orb("right:-220px;top:-160px;width:720px;height:720px;background:rgba(255,255,255,.13)")}
  ${orb("left:-260px;bottom:260px;width:660px;height:660px;background:rgba(255,255,255,.09)")}
  ${logo("white-t", 70, "left:50%;top:84px;transform:translateX(-50%)")}
  <div class="abs" style="left:80px;right:80px;top:330px">
    <span class="m" style="display:inline-block;background:var(--grafito);color:#fff;font-weight:800;font-size:34px;letter-spacing:.1em;padding:14px 32px;border-radius:999px">FERIADO EN CHILE</span>
    <div class="m" style="font-weight:700;font-size:40px;color:#fff;margin-top:34px">${f.dia}</div>
    <div class="m" style="font-weight:800;font-size:${big(f)}px;line-height:1.05;letter-spacing:-.02em;color:#fff;margin-top:26px">${hl(f.titulo, "var(--grafito)")}</div>
  </div>
  <div class="abs" style="left:80px;right:80px;top:800px;font-weight:500;font-size:38px;line-height:1.36;color:#fff">${f.motivo}</div>
  <div class="abs" style="left:80px;right:80px;top:1075px">
    <div style="font-weight:600;font-size:56px;line-height:1.2;color:#fff">Hoy <b class="m" style="font-weight:800;color:var(--grafito)">trabajamos con normalidad</b></div>
    <div style="margin-top:44px">${hoursPill(f, "#fff", "var(--grafito)")}</div>
  </div>
  ${calIcon("right:50px;top:1075px;width:230px;height:230px;transform:rotate(6deg)")}
  <div class="abs" style="left:80px;right:80px;top:1400px">${tambienHTML(f, "#fff")}</div>
  <div class="abs" style="left:80px;bottom:260px">${cta("COTIZA EN GIROSDELSUR.COM", "#fff", "var(--grafito)")}</div>
  ${foot(true)}`);
}

// Historia 2 — recordatorio de mediodía (crema)
export function storyMediodia(f) {
  return page(1080, 1920, "story", `${bgCream}
  ${logo("color", 70, "left:50%;top:84px;transform:translateX(-50%)")}
  <div class="abs" style="left:80px;right:80px;top:330px">
    ${kicker("Feriado en Chile", "var(--green-d)")}
    <div class="m" style="font-weight:800;font-size:112px;line-height:1.04;letter-spacing:-.02em;color:var(--grafito);margin-top:26px">Seguimos <span style="color:var(--green)">atendiendo</span></div>
    <div style="font-weight:500;font-size:48px;line-height:1.3;color:var(--grafito);margin-top:34px">Aunque hoy sea feriado, puedes cotizar y enviar con normalidad en girosdelsur.com.</div>
  </div>
  <div class="abs" style="left:80px;top:1130px">${hoursPill(f, "var(--green)", "#fff")}</div>
  ${icon("check", "right:50px;top:1090px;width:210px;height:210px")}
  <div class="abs" style="left:80px;bottom:340px">${cta("ENVÍA EN GIROSDELSUR.COM", "var(--grafito)")}</div>
  ${foot(false)}`);
}

// Historia del domingo feriado: descansamos, volvemos el lunes 2 a las 08:30 (azul grafito)
export function storyDomingo(f) {
  return page(1080, 1920, "story", `${bgGraf}
  ${orb("right:-220px;top:-160px;width:720px;height:720px;background:rgba(144,193,73,.16)")}
  ${orb("left:-260px;bottom:260px;width:660px;height:660px;background:rgba(144,193,73,.1)")}
  ${logo("white-t", 70, "left:50%;top:84px;transform:translateX(-50%)")}
  <div class="abs" style="left:80px;right:80px;top:330px">
    <span class="m" style="display:inline-block;background:var(--green);color:#fff;font-weight:800;font-size:34px;letter-spacing:.1em;padding:14px 32px;border-radius:999px">FERIADO EN CHILE</span>
    <div class="m" style="font-weight:700;font-size:40px;color:var(--green-l);margin-top:34px">${f.dia}</div>
    <div class="m" style="font-weight:800;font-size:112px;line-height:1.05;letter-spacing:-.02em;color:#fff;margin-top:26px">${hl(f.titulo, "var(--green)")}</div>
  </div>
  <div class="abs" style="left:80px;right:80px;top:880px;font-weight:600;font-size:56px;line-height:1.2;color:#fff">Hoy <b class="m" style="font-weight:800;color:var(--green)">descansamos</b></div>
  <div class="abs" style="left:80px;right:80px;top:1040px">
    <div style="font-weight:500;font-size:44px;line-height:1.3;color:rgba(255,255,255,.92)">Retomamos el lunes 2 de noviembre desde las 08:30.</div>
    <div style="margin-top:40px"><span class="m" style="display:inline-block;background:#fff;color:var(--grafito);font-weight:800;font-size:40px;padding:22px 40px;border-radius:999px;box-shadow:0 14px 34px rgba(0,0,0,.28)">Volvemos lunes 08:30</span></div>
  </div>
  ${calIcon("right:50px;top:1230px;width:230px;height:230px;transform:rotate(6deg)")}
  <div class="abs" style="left:80px;right:80px;top:1480px">${tambienHTML(f, "rgba(255,255,255,.92)")}</div>
  <div class="abs" style="left:80px;bottom:260px">${cta("COTIZA EN GIROSDELSUR.COM", "var(--green)")}</div>
  ${foot(true)}`);
}

// Post de feed — aviso del feriado con foto
export function feed(f) {
  return page(1080, 1350, "feed", `${bgGraf}
  ${orb("left:-240px;bottom:-120px;width:760px;height:760px;background:rgba(144,193,73,.14)")}
  ${logo("white-t", 64, "left:64px;top:56px")}
  <div class="abs" style="right:60px;top:90px;width:370px;height:480px;border-radius:44px;border:10px solid var(--green);overflow:hidden;transform:rotate(3deg);box-shadow:0 24px 60px rgba(0,0,0,.45)">${photo(f, "left:0;top:0;width:100%;height:100%")}</div>
  <div class="abs" style="left:64px;top:170px;width:600px">
    <span class="m" style="display:inline-block;background:var(--green);color:#fff;font-weight:800;font-size:28px;letter-spacing:.1em;padding:12px 26px;border-radius:999px">FERIADO EN CHILE</span>
    <div class="m" style="font-weight:700;font-size:34px;color:var(--green-l);margin-top:24px">${f.dia}</div>
    <div class="m" style="font-weight:800;font-size:${f.nombre.length > 30 ? 60 : 74}px;line-height:1.05;letter-spacing:-.02em;color:#fff;margin-top:16px">${hl(f.titulo, "var(--green)")}</div>
  </div>
  <div class="abs" style="left:56px;right:56px;top:690px;background:var(--cream);border-radius:44px;padding:36px 44px;box-shadow:0 24px 60px rgba(0,0,0,.4);display:flex;align-items:center;gap:30px">
    <div style="width:130px;height:130px;flex:none;position:relative">${cal}</div>
    <div>
      <div class="m" style="font-weight:800;font-size:46px;line-height:1.12;color:var(--grafito)">Hoy trabajamos <span style="color:var(--green-d)">con normalidad</span></div>
      <div style="font-weight:600;font-size:34px;color:var(--grafito);margin-top:10px">Atendemos de ${f.horario}</div>
      ${f.tambien?.length ? `<div style="margin-top:14px">${tambienHTML(f, "var(--grafito)", 26)}</div>` : ""}
    </div>
  </div>
  <div class="abs" style="left:64px;right:64px;top:${f.tambien?.length ? 1000 : 948}px;text-align:center;font-weight:500;font-size:28px;line-height:1.36;color:rgba(255,255,255,.92)">${f.motivo}</div>
  <div class="abs" style="left:70px;right:70px;top:${f.tambien?.length ? 1150 : 1100}px;text-align:center">${cta("COTIZA EN GIROSDELSUR.COM", "var(--green)")}</div>
  <div class="m abs" style="left:80px;right:80px;bottom:34px;display:flex;justify-content:space-between;font-weight:700;font-size:24px;color:rgba(255,255,255,.85)"><span>@girosdelsur</span><span>girosdelsur.com</span></div>`);
}

export const captionFeriado = (f) => `Hoy ${f.dia.toLowerCase()} es feriado en Chile: ${f.nombre} ${f.emoji}

${f.texto}

En Giros del Sur trabajamos con normalidad 💚
🕗 Atendemos de ${f.horario}.

👉 Cotiza y envía en girosdelsur.com

#GirosDelSur #Remesas #EnviarDinero #RemesasInternacionales #Migrantes #EnvíoDeDinero #Chile #Venezuela #Feriado`;

const OUT = process.env.FERIADOS_OUT ?? "content/feriados-v2";
if (process.argv[1]?.endsWith("feriados.mjs")) {
  for (const f of FERIADOS) {
    await renderPage(storyApertura(f), { width: 1080, height: 1920, out: `${OUT}/${f.date}_story-apertura.jpg` });
    await renderPage(storyMediodia(f), { width: 1080, height: 1920, out: `${OUT}/${f.date}_story-mediodia.jpg` });
    await renderPage(feed(f), { width: 1080, height: 1350, out: `${OUT}/${f.date}_feed.jpg` });
    console.log("ok", f.date);
  }
  await renderPage(storyDomingo(DOMINGO), { width: 1080, height: 1920, out: `${OUT}/${DOMINGO.date}_story-domingo.jpg` });
  console.log("ok", DOMINGO.date);
  await closeBrowser();
}
