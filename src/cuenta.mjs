// NOTA 28-oct: la cuenta antigua se nombra OPARMAQ SpA (Banco Estado) porque INVERSIONES DEL SUR SPA tendra pronto su propia cuenta Banco Estado; NO decir solo "Banco Estado".
// cuenta.mjs — campaña "cambio de cuenta de pago" (Banco Estado/Oparmaq → Mercado Pago/INVERSIONES DEL SUR SPA). Tono AGRESIVO (pedido del usuario).
// Uso: node src/cuenta.mjs  →  content/cuenta/<pieza>.jpg
// REGLA: en redes NUNCA van RUT ni número de cuenta (protege contra estafas de falso cambio de cuenta).
// Datos confirmados (27-oct-2026): titular INVERSIONES DEL SUR SPA · Mercado Pago · Cuenta Vista; salida mañana 28-oct entre 11:00 y 12:00; ambas
// cuentas coexisten un tiempo y la anterior desaparece pronto (sin fecha). Pagar a la cuenta anterior RETRASA la operación: de minutos a horas, incluso días
// (no prometer el "minutos": solo decir "horas, incluso días"). Se puede nombrar INVERSIONES DEL SUR SPA y Mercado Pago; NO nombrar Oparmaq.
// Flujo real: 1) monto → 2) destinatario (crear o agregar) → 3) confirmar → AHÍ aparecen las cuentas y se adjunta el comprobante ("Adjunta tu pago").
// No existe un menú "Pagos": decir "el último paso de tu envío".
import { H } from "./templates.mjs";
import { renderPage, closeBrowser } from "./render.mjs";
const { logo, cta, hl, orb, bgGreen, bgCream, bgGraf, icon } = H;

const page = (w, h, cls, inner) => `<!doctype html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=${w},height=${h}"><link rel="stylesheet" href="kit.css"></head><body class="${cls}"><div id="root">${inner}</div></body></html>`;
const foot = (dark) => `<div class="m abs" style="left:80px;right:80px;bottom:60px;display:flex;justify-content:space-between;font-weight:700;font-size:26px;color:${dark ? "rgba(255,255,255,.88)" : "var(--gray)"}"><span>@girosdelsur</span><span>girosdelsur.com</span></div>`;
const pill = (t, bg, color) => `<span class="m" style="display:inline-block;background:${bg};color:${color};font-weight:800;font-size:40px;padding:22px 40px;border-radius:999px;box-shadow:0 14px 34px rgba(44,54,68,.28)">${t}</span>`;

const THEMES = {
  green: { bg: bgGreen, logo: "white-t", ink: "#fff", acc: "var(--grafito)", tag: ["var(--grafito)", "#fff"], date: "#fff", pill: ["#fff", "var(--grafito)"], cta: ["#fff", "var(--grafito)"], foot: true, orbs: "rgba(255,255,255,.13)" },
  graf: { bg: bgGraf, logo: "white-t", ink: "#fff", acc: "var(--green)", tag: ["var(--green)", "#fff"], date: "var(--green-l)", pill: ["#fff", "var(--grafito)"], cta: ["var(--green)", "#fff"], foot: true, orbs: "rgba(144,193,73,.14)" },
  cream: { bg: bgCream, logo: "color", ink: "var(--grafito)", acc: "var(--green)", tag: ["var(--green)", "#fff"], date: "var(--green-d)", pill: ["var(--green)", "#fff"], cta: ["var(--grafito)", "#fff"], foot: false, orbs: "rgba(144,193,73,.16)" },
};

