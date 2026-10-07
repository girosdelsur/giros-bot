// paises.mjs — historias para conmemorar feriados de Venezuela, Colombia y Perú (los 4 países de trabajo: + Chile),
// siempre recordando que Giros del Sur sigue operativo. Uso: node src/paises.mjs → content/feriados-paises/<fecha>_story-<pais>.jpg
// Feriados verificados en prensa oficial/local (octubre 2026 – enero 2027).
import { H } from "./templates.mjs";
import { renderPage, closeBrowser } from "./render.mjs";
const { logo, cta, hl, orb, bgGreen, bgGraf, bgCream, icon, flag } = H;

const PAIS = { PE: "Perú", CO: "Colombia", VE: "Venezuela" };

// Horario normal de Giros del Sur: L–V 08:30–20:00 (todas estas fechas caen en día hábil)
export const PIEZAS = [
  { date: "2026-10-08", dia: "Jueves 8 de octubre", code: "PE", titulo: "Combate de **Angamos**", motivo: "Hoy se conmemora el Combate de Angamos en Perú.", horario: "08:30 a 20:00", tema: "green" },
  { date: "2026-11-02", dia: "Lunes 2 de noviembre", code: "CO", titulo: "Día de **Todos los Santos**", motivo: "En Colombia, el feriado de Todos los Santos se traslada al lunes 2 de noviembre.", horario: "08:30 a 20:00", tema: "graf" },
  { date: "2026-11-16", dia: "Lunes 16 de noviembre", code: "CO", titulo: "Independencia de **Cartagena**", motivo: "Se conmemora la independencia de Cartagena, proclamada el 11 de noviembre de 1811. El feriado se traslada al lunes 16.", horario: "08:30 a 20:00", tema: "green" },
  { date: "2026-12-09", dia: "Miércoles 9 de diciembre", code: "PE", titulo: "Batalla de **Ayacucho**", motivo: "Se recuerda la Batalla de Ayacucho de 1824, decisiva para la independencia de Perú y de Sudamérica.", horario: "08:30 a 20:00", tema: "graf" },
];

const page = (inner) => `<!doctype html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=1080,height=1920"><link rel="stylesheet" href="kit.css"></head><body class="story"><div id="root">${inner}</div></body></html>`;
const foot = `<div class="m abs" style="left:80px;right:80px;bottom:60px;display:flex;justify-content:space-between;font-weight:700;font-size:26px;color:rgba(255,255,255,.88)"><span>@girosdelsur</span><span>girosdelsur.com</span></div>`;

function story(p) {
  const verde = p.tema === "green";
  const bg = verde ? bgGreen : bgGraf;
  const acc = verde ? "var(--grafito)" : "var(--green)";
  const pais = PAIS[p.code];
  return page(`${bg}
  ${orb(`right:-220px;top:-160px;width:720px;height:720px;background:${verde ? "rgba(255,255,255,.13)" : "rgba(144,193,73,.15)"}`)}
  ${orb(`left:-260px;bottom:260px;width:660px;height:660px;background:${verde ? "rgba(255,255,255,.09)" : "rgba(144,193,73,.1)"}`)}
  ${logo("white-t", 70, "left:50%;top:84px;transform:translateX(-50%)")}
  <div class="abs" style="left:80px;right:80px;top:320px;display:flex;align-items:center;gap:22px">
    ${flag(p.code, 96)}
    <span class="m" style="display:inline-block;background:${verde ? "var(--grafito)" : "var(--green)"};color:#fff;font-weight:800;font-size:34px;letter-spacing:.08em;padding:16px 32px;border-radius:999px">FERIADO EN ${pais.toUpperCase()}</span>
  </div>
  <div class="abs" style="left:80px;right:80px;top:470px">
    <div class="m" style="font-weight:700;font-size:40px;color:${verde ? "#fff" : "var(--green-l)"}">${p.dia}</div>
    <div class="m" style="font-weight:800;font-size:108px;line-height:1.05;letter-spacing:-.02em;color:#fff;margin-top:26px">${hl(p.titulo, acc)}</div>
  </div>
  <div class="abs" style="left:80px;right:80px;top:880px;font-weight:500;font-size:40px;line-height:1.36;color:#fff">${p.motivo}</div>
  <div class="abs" style="left:80px;right:80px;top:1130px">
    <div style="font-weight:600;font-size:56px;line-height:1.2;color:#fff"><b class="m" style="font-weight:800;color:${acc}">Seguimos operativos</b></div>
    <div style="margin-top:40px"><span class="m" style="display:inline-block;background:#fff;color:var(--grafito);font-weight:800;font-size:40px;padding:22px 40px;border-radius:999px;box-shadow:0 14px 34px rgba(0,0,0,.28)">Atendemos de ${p.horario}</span></div>
  </div>
  ${icon("check", "right:60px;top:1130px;width:210px;height:210px")}
  <div class="abs" style="left:80px;bottom:300px">${cta("COTIZA EN GIROSDELSUR.COM", verde ? "#fff" : "var(--green)", verde ? "var(--grafito)" : "#fff")}</div>
  ${foot}`);
}

if (process.argv[1]?.endsWith("paises.mjs")) {
  for (const p of PIEZAS) {
    await renderPage(story(p), { width: 1080, height: 1920, out: `content/feriados-paises/${p.date}_story-${p.code.toLowerCase()}.jpg` });
    console.log("ok", p.date, p.code);
  }
  await closeBrowser();
}
