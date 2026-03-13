// PI-first keyword generation for Growth Path MVP

export function generatePIKeywords(city: string): string[] {
  const c = city.trim();
  return [
    // Core high-volume keywords
    `personal injury lawyer ${c}`,
    `car accident lawyer ${c}`,
    `truck accident lawyer ${c}`,
    `wrongful death lawyer ${c}`,
    `slip and fall lawyer ${c}`,
    // Additional practice area variants
    `motorcycle accident lawyer ${c}`,
    `work injury lawyer ${c}`,
    `personal injury attorney ${c}`,
    `best personal injury lawyer ${c}`,
    // Long-tail / intent-rich keywords
    `free consultation personal injury lawyer ${c}`,
    `how much does a personal injury lawyer cost`,
    `personal injury lawyer near me`,
    `car accident lawyer free consultation ${c}`,
    `do I need a personal injury lawyer ${c}`,
    `personal injury lawyer reviews ${c}`,
    `affordable personal injury lawyer ${c}`,
    `injury lawyer no win no fee ${c}`,
    `what to do after a car accident ${c}`,
    `best car accident attorney ${c}`,
  ];
}

/** Keywords flagged as long-tail for UI grouping */
export function getPILongTailKeywords(city: string): string[] {
  const c = city.trim();
  return [
    `free consultation personal injury lawyer ${c}`,
    `how much does a personal injury lawyer cost`,
    `personal injury lawyer near me`,
    `car accident lawyer free consultation ${c}`,
    `do I need a personal injury lawyer ${c}`,
    `personal injury lawyer reviews ${c}`,
    `affordable personal injury lawyer ${c}`,
    `injury lawyer no win no fee ${c}`,
    `what to do after a car accident ${c}`,
    `best car accident attorney ${c}`,
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
