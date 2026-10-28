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
  ${card(4, `Ahí aparece la cuenta ${g("Mercado Pago")}: copia los datos y adjunta tu comprobante`, 1248)}
  <div class="abs" style="left:80px;right:80px;top:1450px;font-weight:700;font-size:32px;line-height:1.3;color:var(--grafito)">La cuenta solo aparece en este último paso.</div>
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
    <div class="m" style="font-weight:900;font-size:98px;line-height:1.02;letter-spacing:-.03em;color:#fff;margin-top:22px">${hl(p.titulo, "var(--green)")}</div>
  </div>
  <div class="abs" style="left:56px;right:56px;top:665px;background:var(--cream);border-radius:44px;padding:36px 46px;box-shadow:0 24px 60px rgba(0,0,0,.4)">
    <div style="font-weight:700;font-size:30px;color:var(--green-d);letter-spacing:.06em" class="m">AHORA TRANSFIERE A</div>
    <div class="m" style="font-weight:900;font-size:56px;line-height:1.1;color:var(--grafito);margin-top:8px">INVERSIONES DEL SUR SPA</div>
    <div class="m" style="font-weight:800;font-size:44px;color:var(--grafito);margin-top:12px">Mercado Pago · <span style="color:var(--green-d)">Cuenta Vista</span></div>
    <div style="font-weight:600;font-size:30px;line-height:1.28;color:var(--grafito);margin-top:12px">La ves en el <b>último paso de tu envío</b>, dentro de girosdelsur.com.</div>
  </div>
  <div class="m abs" style="left:64px;right:64px;top:1040px;text-align:center;font-weight:800;font-size:35px;line-height:1.25;color:#fff">${p.motivo}</div>
  <div class="abs" style="left:70px;right:70px;top:1172px;text-align:center">${cta("GIROSDELSUR.COM", "var(--green)")}</div>
  <div class="m abs" style="left:80px;right:80px;bottom:28px;display:flex;justify-content:space-between;font-weight:700;font-size:24px;color:rgba(255,255,255,.85)"><span>@girosdelsur</span><span>girosdelsur.com</span></div>`);
}

const TAGS = "#GirosDelSur #Remesas #EnviarDinero #RemesasInternacionales #Migrantes #EnvíoDeDinero #Chile #Venezuela";

// fase: "2-disponible" (día de salida) · "3-anterior" (recordatorio) · "s-seguridad" (refuerzo)
export const PIEZAS = [
  { id: "cuenta_story_1-deja-de-transferir", fase: "2-disponible", tipo: "story", tema: "green", pill: "URGENTE · CAMBIO DE CUENTA", sub: "Desde hoy", titulo: "Deja de transferir a **Banco Estado**", size: 104,
    texto: "Tu pago ahora va a la cuenta de INVERSIONES DEL SUR SPA, en Mercado Pago. La ves en el último paso de tu envío.", pildora: "Cambia hoy", icono: "card" },
  { id: "cuenta_story_2-retraso", fase: "2-disponible", tipo: "story", tema: "graf", pill: "NO LO HAGAS", sub: "Si pagas a la cuenta anterior", titulo: "Tu envío se **retrasará horas, incluso días**", size: 92,
    texto: "Evítalo: paga a la cuenta nueva de Mercado Pago. Aparece en el último paso de tu operación.", pildora: "Usa la cuenta nueva", icono: "clock" },
  { id: "cuenta_story_3-pasos", fase: "2-disponible", tipo: "pasos", pill: "DÓNDE ESTÁ LA CUENTA", titulo: "Así llegas a la **cuenta correcta**" },
  { id: "cuenta_story_4-seguridad", fase: "s-seguridad", tipo: "story", tema: "cream", pill: "CUIDA TU DINERO", sub: "Antes de transferir", titulo: "Copia los datos **solo en el último paso**", size: 96,
    texto: "Las cuentas aparecen dentro de girosdelsur.com, al confirmar tu envío. Desconfía de cuentas que te lleguen por mensaje directo.", pildora: "Solo en tu envío", icono: "shield" },
  { id: "cuenta_feed_1-deja-de-transferir", fase: "2-disponible", tipo: "feed", pill: "URGENTE", titulo: "**Deja de transferir** a Banco Estado",
    motivo: "Si pagas a la cuenta anterior, tu envío se retrasará horas, incluso días.",
    caption: `🚨 ATENCIÓN: DEJA DE TRANSFERIR A BANCO ESTADO 🚨\n\nDesde hoy tus pagos van a la nueva cuenta de INVERSIONES DEL SUR SPA, en Mercado Pago (Cuenta Vista).\n\n⛔ Si sigues pagando a la cuenta de Banco Estado, tu envío se retrasará horas, incluso días.\n\n✅ ¿Dónde veo la cuenta nueva?\n1️⃣ Pon el monto\n2️⃣ Elige o agrega a tu destinatario\n3️⃣ Confirma tu envío\n4️⃣ Ahí aparecen las cuentas: copia los datos de Mercado Pago y adjunta tu comprobante\n\n🔒 Los datos solo aparecen en ese último paso, dentro de girosdelsur.com. Si te llegan por mensaje directo, desconfía.\n\n👉 Entra ahora a girosdelsur.com y paga a la cuenta correcta.\n\n${TAGS}` },
];

if (process.argv[1]?.endsWith("cuenta.mjs")) {
  for (const p of PIEZAS) {
    const out = `content/cuenta/${p.id}.jpg`;
    const isFeed = p.tipo === "feed";
    const html = p.tipo === "pasos" ? pasos(p) : isFeed ? feed(p) : story(p);
    await renderPage(html, { width: 1080, height: isFeed ? 1350 : 1920, out });
    console.log("ok", p.id);
  }
  await closeBrowser();
}
