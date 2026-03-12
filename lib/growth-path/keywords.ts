// PI-first keyword generation for Growth Path MVP

export function generatePIKeywords(city: string): string[] {
  const c = city.trim();
  return [
    `personal injury lawyer ${c}`,
    `car accident lawyer ${c}`,
    `truck accident lawyer ${c}`,
    `wrongful death lawyer ${c}`,
    `slip and fall lawyer ${c}`,
  ];
}

export function getPIMapsQuery(city: string): string {
  return `personal injury lawyer ${city.trim()}`;
}

export function getPISerpKeywords(city: string): string[] {
  const c = city.trim();
  return [
    `personal injury lawyer ${c}`,
    `car accident lawyer ${c}`,
    `truck accident lawyer ${c}`,
  ];
}
