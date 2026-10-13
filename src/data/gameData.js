// 8 Pikud HaOref units/districts. Each item pairs a logo (unit) with its
// functional definition (zone). The unit NAME is shown on the logo card; the
// zone shows only a spoiler-free definition so the user must match the logo
// to the correct role. Definitions describe unique characteristics and never
// name the geographic region, so matching is genuinely challenging.
// The title is revealed on a correct drop.
const gameItems = [
  {
    id: "college",
    title: "מכללה לאומית לאיתנות ישראלית",
    logoUrl: "https://media.base44.com/images/public/6a3d029621c9609f8df6a4b3/795772139_.png",
    definition: "הכשרה מקצועית של בעלי תפקידים, רשויות מקומיות וגופי חירום לחיזוק החוסן הלאומי."
  },
  {
    id: "haifa",
    title: "מחוז חיפה",
    logoUrl: "https://media.base44.com/images/public/6a3d029621c9609f8df6a4b3/f33be8c8b_MahozHeifa.png",
    definition: "מרחב תעשייתי ונמל עם מתקנים אסטרטגיים, מפרץ ואזור כימי רגיש."
  },
  {
    id: "zafon",
    title: "מחוז צפון",
    logoUrl: "https://media.base44.com/images/public/6a3d029621c9609f8df6a4b3/6481cc646_MahozZafon.png",
    definition: "גזרת גבול עם איומים מטווח קצר, שטח הררי ויישובים פזורים רבים."
  },
  {
    id: "dan",
    title: "מחוז דן",
    logoUrl: "https://media.base44.com/images/public/6a3d029621c9609f8df6a4b3/bf000f7a0_MahozDan.png",
    definition: "המרחב העירוני הצפוף ביותר במדינה — מרכז אוכלוסייה, מסחר ותחבורה."
  },
  {
    id: "jerusalem",
    title: "מחוז ירושלים",
    logoUrl: "https://media.base44.com/images/public/6a3d029621c9609f8df6a4b3/deefceeff_MahozJerusalemMerkazFrom2016.png",
    definition: "מרכז שלטוני ובינלאומי עם מוסדות ממשלה ואתרים לאומיים רגישים."
  },
  {
    id: "darom",
    title: "מחוז דרום",
    logoUrl: "https://media.base44.com/images/public/6a3d029621c9609f8df6a4b3/aac476546_MahozDarom.png",
    definition: "גזרה מדברית מרחבת עם מרחקים גדולים בין יישובים ואתרים מבודדים."
  },
  {
    id: "search_rescue",
    title: "חטיבת חילוץ והדרכה",
    logoUrl: "https://media.base44.com/images/public/6a3d029621c9609f8df6a4b3/f80abab5e_NefaSdira_60.png",
    definition: "חטיבה קרבית לביטחון שוטף ולחילוץ לכודים מתחת להריסות בעת חירום."
  },
  {
    id: "tikshuv_456",
    title: "גדוד תקשוב 456",
    logoUrl: "https://media.base44.com/images/public/6a3d029621c9609f8df6a4b3/de04af6db_PakarTikshuvLogosvg.webp",
    definition: "אחריות על רציפות התקשורת, המחשוב ומערכות המידע במפקדות הפיקוד."
  }
];

export const ALL_PAIRS = gameItems.map((it) => ({
  unit: { id: it.id, name: it.title, img: it.logoUrl },
  zone: { id: `zone-${it.id}`, title: it.title, definition: it.definition }
}));

export const DIFFICULTY = { easy: 4, medium: 6, hard: 8 };
export const DIFFICULTY_LABELS = { easy: 'קל', medium: 'בינוני', hard: 'מתקדם' };

export function getPairs(difficulty = 'medium') {
  const count = DIFFICULTY[difficulty] ?? 6;
  // ערבוב אקראי (Shuffle) של הזוגות כדי שלא יופיעו תמיד אותם מחוזות באותו הסדר
  const shuffled = [...ALL_PAIRS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}