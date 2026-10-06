// photos.mjs — qué foto usa cada plantilla (nunca se repite una foto del feed en las historias).
// pos = object-position para encuadrar bien la cara.
export const PHOTOS = {
  a1: [{ file: "w_sorpresa-luces", pos: "50% 18%" }, { file: "w_sonrisa-celular", pos: "50% 20%" }],
  a2: [{ file: "m_blanca-celular", pos: "50% 22%" }],
  a3: [{ file: "w_sonrisa-parque", pos: "50% 22%" }],
  a4: [{ file: "m_wow-tarjeta", pos: "50% 20%" }],
  b1: [{ file: "m_risa-azul", pos: "50% 20%" }, { file: "w_mesa-celular", pos: "50% 30%" }],
  b2: [{ file: "w_sorpresa-rizos", pos: "50% 22%" }],
  b3: [{ file: "m_negra-gris", pos: "50% 8%" }],
  b4: [{ file: "w_amarillo-llamada", pos: "50% 14%" }],
  c1: [{ file: "w_sonrisa-azul", pos: "50% 20%" }, { file: "w_rizos-bici", pos: "50% 22%" }],
  c2: [{ file: "m_sonrisa-rojo", pos: "50% 22%" }],
  c3: [{ file: "w_trenzas-celular", pos: "50% 0%" }],
  c4: [{ file: "m_tatuajes-sonrisa", pos: "50% 18%" }],
  // corredores: una por familia y país
  cA: { PE: [{ file: "pe_machu-picchu", pos: "50% 40%" }], CO: [{ file: "co_cometas", pos: "50% 40%" }] },
  cB: { PE: [{ file: "pe_machu-nubes", pos: "50% 35%" }], CO: [{ file: "co_azul", pos: "50% 40%" }] },
  cC: { PE: [{ file: "pe_machu-nubes", pos: "50% 45%" }], CO: [{ file: "co_cometas", pos: "50% 55%" }] },
  // feed (6 fotos distintas de las historias)
  f1: [{ file: "w_risa-luces", pos: "50% 20%" }],
  f2: [{ file: "m_gris-celular", pos: "50% 22%" }],
  f3: [{ file: "w_banca-llamada", pos: "50% 25%" }],
  f4: [{ file: "m_polo-verde", pos: "50% 25%" }],
  f5: [{ file: "w_verde-celular", pos: "50% 22%" }],
  f6: [{ file: "m_gorro-banca", pos: "50% 25%" }],
};
