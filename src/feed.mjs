// feed.mjs — 6 plantillas de post de feed (1080x1350), una por día de lunes a sábado (se repiten cada semana).
import { H } from "./templates.mjs";
const { flagsRow, rateFmt, unitRate, conv, money, varPct, logo, dot, cta, badgeHTML, kicker, photo, chart, statChips, bgGreen, bgGraf, bgCream, orb, sticker, chip, quote, tableRows } = H;

export const FEED_KEYS = ["f1", "f2", "f3", "f4", "f5", "f6"];
export const feedForWeekday = { 1: "f1", 2: "f2", 3: "f3", 4: "f4", 5: "f5", 6: "f6" };

// pie del feed: aviso de tasa + marca
const foot = (x, ink, dim) => `
  <div class="abs" style="left:70px;right:70px;bottom:62px;text-align:center;font-weight:500;font-size:22px;line-height:1.34;color:${dim}">${x.disclaimer}</div>
  <div class="m abs" style="left:80px;right:80px;bottom:22px;display:flex;justify-content:space-between;font-weight:700;font-size:23px;color:${ink}"><span>@girosdelsur</span><span>${x.note}</span></div>`;

// F1 · lunes — foto arriba + hoja crema con mini gráfico
function f1(x) {
  const c = x.cor;
  return `${bgCream}
  ${photo(x, "left:0;top:0;width:1080px;height:640px")}
  <div class="abs" style="left:0;right:0;top:0;height:230px;background:linear-gradient(to bottom,rgba(44,54,68,.5),transparent)"></div>
  ${logo("white-t", 64, "left:64px;top:56px")}
  ${sticker(`Tasa de las ${x.hh}`, "var(--green)", "#fff", "right:56px;top:70px;transform:rotate(5deg);font-size:40px")}
  <div class="abs" style="left:0;right:0;top:560px;bottom:0;background:var(--cream);border-radius:70px 70px 0 0;box-shadow:0 -20px 60px rgba(44,54,68,.25)"></div>
  ${chip(x, "var(--green)", "#fff", "left:50%;top:496px;transform:translateX(-50%) rotate(-3deg)", 52)}
  <div class="abs" style="left:80px;right:80px;top:650px">
    <div style="display:flex;align-items:center;gap:18px">${flagsRow(c, 54)}${kicker(`${c.label} · se actualiza cada hora`, "var(--green-d)")}</div>
    <div style="font-weight:600;font-size:38px;margin-top:12px">Si envías <b class="m">${money(c, c.amounts[0])}</b>, tu contacto recibe</div>
    <div class="m" style="font-weight:900;font-size:100px;letter-spacing:-.02em;line-height:1.1;color:var(--green-d)">${conv(x, c.amounts[0])} ${c.unit}</div>
    <div style="margin-top:8px">${chart(x, 920, 150, "area", { line: "#6f9a30", area: "#90C149", grid: "rgba(60,72,88,.18)", ink: "#3C4858", labels: false })}</div>
    <div style="font-weight:600;font-size:23px;color:var(--gray);margin-top:2px">Últimas 24 horas · variación de ${varPct(x)} %</div>
    <div style="margin-top:10px">${badgeHTML(x.badge, "rgba(111,154,48,.14)", "var(--green-d)", "var(--green)", "font-size:25px")}</div>
  </div>
  ${foot(x, "var(--grafito)", "var(--gray)")}`;
}