// Historia estándar: etiqueta, subtítulo, titular, texto, píldora, ícono, CTA
function story(p) {
  const T = THEMES[p.tema];
  return page(1080, 1920, "story", `${T.bg}
  ${orb(`right:-220px;top:-160px;width:720px;height:720px;background:${T.orbs}`)}
  ${orb(`left:-260px;bottom:260px;width:660px;height:660px;background:${T.orbs}`)}
  ${logo(T.logo, 70, "left:50%;top:84px;transform:translateX(-50%)")}
  <div class="abs" style="left:80px;right:80px;top:300px">
    <span class="m" style="display:inline-block;background:${T.tag[0]};color:${T.tag[1]};font-weight:800;font-size:34px;letter-spacing:.1em;padding:14px 32px;border-radius:999px">${p.pill}</span>
    <div class="m" style="font-weight:700;font-size:40px;color:${T.date};margin-top:34px">${p.sub}</div>
    <div class="m" style="font-weight:900;font-size:${p.size ?? 108}px;line-height:1.04;letter-spacing:-.025em;color:${T.ink};margin-top:24px">${hl(p.titulo, T.acc)}</div>
  </div>
  <div class="abs" style="left:80px;right:80px;top:${p.textTop ?? 930}px;font-weight:600;font-size:46px;line-height:1.32;color:${T.ink}">${p.texto}</div>
  <div class="abs" style="left:80px;top:1360px">${pill(p.pildora, T.pill[0], T.pill[1])}</div>
  ${icon(p.icono, "right:60px;top:1310px;width:230px;height:230px;transform:rotate(6deg)")}
  <div class="abs" style="left:80px;bottom:300px">${cta("GIROSDELSUR.COM", T.cta[0], T.cta[1])}</div>
  ${foot(T.foot)}`);
}

// Historia "paso a paso": el flujo real de la plataforma (monto → destinatario → confirmar → cuentas + comprobante)
function pasos(p) {
  const T = THEMES.cream;
  const g = (t) => `<span style='color:var(--green-d)'>${t}</span>`;
  const card = (n, t, top) => `<div class="abs" style="left:70px;right:70px;top:${top}px;height:176px;background:#fff;border-radius:44px;box-shadow:0 18px 50px rgba(44,54,68,.16);display:flex;align-items:center;gap:32px;padding:0 42px">
      <div class="m" style="width:96px;height:96px;flex:none;border-radius:50%;background:var(--green);color:#fff;font-weight:900;font-size:56px;display:flex;align-items:center;justify-content:center">${n}</div>
      <div class="m" style="font-weight:800;font-size:38px;line-height:1.16;color:var(--grafito)">${t}</div></div>`;
  return page(1080, 1920, "story", `${T.bg}
  ${orb(`right:-220px;top:-160px;width:720px;height:720px;background:${T.orbs}`)}
  ${logo(T.logo, 70, "left:50%;top:84px;transform:translateX(-50%)")}
  <div class="abs" style="left:80px;right:80px;top:290px">
    <span class="m" style="display:inline-block;background:var(--green);color:#fff;font-weight:800;font-size:34px;letter-spacing:.1em;padding:14px 32px;border-radius:999px">${p.pill}</span>
    <div class="m" style="font-weight:900;font-size:88px;line-height:1.04;letter-spacing:-.025em;color:var(--grafito);margin-top:30px">${hl(p.titulo, "var(--green)")}</div>
  </div>
  ${card(1, `Pon el ${g("monto")} que quieres enviar`, 660)}
  ${card(2, `Elige o agrega a tu ${g("destinatario")}`, 856)}
  ${card(3, `${g("Confirma")} tu envío`, 1052)}
  ${card(4, `Ahí aparecen las cuentas: ${g("elige una")}, copia los datos y adjunta tu comprobante`, 1248)}
  <div class="abs" style="left:80px;right:80px;top:1450px;font-weight:700;font-size:32px;line-height:1.3;color:var(--grafito)">Las cuentas solo aparecen en este último paso.</div>
  <div class="abs" style="left:80px;bottom:300px">${cta("GIROSDELSUR.COM", "var(--grafito)", "#fff")}</div>
  ${foot(false)}`);
}

