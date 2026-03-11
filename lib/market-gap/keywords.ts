// Keyword generation logic for Market Gap reports

const keywordPatterns = [
  "{area} lawyer {city}",
  "{area} attorney {city}",
  "best {area} lawyer {city}",
  "{area} law firm {city}",
  "{area} lawyer near me",
  "{area} attorney near me",
  "best {area} attorney {city}",
  "{area} lawyer {city} {state}",
  "top {area} lawyer {city}",
  "{area} legal help {city}",
];

const expandedPatterns = [
  "affordable {area} lawyer {city}",
  "free consultation {area} lawyer {city}",
  "{area} lawyer reviews {city}",
  "experienced {area} attorney {city}",
  "how much does a {area} lawyer cost {city}",
  "do I need a {area} lawyer {city}",
  "{area} lawyer consultation {city}",
  "hire {area} attorney {city}",
  "{area} law office {city}",
  "{area} legal services {city}",
];

// Normalize practice area name for keyword use
function normalizeArea(practiceArea: string): string {
  return practiceArea
    .replace(/ lawyer marketing$/i, "")
    .replace(/ marketing$/i, "")
    .replace(/ law firm$/i, "")
    .toLowerCase()
    .trim();
}

export function generateTeaserKeywords(
  practiceArea: string,
  city: string,
  state: string
): string[] {
  const area = normalizeArea(practiceArea);
  return keywordPatterns.map((pattern) =>
    pattern
      .replace("{area}", area)
      .replace("{city}", city)
      .replace("{state}", state)
  );
}

export function generateFullKeywords(
  practiceArea: string,
  city: string,
  state: string
): string[] {
  const area = normalizeArea(practiceArea);
  const teaser = keywordPatterns.map((p) =>
    p.replace("{area}", area).replace("{city}", city).replace("{state}", state)
  );
  const expanded = expandedPatterns.map((p) =>
    p.replace("{area}", area).replace("{city}", city).replace("{state}", state)
  );
  return [...teaser, ...expanded];
}

export function generateAiSearchQueries(
  practiceArea: string,
  city: string,
  state: string
): string[] {
  const area = normalizeArea(practiceArea);
  return [
    `best ${area} lawyer in ${city} ${state}`,
    `who is the top ${area} attorney in ${city}`,
    `${area} lawyer recommendations ${city} ${state}`,
  ];
}

export function getMapsQuery(practiceArea: string, city: string): string {
  const area = normalizeArea(practiceArea);
  return `${area} lawyer near ${city}`;
}
