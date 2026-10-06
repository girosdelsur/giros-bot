// preview.mjs — renderiza TODAS las plantillas con datos reales a preview/ (no publica nada)
import fs from "node:fs";
import { getSeries } from "./data.mjs";
import { hoursNote, tipFor, disclaimer } from "./info.mjs";
import { CORRIDORS, STORY_SETS, STORY_TEMPLATES, buildStory } from "./templates.mjs";
import { buildFeed, FEED_KEYS } from "./feed.mjs";
import { PHOTOS } from "./photos.mjs";
import { renderPage, closeBrowser } from "./render.mjs";

const only = process.argv[2];
const series = {};
const ctx = async (code, tplKey, i = 0, wd = 1) => {
  const cor = CORRIDORS[code];
  series[code] ??= await getSeries(cor.from, cor.to);
  const d = series[code];
  const pool = PHOTOS[tplKey]; const p = Array.isArray(pool) ? pool[0] : pool[code][0];
  return { ...d, cor, set: tplKey[1], photo: p.file, pos: p.pos, tip: tipFor(5, i), note: hoursNote(wd, 10), disclaimer: disclaimer(d.hh) };
};
fs.mkdirSync("preview", { recursive: true });
for (const [set, keys] of Object.entries(STORY_SETS)) {
  for (const k of keys) {
    if (only && !k.startsWith(only)) continue;
    await renderPage(buildStory(k, await ctx("BS", k)), { width: 1080, height: 1920, out: `preview/story_${k}.jpg` });
    console.log("ok", k);
  }
  const ck = "c" + set;
  if (only && !ck.toLowerCase().startsWith(only)) continue;
  await renderPage(buildStory(ck, await ctx("PE", ck)), { width: 1080, height: 1920, out: `preview/story_${ck}_PE.jpg` });
  await renderPage(buildStory(ck, await ctx("CO", ck)), { width: 1080, height: 1920, out: `preview/story_${ck}_CO.jpg` });
  console.log("ok", ck);
}
for (const k of FEED_KEYS) {
  if (only && !k.startsWith(only)) continue;
  await renderPage(buildFeed(k, await ctx("BS", k)), { width: 1080, height: 1350, out: `preview/feed_${k}.jpg` });
  console.log("ok", k);
}
await closeBrowser();
