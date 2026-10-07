// cierres.mjs — avisos de horario de fin de año (Navidad y Año Nuevo): cierres y horarios especiales.
// Uso: node src/cierres.mjs  →  content/cierres/<fecha>_<pieza>.jpg
// Datos confirmados por Giros del Sur (6-oct-2026): 24-dic y 31-dic atienden hasta las 19:00; 25-dic cerrado; 26-dic (sáb) hasta las 12:00;
// 1-ene cerrado; 2-ene (sáb) cerrado. Reapertura el lunes 4-ene 08:30 (a confirmar).
import { H } from "./templates.mjs";
import { renderPage, closeBrowser } from "./render.mjs";
const { logo, cta, kicker, hl, orb, bgGreen, bgCream, bgGraf, icon, photo } = H;

const page = (w, h, cls, inner) => `<!doctype html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=${w},height=${h}"><link rel="stylesheet" href="kit.css"></head><body class="${cls}"><div id="root">${inner}</div></body></html>`;
const foot = (dark) => `<div class="m abs" style="left:80px;right:80px;bottom:60px;display:flex;justify-content:space-between;font-weight:700;font-size:26px;color:${dark ? "rgba(255,255,255,.88)" : "var(--gray)"}"><span>@girosdelsur</span><span>girosdelsur.com</span></div>`;
const pill = (t, bg, color) => `<span class="m" style="display:inline-block;background:${bg};color:${color};font-weight:800;font-size:40px;padding:22px 40px;border-radius:999px;box-shadow:0 14px 34px rgba(44,54,68,.28)">${t}</span>`;

// Historia genérica de aviso: tema = green | graf | cream
function story(p) {
  const T = {
    green: { bg: bgGreen, logo: "white-t", ink: "#fff", acc: "var(--grafito)", tag: ["var(--grafito)", "#fff"], date: "#fff", pill: ["#fff", "var(--grafito)"], cta: ["#fff", "var(--grafito)"], foot: true, orbs: "rgba(255,255,255,.13)" },
    graf: { bg: bgGraf, logo: "white-t", ink: "#fff", acc: "var(--green)", tag: ["var(--green)", "#fff"], date: "var(--green-l)", pill: ["#fff", "var(--grafito)"], cta: ["var(--green)", "#fff"], foot: true, orbs: "rgba(144,193,73,.14)" },
    cream: { bg: bgCream, logo: "color", ink: "var(--grafito)", acc: "var(--green)", tag: ["var(--green)", "#fff"], date: "var(--green-d)", pill: ["var(--green)", "#fff"], cta: ["var(--grafito)", "#fff"], foot: false, orbs: "rgba(144,193,73,.16)" },
  }[p.tema];
  return page(1080, 1920, "story", `${T.bg}
  ${orb(`right:-220px;top:-160px;width:720px;height:720px;background:${T.orbs}`)}
  ${orb(`left:-260px;bottom:260px;width:660px;height:660px;background:${T.orbs}`)}
  ${logo(T.logo, 70, "left:50%;top:84px;transform:translateX(-50%)")}
  <div class="abs" style="left:80px;right:80px;top:330px">
    <span class="m" style="display:inline-block;background:${T.tag[0]};color:${T.tag[1]};font-weight:800;font-size:34px;letter-spacing:.1em;padding:14px 32px;border-radius:999px">${p.pill}</span>
    <div class="m" style="font-weight:700;font-size:40px;color:${T.date};margin-top:34px">${p.fecha}</div>
    <div class="m" style="font-weight:800;font-size:${p.size ?? 108}px;line-height:1.05;letter-spacing:-.02em;color:${T.ink};margin-top:26px">${hl(p.titulo, T.acc)}</div>
  </div>
  <div class="abs" style="left:80px;right:80px;top:880px;font-weight:500;font-size:46px;line-height:1.32;color:${T.ink}">${p.texto}</div>
  <div class="abs" style="left:80px;top:1330px">${pill(p.pildora, T.pill[0], T.pill[1])}</div>
  ${icon(p.icono ?? "heart", "right:60px;top:1290px;width:230px;height:230px;transform:rotate(6deg)")}
  <div class="abs" style="left:80px;bottom:300px">${cta("GIROSDELSUR.COM", T.cta[0], T.cta[1])}</div>
  ${foot(T.foot)}`);
}