// F2 · martes — número gigante sobre verde, con barras y 3 montos
function f2(x) {
  const c = x.cor;
  return `${bgGreen}
  ${orb("right:-200px;top:-180px;width:640px;height:640px;background:rgba(255,255,255,.13)")}
  ${logo("white-t", 64, "left:64px;top:56px")}
  <div class="abs" style="right:70px;top:60px;width:270px;height:270px;border-radius:50%;border:12px solid #fff;overflow:hidden;box-shadow:0 20px 50px rgba(44,54,68,.35)">${photo(x, "left:0;top:0;width:100%;height:100%")}</div>
  <div class="abs" style="left:70px;top:190px;color:#fff;width:640px">
    <div style="display:flex;align-items:center;gap:16px">${flagsRow(c, 52)}</div>
    ${kicker(`Tasa de las ${x.hh}`, "#fff")}
    <div class="m" style="font-weight:700;font-size:46px;margin-top:18px">${c.base === 1000 ? "1.000" : "1"} ${c.fromUnit} =</div>
  </div>
  <div class="m abs" style="left:64px;top:340px;font-weight:900;font-size:176px;letter-spacing:-.04em;line-height:1;color:var(--grafito)">${rateFmt(c, x.cur)}<span style="font-size:84px;color:#fff;margin-left:14px">${c.unit}</span></div>
  <div class="abs" style="left:56px;right:56px;top:560px;background:var(--grafito);border-radius:40px;padding:24px 34px 18px">
    <div style="font-weight:600;font-size:24px;color:rgba(255,255,255,.75);margin-bottom:4px">Cada hora, últimas 24 h · variación de ${varPct(x)} %</div>
    ${chart(x, 920, 230, "bars", { line: "#90C149", grid: "rgba(255,255,255,.18)", ink: "#fff", labels: false })}
  </div>
  <div class="abs" style="left:56px;right:56px;top:880px;display:flex;gap:16px">
    ${c.amounts.map((m) => `<div style="flex:1;background:#fff;color:var(--grafito);border-radius:30px;padding:18px 10px;text-align:center;box-shadow:0 10px 26px rgba(44,54,68,.18)"><div style="font-weight:600;font-size:25px;opacity:.8">${money(c, m)}</div><div class="m" style="font-weight:800;font-size:36px;color:var(--green-d)">${conv(x, m)} ${c.unit}</div></div>`).join("")}
  </div>
  <div class="abs" style="left:70px;right:70px;top:1030px;text-align:center">${badgeHTML(x.badge, "rgba(255,255,255,.22)", "#fff", "#fff", "font-size:26px")}</div>
  <div class="abs" style="left:70px;right:70px;top:1120px;text-align:center">${cta("COTIZA EN GIROSDELSUR.COM", "#fff", "var(--grafito)")}</div>
  ${foot(x, "#fff", "rgba(255,255,255,.85)")}`;
}

// F3 · miércoles — grafito, foto inclinada y tabla de montos
function f3(x) {
  const c = x.cor;
  return `${bgGraf}
  ${orb("left:-260px;bottom:-60px;width:760px;height:760px;background:rgba(144,193,73,.12)")}
  ${logo("white-t", 64, "left:64px;top:56px")}
  <div class="abs" style="right:60px;top:90px;width:400px;height:520px;border-radius:44px;border:10px solid var(--green);overflow:hidden;transform:rotate(3deg);box-shadow:0 24px 60px rgba(0,0,0,.45)">${photo(x, "left:0;top:0;width:100%;height:100%")}</div>
  <div class="abs" style="left:64px;top:170px;width:560px;color:#fff">
    <div style="display:flex;align-items:center;gap:14px">${flagsRow(c, 50)}</div>
    ${kicker(`Tasa de las ${x.hh}`, "var(--green-l)")}
    <div class="m" style="font-weight:800;font-size:76px;line-height:1.04;letter-spacing:-.02em;margin-top:16px">Mira cuánto<br>recibe <span style="color:var(--green)">tu gente</span></div>
    <div style="font-weight:600;font-size:32px;margin-top:20px;color:rgba(255,255,255,.9)">${c.label}</div>
  </div>
  <div class="abs" style="left:56px;right:56px;top:690px;background:var(--cream);border-radius:44px;padding:14px 44px;box-shadow:0 24px 60px rgba(0,0,0,.4)">${tableRows(x, { rowInk: "var(--grafito)", numInk: "var(--green-d)", border: "rgba(60,72,88,.16)" })}</div>
  <div class="abs" style="left:70px;right:70px;top:1010px;text-align:center;color:#fff">
    <div style="font-weight:700;font-size:36px">${unitRate(c, x.cur)}</div>
    <div style="margin-top:12px">${badgeHTML(x.badge, "rgba(144,193,73,.22)", "#fff", "var(--green)", "font-size:25px")}</div>
  </div>
  <div class="abs" style="left:70px;right:70px;top:1140px;text-align:center">${cta("ENVIAR EN GIROSDELSUR.COM", "var(--green)")}</div>
  ${foot(x, "#fff", "rgba(255,255,255,.8)")}`;
}