// Post de feed sin foto: tarjeta crema con la cuenta nueva (solo titular y banco; los números solo dentro de la plataforma)
function feed(p) {
  return page(1080, 1350, "feed", `${bgGraf}
  ${orb("left:-240px;bottom:-120px;width:760px;height:760px;background:rgba(144,193,73,.14)")}
  ${orb("right:-200px;top:-160px;width:640px;height:640px;background:rgba(144,193,73,.12)")}
  ${logo("white-t", 60, "left:64px;top:50px")}
  ${icon("clock", "right:70px;top:46px;width:170px;height:170px;transform:rotate(8deg)")}
  <div class="abs" style="left:64px;right:64px;top:210px">
    <span class="m" style="display:inline-block;background:var(--green);color:#fff;font-weight:800;font-size:28px;letter-spacing:.1em;padding:12px 26px;border-radius:999px">${p.pill}</span>
    <div class="m" style="font-weight:900;font-size:${p.size ?? 98}px;line-height:1.02;letter-spacing:-.03em;color:#fff;margin-top:22px">${hl(p.titulo, "var(--green)")}</div>
  </div>
  <div class="abs" style="left:56px;right:56px;top:665px;background:var(--cream);border-radius:44px;padding:36px 46px;box-shadow:0 24px 60px rgba(0,0,0,.4)">
    <div style="font-weight:700;font-size:30px;color:var(--green-d);letter-spacing:.06em" class="m">AHORA TRANSFIERE A</div>
    <div class="m" style="font-weight:900;font-size:56px;line-height:1.1;color:var(--grafito);margin-top:8px">INVERSIONES DEL SUR SPA</div>
    <div class="m" style="font-weight:800;font-size:35px;color:var(--grafito);margin-top:14px;white-space:nowrap">Mercado Pago <span style="color:var(--green-d)">·</span> Banco de Chile <span style="color:var(--green-d)">·</span> Scotiabank</div>
    <div style="font-weight:600;font-size:30px;line-height:1.28;color:var(--grafito);margin-top:12px">Elige una. Los datos están en el <b>último paso de tu envío</b>, dentro de girosdelsur.com.</div>
  </div>
  <div class="m abs" style="left:64px;right:64px;top:1040px;text-align:center;font-weight:800;font-size:35px;line-height:1.25;color:#fff">${p.motivo}</div>
  <div class="abs" style="left:70px;right:70px;top:1172px;text-align:center">${cta("GIROSDELSUR.COM", "var(--green)")}</div>
  <div class="m abs" style="left:80px;right:80px;bottom:28px;display:flex;justify-content:space-between;font-weight:700;font-size:24px;color:rgba(255,255,255,.85)"><span>@girosdelsur</span><span>girosdelsur.com</span></div>`);
}