// Post de feed de cierre: foto temática + tarjeta con el aviso
function feed(p) {
  return page(1080, 1350, "feed", `${bgGraf}
  ${orb("left:-240px;bottom:-120px;width:760px;height:760px;background:rgba(144,193,73,.14)")}
  ${logo("white-t", 64, "left:64px;top:56px")}
  <div class="abs" style="right:60px;top:90px;width:370px;height:480px;border-radius:44px;border:10px solid var(--green);overflow:hidden;transform:rotate(3deg);box-shadow:0 24px 60px rgba(0,0,0,.45)">${photo(p, "left:0;top:0;width:100%;height:100%")}</div>
  <div class="abs" style="left:64px;top:170px;width:560px">
    <span class="m" style="display:inline-block;background:var(--green);color:#fff;font-weight:800;font-size:28px;letter-spacing:.1em;padding:12px 26px;border-radius:999px">${p.pill}</span>
    <div class="m" style="font-weight:700;font-size:34px;color:var(--green-l);margin-top:24px">${p.fecha}</div>
    <div class="m" style="font-weight:800;font-size:84px;line-height:1.05;letter-spacing:-.02em;color:#fff;margin-top:16px">${hl(p.titulo, "var(--green)")}</div>
  </div>
  <div class="abs" style="left:56px;right:56px;top:690px;background:var(--cream);border-radius:44px;padding:36px 44px;box-shadow:0 24px 60px rgba(0,0,0,.4)">
    <div class="m" style="font-weight:800;font-size:48px;line-height:1.12;color:var(--grafito)">${hl(p.cardTitulo, "var(--green-d)")}</div>
    <div style="font-weight:600;font-size:34px;line-height:1.3;color:var(--grafito);margin-top:12px">${p.cardTexto}</div>
  </div>
  <div class="abs" style="left:64px;right:64px;top:965px;text-align:center;font-weight:500;font-size:28px;line-height:1.36;color:rgba(255,255,255,.92)">${p.motivo}</div>
  <div class="abs" style="left:70px;right:70px;top:1100px;text-align:center">${cta("GIROSDELSUR.COM", "var(--green)")}</div>
  <div class="m abs" style="left:80px;right:80px;bottom:34px;display:flex;justify-content:space-between;font-weight:700;font-size:24px;color:rgba(255,255,255,.85)"><span>@girosdelsur</span><span>girosdelsur.com</span></div>`);
}

const TAGS = "#GirosDelSur #Remesas #EnviarDinero #RemesasInternacionales #Migrantes #EnvíoDeDinero #Chile #Venezuela";