// F4 · jueves — gráfico grande de 24 h con polaroid
function f4(x) {
  const c = x.cor;
  return `${bgCream}
  ${logo("color", 64, "left:64px;top:56px")}
  <div class="abs" style="left:64px;top:160px;width:700px">
    <div style="display:flex;align-items:center;gap:16px">${flagsRow(c, 50)}${kicker(`Tasa de las ${x.hh}`, "var(--green-d)")}</div>
    <div class="m" style="font-weight:800;font-size:88px;line-height:1.02;letter-spacing:-.02em;margin-top:16px">Así va <span style="color:var(--green)">la tasa</span><br>de hoy</div>
  </div>
  <div class="abs" style="left:56px;right:56px;top:420px;background:#fff;border-radius:44px;padding:30px 36px 22px;box-shadow:0 24px 60px rgba(44,54,68,.16)">
    <div style="font-weight:600;font-size:26px;color:var(--gray);margin-bottom:4px">${c.label} · últimas 24 horas · variación de ${varPct(x)} %</div>
    ${chart(x, 920, 400, "area", { line: "#90C149", area: "#90C149", grid: "rgba(60,72,88,.18)", ink: "#3C4858" })}
    <div style="display:flex;justify-content:space-between;margin-top:6px;font-weight:600;font-size:25px;color:var(--gray)"><span>hace 24 h</span><span>ahora</span></div>
  </div>
  <div class="abs" style="left:56px;width:640px;top:960px;display:flex;gap:14px">${statChips(x, "#fff", "var(--grafito)", "var(--green)", "#fff").replace(/font-size:40px/g, "font-size:30px")}</div>
  <div class="abs" style="right:56px;top:850px;width:270px;height:330px;border:10px solid #fff;border-radius:34px;transform:rotate(5deg);box-shadow:0 20px 50px rgba(44,54,68,.35);overflow:hidden;background:#fff">${photo(x, "left:0;top:0;width:100%;height:100%")}</div>
  <div class="abs" style="left:64px;width:640px;top:1105px;color:var(--grafito)">
    ${x.badge ? badgeHTML(x.badge, "rgba(111,154,48,.14)", "var(--green-d)", "var(--green)", "font-size:24px") : `<div style="font-weight:600;font-size:34px">Hoy <b class="m">${money(c, c.amounts[0])}</b> → <b class="m" style="color:var(--green-d)">${conv(x, c.amounts[0])} ${c.unit}</b></div>`}
  </div>
  ${foot(x, "var(--grafito)", "var(--gray)")}`;
}

// F5 · viernes — cotizador sobre verde con foto redonda
function f5(x) {
  const c = x.cor;
  const q = quote(x, { bg: "var(--cream)", ink: "var(--grafito)", boxBg: "#fff", boxInk: "var(--grafito)", numInk: "var(--green-d)", arrowBg: "var(--green)", rateBg: "var(--grafito)", rateInk: "#fff", amt: 2 }).replace('class="abs" style="', 'class="abs" style="top:0;');
  return `${bgGreen}
  ${orb("left:-220px;bottom:-120px;width:640px;height:640px;background:rgba(255,255,255,.1)")}
  ${logo("white-t", 64, "left:64px;top:56px")}
  <div class="abs" style="right:70px;top:64px;width:330px;height:330px;border-radius:50%;border:12px solid #fff;overflow:hidden;box-shadow:0 20px 50px rgba(44,54,68,.35)">${photo(x, "left:0;top:0;width:100%;height:100%")}</div>
  <div class="abs" style="left:64px;top:190px;width:620px;color:#fff">
    <div style="display:flex;align-items:center;gap:14px">${flagsRow(c, 50)}</div>
    ${kicker(`${dot}Tasa de las ${x.hh}`, "#fff")}
    <div class="m" style="font-weight:800;font-size:72px;line-height:1.05;letter-spacing:-.02em;margin-top:14px">Cotiza y mira<br>lo que <span style="color:var(--grafito)">recibe</span><br>tu contacto</div>
  </div>
  <div class="abs" style="top:520px;left:0;right:0">${q}</div>
  <div class="abs" style="left:70px;right:70px;top:1110px;text-align:center;color:#fff">${badgeHTML(x.badge, "rgba(255,255,255,.22)", "#fff", "#fff", "font-size:24px")}</div>
  ${foot(x, "#fff", "rgba(255,255,255,.85)")}`;
}