// Historia / post de anuncio: las 3 cuentas de INVERSIONES DEL SUR SPA (solo banco y titular; los números van SOLO dentro de la plataforma)
const BANCOS = ["Mercado Pago", "Banco de Chile", "Scotiabank"];
function bancos(p) {
  const T = THEMES.cream;
  const card = (b, top) => `<div class="abs" style="left:70px;right:70px;top:${top}px;height:150px;background:#fff;border-radius:40px;box-shadow:0 18px 50px rgba(44,54,68,.16);display:flex;align-items:center;gap:30px;padding:0 44px">
      <div style="width:84px;height:84px;flex:none;border-radius:50%;background:var(--green);display:flex;align-items:center;justify-content:center"><svg width="48" height="48" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#3C4858" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <div><div class="m" style="font-weight:900;font-size:50px;line-height:1.05;color:var(--grafito)">${b}</div><div style="font-weight:600;font-size:28px;color:var(--green-d);margin-top:6px">INVERSIONES DEL SUR SPA</div></div></div>`;
  return page(1080, 1920, "story", `${T.bg}
  ${orb(`right:-220px;top:-160px;width:720px;height:720px;background:${T.orbs}`)}
  ${logo(T.logo, 70, "left:50%;top:84px;transform:translateX(-50%)")}
  <div class="abs" style="left:80px;right:80px;top:300px">
    <span class="m" style="display:inline-block;background:var(--green);color:#fff;font-weight:800;font-size:34px;letter-spacing:.1em;padding:14px 32px;border-radius:999px">${p.pill}</span>
    <div class="m" style="font-weight:900;font-size:90px;line-height:1.04;letter-spacing:-.025em;color:var(--grafito);margin-top:30px">${hl(p.titulo, "var(--green)")}</div>
  </div>
  ${BANCOS.map((b, i) => card(b, 760 + i * 190)).join("")}
  <div class="abs" style="left:80px;right:80px;top:1350px;font-weight:700;font-size:35px;line-height:1.3;color:var(--grafito)">${p.nota}</div>
  <div class="abs" style="left:80px;bottom:300px">${cta("GIROSDELSUR.COM", "var(--grafito)", "#fff")}</div>
  ${foot(false)}`);
}
function bancosFeed(p) {
  const row = (b, top) => `<div class="abs" style="left:56px;right:56px;top:${top}px;height:112px;background:var(--cream);border-radius:34px;box-shadow:0 18px 50px rgba(0,0,0,.35);display:flex;align-items:center;justify-content:space-between;padding:0 40px">
      <div class="m" style="font-weight:900;font-size:46px;color:var(--grafito)">${b}</div><div style="font-weight:700;font-size:26px;color:var(--green-d)">INVERSIONES DEL SUR SPA</div></div>`;
  return page(1080, 1350, "feed", `${bgGraf}
  ${orb("left:-240px;bottom:-120px;width:760px;height:760px;background:rgba(144,193,73,.14)")}
  ${orb("right:-200px;top:-160px;width:640px;height:640px;background:rgba(144,193,73,.12)")}
  ${logo("white-t", 60, "left:64px;top:50px")}
  ${icon("card", "right:70px;top:46px;width:170px;height:170px;transform:rotate(8deg)")}
  <div class="abs" style="left:64px;right:64px;top:210px">
    <span class="m" style="display:inline-block;background:var(--green);color:#fff;font-weight:800;font-size:28px;letter-spacing:.1em;padding:12px 26px;border-radius:999px">${p.pill}</span>
    <div class="m" style="font-weight:900;font-size:92px;line-height:1.02;letter-spacing:-.03em;color:#fff;margin-top:22px">${hl(p.titulo, "var(--green)")}</div>
  </div>
  ${BANCOS.map((b, i) => row(b, 560 + i * 135)).join("")}
  <div class="m abs" style="left:64px;right:64px;top:985px;text-align:center;font-weight:800;font-size:33px;line-height:1.25;color:#fff">${p.motivo}</div>
  <div class="abs" style="left:70px;right:70px;top:1150px;text-align:center">${cta("GIROSDELSUR.COM", "var(--green)")}</div>
  <div class="m abs" style="left:80px;right:80px;bottom:28px;display:flex;justify-content:space-between;font-weight:700;font-size:24px;color:rgba(255,255,255,.85)"><span>@girosdelsur</span><span>girosdelsur.com</span></div>`);
}

const TAGS = "#GirosDelSur #Remesas #EnviarDinero #RemesasInternacionales #Migrantes #EnvíoDeDinero #Chile #Venezuela";