export const PIEZAS = [
  { id: "2026-12-24_story-aviso-navidad", tipo: "story", tema: "green", pill: "AVISO DE HORARIO", fecha: "Jueves 24 de diciembre", titulo: "Hoy atendemos **hasta las 19:00**", texto: "Mañana, viernes 25, es Navidad y no operamos. Retomamos el sábado 26 de 08:30 a 12:00.", pildora: "Hoy hasta las 19:00", icono: "clock" },
  { id: "2026-12-25_story-navidad", tipo: "story", tema: "graf", pill: "FERIADO EN CHILE", fecha: "Viernes 25 de diciembre", titulo: "Feliz **Navidad**", texto: "Hoy no operamos. Que la pases junto a los tuyos. Volvemos mañana, sábado 26, de 08:30 a 12:00.", pildora: "Volvemos sábado 08:30", icono: "heart" },
  { id: "2026-12-25_feed-navidad", tipo: "feed", photo: "fer_navidad", pos: "50% 40%", pill: "FERIADO EN CHILE", fecha: "Viernes 25 de diciembre", titulo: "Feliz **Navidad**", cardTitulo: "Hoy **no operamos**", cardTexto: "Volvemos mañana, sábado 26 de diciembre, de 08:30 a 12:00.", motivo: "Desde Giros del Sur te deseamos una Navidad llena de unión y cariño junto a los tuyos.",
    caption: `Feliz Navidad 🎄💚\n\nDesde Giros del Sur te deseamos una Navidad llena de unión y cariño junto a los tuyos.\n\nHoy viernes 25 de diciembre, feriado en Chile, no operamos. Volvemos mañana sábado 26 de 08:30 a 12:00.\n\n👉 Cotiza en girosdelsur.com\n\n${TAGS} #Navidad` },
  { id: "2026-12-26_story-horario", tipo: "story", tema: "cream", pill: "HORARIO ESPECIAL", fecha: "Sábado 26 de diciembre", titulo: "Hoy atendemos **hasta las 12:00**", texto: "Estamos operativos de 08:30 a 12:00. Cotiza y envía con tiempo en girosdelsur.com.", pildora: "08:30 a 12:00", icono: "clock" },
  { id: "2026-12-31_story-aviso-anonuevo", tipo: "story", tema: "green", pill: "AVISO DE HORARIO", fecha: "Jueves 31 de diciembre", titulo: "Hoy atendemos **hasta las 19:00**", texto: "Mañana 1 de enero y el sábado 2 no operamos. Retomamos el lunes 4 de enero desde las 08:30.", pildora: "Hoy hasta las 19:00", icono: "clock" },
  { id: "2027-01-01_story-anonuevo", tipo: "story", tema: "graf", pill: "FERIADO EN CHILE", fecha: "Viernes 1 de enero", titulo: "Feliz **Año Nuevo**", texto: "Hoy no operamos. Mañana sábado 2 tampoco. Retomamos el lunes 4 de enero desde las 08:30.", pildora: "Volvemos lunes 08:30", icono: "heart" },
  { id: "2027-01-01_feed-anonuevo", tipo: "feed", photo: "fer_anonuevo", pos: "50% 45%", pill: "FERIADO EN CHILE", fecha: "Viernes 1 de enero", titulo: "Feliz **Año Nuevo**", cardTitulo: "Hoy **no operamos**", cardTexto: "Mañana sábado 2 tampoco. Volvemos el lunes 4 de enero a las 08:30.", motivo: "Gracias por confiar en Giros del Sur. ¡Que este nuevo año venga lleno de reencuentros!",
    caption: `Feliz Año Nuevo 🎆💚\n\nGracias por confiar en Giros del Sur. ¡Que este nuevo año venga lleno de reencuentros!\n\nHoy viernes 1 de enero, feriado en Chile, no operamos. Mañana sábado 2 tampoco. Volvemos el lunes 4 de enero a las 08:30.\n\n👉 Cotiza en girosdelsur.com\n\n${TAGS} #AñoNuevo` },
  { id: "2027-01-02_story-sabado-cerrado", tipo: "story", tema: "cream", pill: "AVISO DE HORARIO", fecha: "Sábado 2 de enero", titulo: "Hoy **no operamos**", texto: "Retomamos el lunes 4 de enero desde las 08:30. Puedes cotizar en girosdelsur.com cuando quieras.", pildora: "Volvemos lunes 08:30", icono: "clock" },
];

if (process.argv[1]?.endsWith("cierres.mjs")) {
  for (const p of PIEZAS) {
    const out = `content/cierres/${p.id}.jpg`;
    await renderPage(p.tipo === "story" ? story(p) : feed(p), { width: 1080, height: p.tipo === "story" ? 1920 : 1350, out });
    console.log("ok", p.id);
  }
  await closeBrowser();
}