// F6 · sábado — foto a pantalla completa con tarjeta flotante y horario del sábado
function f6(x) {
  const c = x.cor;
  return `${photo(x, "left:0;top:0;width:1080px;height:1350px")}
  <div class="abs" style="inset:0;background:linear-gradient(to bottom,rgba(60,72,88,.4) 0%,rgba(60,72,88,0) 25%,rgba(44,54,68,0) 42%,rgba(44,54,68,.85) 100%)"></div>
  ${logo("white-t", 64, "left:64px;top:56px")}
  ${sticker("¡Buen sábado!", "var(--green)", "#fff", "right:56px;top:70px;transform:rotate(5deg);font-size:42px")}
  <div class="abs" style="left:56px;right:56px;top:640px;background:#fff;border-radius:48px;padding:34px 44px;box-shadow:0 26px 70px rgba(0,0,0,.35);text-align:center">
    <div style="display:flex;justify-content:center;align-items:center;gap:16px">${flagsRow(c, 56)}${kicker(`Tasa de las ${x.hh}`, "var(--green-d)")}</div>
    <div class="m" style="font-weight:700;font-size:38px;margin-top:14px;color:var(--grafito)">${c.base === 1000 ? "1.000" : "1"} ${c.fromUnit} =</div>
    <div class="m" style="font-weight:900;font-size:112px;letter-spacing:-.03em;line-height:1.05;color:var(--green-d)">${rateFmt(c, x.cur)} <span style="font-size:60px;color:var(--grafito)">${c.unit}</span></div>
    <div style="font-weight:600;font-size:32px;margin-top:8px;color:var(--grafito)">Con <b class="m">${money(c, c.amounts[1])}</b> recibe <b class="m" style="color:var(--green-d)">${conv(x, c.amounts[1])} ${c.unit}</b></div>
    <div style="margin-top:14px">${badgeHTML(x.badge, "rgba(111,154,48,.14)", "var(--green-d)", "var(--green)", "font-size:24px")}</div>
  </div>
  <div class="abs" style="left:70px;right:70px;top:1130px;text-align:center">${cta("COTIZA EN GIROSDELSUR.COM", "var(--green)")}</div>
  ${foot(x, "#fff", "rgba(255,255,255,.85)")}`;
}

const FEEDS = { f1, f2, f3, f4, f5, f6 };
export const buildFeed = (key, x) => `<!doctype html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=1080,height=1350">
<link rel="stylesheet" href="kit.css"></head><body class="feed"><div id="root">${FEEDS[key](x)}</div></body></html>`;

export function feedCaption(x) {
  const c = x.cor;
  return `Así está la tasa ${c.label} a las ${x.hh}. 📈
${x.badge ? x.badge.replace("▲ ", "") + ".\n" : ""}
Con ${money(c, c.amounts[0])}, tu contacto recibe ${conv(x, c.amounts[0])} ${c.unit} (ejemplo con la tasa de este momento).

La tasa se actualiza automáticamente en tiempo real: la verdadera es la que ves en girosdelsur.com. Esta es la del momento de publicación (${x.hh}).

Dato: ${x.tip}
${x.note}.

Cotiza y envía en girosdelsur.com

#GirosDelSur #Remesas #EnviarDinero #RemesasAVenezuela #EnvíoDeDinero #Chile #Venezuela #TasaDelDía`;
}