// fase: "2-disponible" (día de salida) · "3-anterior" (recordatorio) · "s-seguridad" (refuerzo)
export const PIEZAS = [
  { id: "cuenta_story_1-deja-de-transferir", fase: "2-disponible", tipo: "story", tema: "green", pill: "URGENTE · CAMBIO DE CUENTA", sub: "Cuenta de Banco Estado · desde hoy", titulo: "Deja de transferir a **OPARMAQ SpA**", size: 110,
    texto: "Tu pago ahora va a una cuenta de INVERSIONES DEL SUR SPA: Mercado Pago, Banco de Chile o Scotiabank. Las ves en el último paso de tu envío.", pildora: "Cambia hoy", icono: "card" },
  { id: "cuenta_story_2-retraso", fase: "2-disponible", tipo: "story", tema: "graf", pill: "NO LO HAGAS", sub: "Si pagas a OPARMAQ SpA (Banco Estado)", titulo: "Tu envío se **retrasará horas, incluso días**", size: 92,
    texto: "Evítalo: paga a una de las cuentas nuevas. Aparecen en el último paso de tu operación.", pildora: "Usa una cuenta nueva", icono: "clock" },
  { id: "cuenta_story_3-pasos", fase: "2-disponible", tipo: "pasos", pill: "DÓNDE ESTÁN LAS CUENTAS", titulo: "Así llegas a las **cuentas nuevas**" },
  { id: "cuenta_story_4-seguridad", fase: "s-seguridad", tipo: "story", tema: "cream", pill: "CUIDA TU DINERO", sub: "Antes de transferir", titulo: "Copia los datos **solo en el último paso**", size: 96,
    texto: "Las cuentas aparecen dentro de girosdelsur.com, al confirmar tu envío. Desconfía de cuentas que te lleguen por mensaje directo.", pildora: "Solo en tu envío", icono: "shield" },
  { id: "cuenta_story_5-tres-cuentas", fase: "2-disponible", tipo: "bancos", pill: "NUEVAS CUENTAS", titulo: "Ahora puedes pagar a **3 cuentas**",
    nota: "Elige una en el último paso de tu envío. Los datos de cada cuenta están ahí, dentro de girosdelsur.com." },
  { id: "cuenta_feed_2-tres-cuentas", fase: "2-disponible", tipo: "bancosfeed", pill: "NUEVAS CUENTAS", titulo: "Ahora puedes pagar a **3 cuentas**",
    motivo: "Elige una en el último paso de tu envío. No transfieras a OPARMAQ SpA (Banco Estado).",
    caption: `🆕 Ahora tienes 3 cuentas para pagar tu envío 💳\n\nINVERSIONES DEL SUR SPA abrió cuentas en:\n🟢 Mercado Pago\n🟢 Banco de Chile\n🟢 Scotiabank\n\n¿Dónde las veo? En el último paso de tu envío en girosdelsur.com:\n1️⃣ Pon el monto\n2️⃣ Elige o agrega a tu destinatario\n3️⃣ Confirma tu envío\n4️⃣ Ahí aparecen las cuentas: elige una, copia los datos y adjunta tu comprobante\n\n⛔ Recuerda: no transfieras a la cuenta de OPARMAQ SpA (Banco Estado).\n\n🔒 Los datos solo aparecen en ese último paso, dentro de girosdelsur.com. Si te llegan por mensaje directo, desconfía.\n\n👉 Entra ahora a girosdelsur.com\n\n${TAGS}` },
  { id: "cuenta_feed_1-deja-de-transferir", fase: "2-disponible", tipo: "feed", pill: "URGENTE", titulo: "**Deja de transferir** a la cuenta de OPARMAQ SpA", size: 80,
    motivo: "Si pagas a OPARMAQ SpA (Banco Estado), tu envío se retrasará horas, incluso días.",
    caption: `🚨 ATENCIÓN: DEJA DE TRANSFERIR A OPARMAQ SpA 🚨\n\nDesde hoy tus pagos van a las nuevas cuentas de INVERSIONES DEL SUR SPA: Mercado Pago, Banco de Chile o Scotiabank.\n\n⛔ Si sigues pagando a la cuenta de OPARMAQ SpA (Banco Estado), tu envío se retrasará horas, incluso días.\n\n✅ ¿Dónde veo la cuenta nueva?\n1️⃣ Pon el monto\n2️⃣ Elige o agrega a tu destinatario\n3️⃣ Confirma tu envío\n4️⃣ Ahí aparecen las cuentas: elige una, copia los datos y adjunta tu comprobante\n\n🔒 Los datos solo aparecen en ese último paso, dentro de girosdelsur.com. Si te llegan por mensaje directo, desconfía.\n\n👉 Entra ahora a girosdelsur.com y paga a la cuenta correcta.\n\n${TAGS}` },
];

// ───────── Fase 3: cuenta regresiva al cierre de la cuenta de Banco Estado (sábado 5-dic-2026) ─────────
// Confirmado (27-oct): el 5-dic la cuenta deja de estar disponible. Lo que se transfiera ahí después NO llega a Giros del Sur: se gestiona con los nuevos
// titulares de la cuenta y el envío queda pendiente hasta que el dinero vuelva a la cuenta Mercado Pago (no prometer que vuelve: "haremos las gestiones").
const CIERRE = "2026-12-05";
const diasHasta = (d) => Math.round((Date.UTC(2026, 11, 5) - Date.UTC(...d.split("-").map((x, i) => (i === 1 ? x - 1 : +x)))) / 864e5);

function countdown(p) {
  const T = THEMES[p.tema];
  const word = typeof p.big === "string" && isNaN(p.big);
  const bigSize = word ? (p.big.length > 4 ? 190 : 300) : 330;
  const big = p.unit
    ? `<div class="abs" style="left:80px;right:60px;top:380px;display:flex;align-items:baseline;gap:30px;color:${T.acc}"><span class="m" style="font-weight:900;font-size:${bigSize}px;line-height:1;letter-spacing:-.04em">${p.big}</span><span class="m" style="font-weight:900;font-size:112px;line-height:1;color:${T.ink}">${p.unit}</span></div>`
    : `<div class="m abs" style="left:80px;right:60px;top:${p.big.length > 4 ? 450 : 400}px;font-weight:900;font-size:${bigSize}px;line-height:1;letter-spacing:-.04em;color:${T.acc};white-space:nowrap">${p.big}</div>`;
  const tTop = p.unit ? 770 : (p.big.length > 4 ? 690 : 740);
  return page(1080, 1920, "story", `${T.bg}
  ${orb(`right:-220px;top:-160px;width:720px;height:720px;background:${T.orbs}`)}
  ${orb(`left:-260px;bottom:260px;width:660px;height:660px;background:${T.orbs}`)}
  ${logo(T.logo, 70, "left:50%;top:84px;transform:translateX(-50%)")}
  <div class="abs" style="left:80px;top:290px"><span class="m" style="display:inline-block;background:${T.tag[0]};color:${T.tag[1]};font-weight:800;font-size:34px;letter-spacing:.1em;padding:14px 32px;border-radius:999px">${p.pill}</span></div>
  ${big}
  <div class="m abs" style="left:80px;right:80px;top:${tTop}px;font-weight:800;font-size:62px;line-height:1.1;letter-spacing:-.02em;color:${T.ink}">${hl(p.titulo, T.acc)}</div>
  <div class="abs" style="left:80px;right:80px;top:${tTop + (p.unit ? 235 : 170)}px;font-weight:600;font-size:40px;line-height:1.3;color:${T.ink}">${p.texto}</div>
  <div class="abs" style="left:80px;top:1390px">${pill(p.pildora, T.pill[0], T.pill[1])}</div>
  ${icon(p.icono ?? "clock", "right:60px;top:1330px;width:220px;height:220px;transform:rotate(6deg)")}
  <div class="abs" style="left:80px;bottom:300px">${cta("GIROSDELSUR.COM", T.cta[0], T.cta[1])}</div>
  ${foot(T.foot)}`);
}

const NUEVA = "Paga a una cuenta nueva (Mercado Pago, Banco de Chile o Scotiabank) en el último paso de tu envío.";
const countPieza = (date, extra = {}) => {
  const n = diasHasta(date);
  const base = n >= 3 ? { big: String(n), unit: "días", titulo: "para que la cuenta de **OPARMAQ SpA** deje de estar disponible", texto: `Un pago hecho a OPARMAQ SpA (Banco Estado) después del 5 de diciembre no llegará a Giros del Sur y tu envío quedará pendiente. ${NUEVA}`, tema: n >= 10 ? "graf" : "green", pildora: "Cambia hoy" }
    : n === 2 ? { big: "2", unit: "días", titulo: "y la cuenta de **OPARMAQ SpA** deja de estar disponible", texto: `El sábado 5 de diciembre. Un pago hecho a OPARMAQ SpA (Banco Estado) después no llegará a Giros del Sur y tu envío quedará pendiente. ${NUEVA}`, tema: "green", pildora: "Cambia hoy" }
    : n === 1 ? { big: "MAÑANA", unit: "", titulo: "deja de estar disponible la cuenta de **OPARMAQ SpA**", texto: `Si pagas a OPARMAQ SpA (Banco Estado) desde mañana, el dinero no llegará a Giros del Sur y tu envío quedará pendiente. ${NUEVA}`, tema: "green", pildora: "Cambia ahora" }
    : { big: "HOY", unit: "", titulo: "deja de estar disponible la cuenta de **OPARMAQ SpA**", texto: `No transfieras a OPARMAQ SpA (Banco Estado): el dinero no llegará a Giros del Sur y tu envío quedará pendiente. ${NUEVA}`, tema: "green", pildora: "Paga a la cuenta nueva" };
  return { id: `cuenta_fase3_story_${date}`, fase: "3-anterior", fecha: date, hora: "11:30", tipo: "count", pill: "OPARMAQ SpA · BANCO ESTADO", icono: "clock", ...base, ...extra };
};

export const FASE3 = [
  ...["2026-11-04", "2026-11-11", "2026-11-18", "2026-11-25", "2026-12-01", "2026-12-03", "2026-12-04", "2026-12-05"].map((d) => countPieza(d)),
  { id: "cuenta_fase3_story_2026-12-07", fase: "3-anterior", fecha: "2026-12-07", hora: "11:30", tipo: "story", tema: "cream", pill: "AVISO IMPORTANTE", sub: "Cuenta de OPARMAQ SpA (Banco Estado)", titulo: "Ya **no está disponible**", size: 112,
    texto: "Si pagaste a OPARMAQ SpA, gestionaremos la devolución y te avisaremos. Tu envío queda pendiente hasta que el dinero vuelva. Paga siempre a una de las cuentas nuevas.", pildora: "Paga a la cuenta nueva", icono: "shield", textTop: 800 },
  { id: "cuenta_fase3_feed_2026-11-20", fase: "3-anterior", fecha: "2026-11-20", hora: "11:30", tipo: "feed", size: 78, pill: `QUEDAN ${diasHasta("2026-11-20")} DÍAS`, titulo: "El **5 de diciembre** se cierra la cuenta de OPARMAQ SpA",
    motivo: "Un pago hecho a OPARMAQ SpA (Banco Estado) después no llegará a Giros del Sur y tu envío quedará pendiente.",
    caption: `⏳ QUEDAN ${diasHasta("2026-11-20")} DÍAS: el sábado 5 de diciembre la cuenta de OPARMAQ SpA (Banco Estado) deja de estar disponible.\n\n⛔ Un pago hecho a esa cuenta después de esa fecha no llegará a Giros del Sur y tu envío quedará pendiente.\n\n✅ Paga a una cuenta de INVERSIONES DEL SUR SPA: Mercado Pago, Banco de Chile o Scotiabank. Las ves en el último paso de tu envío:\n1️⃣ Pon el monto\n2️⃣ Elige o agrega a tu destinatario\n3️⃣ Confirma tu envío\n4️⃣ Elige una cuenta, copia los datos y adjunta tu comprobante\n\n🔒 Copia los datos solo desde ese paso, dentro de girosdelsur.com.\n\n👉 Cambia hoy en girosdelsur.com\n\n${TAGS}` },
  { id: "cuenta_fase3_feed_2026-12-03", fase: "3-anterior", fecha: "2026-12-03", hora: "11:30", tipo: "feed", size: 82, pill: "FALTAN 2 DÍAS", titulo: "El sábado **5** se cierra la cuenta de OPARMAQ SpA",
    motivo: "Desde esa fecha, lo que pagues a OPARMAQ SpA (Banco Estado) no llegará a Giros del Sur y tu envío quedará pendiente.",
    caption: `🛑 FALTAN 2 DÍAS: el sábado 5 de diciembre la cuenta de OPARMAQ SpA (Banco Estado) deja de estar disponible.\n\n⛔ Si pagas a esa cuenta desde esa fecha, el dinero no llegará a Giros del Sur y tu envío quedará pendiente mientras hacemos las gestiones para recuperarlo.\n\n✅ Paga a una cuenta de INVERSIONES DEL SUR SPA: Mercado Pago, Banco de Chile o Scotiabank. Las encuentras en el último paso de tu envío en girosdelsur.com.\n\n🔒 Copia los datos solo desde ese paso. Desconfía de cuentas que te lleguen por mensaje directo.\n\n👉 Entra ahora a girosdelsur.com\n\n${TAGS}` },
];

if (process.argv[1]?.endsWith("cuenta.mjs")) {
  for (const p of [...PIEZAS, ...FASE3]) {
    const out = `content/cuenta-v3/${p.id}.jpg`;
    const isFeed = p.tipo === "feed" || p.tipo === "bancosfeed";
    const html = p.tipo === "pasos" ? pasos(p) : p.tipo === "count" ? countdown(p) : p.tipo === "bancos" ? bancos(p) : p.tipo === "bancosfeed" ? bancosFeed(p) : isFeed ? feed(p) : story(p);
    await renderPage(html, { width: 1080, height: isFeed ? 1350 : 1920, out });
    console.log("ok", p.id);
  }
  await closeBrowser();
}
