/**
 * Central pastel palette for the soft page heroes and closing CTA cards.
 *
 * Rules:
 *   - The home page keeps its original vivid blue-cyan hero (not from here).
 *   - No other hero uses a blue or cyan family, so nothing echoes the home hero.
 *   - Every hero colour is used on exactly one page.
 *   - Every CTA colour is used on exactly one page, and never matches that
 *     page's own hero.
 *
 * Assignments are explicit (heroByPage / ctaByPage) so they're easy to read
 * and change. When adding a page, pick an unused colour for each.
 */

type RGB = [number, number, number];

interface Pastel {
    /** top-right blob, bottom-left blob, centre blob */
    blobs: [RGB, RGB, RGB];
    /** three-stop base gradient */
    base: [string, string, string];
}

const pastels: Record<string, Pastel> = {
    // warm / neutral / green / purple families (used for heroes)
    peach:     { blobs: [[255, 185, 150], [255, 170, 195], [255, 215, 150]], base: ['#fff3ec', '#ffe9e5', '#fde8f1'] },
    lilac:     { blobs: [[200, 170, 255], [255, 175, 215], [185, 160, 255]], base: ['#f5efff', '#efe7ff', '#fce9f4'] },
    mint:      { blobs: [[130, 225, 190], [190, 235, 170], [160, 225, 200]], base: ['#ecfaf4', '#e5f7ee', '#eef9ea'] },
    butter:    { blobs: [[255, 220, 120], [185, 225, 150], [255, 190, 150]], base: ['#fffbea', '#fff6dc', '#f1f8e4'] },
    rose:      { blobs: [[255, 160, 190], [255, 200, 170], [215, 170, 255]], base: ['#fff0f4', '#ffe6ee', '#fff0e8'] },
    coral:     { blobs: [[255, 150, 130], [255, 195, 120], [255, 160, 180]], base: ['#fff0ec', '#ffe8e0', '#fff3e6'] },
    sage:      { blobs: [[175, 220, 165], [215, 235, 170], [190, 220, 180]], base: ['#f2f9ee', '#eaf5e6', '#f1f7ec'] },
    orchid:    { blobs: [[235, 160, 240], [255, 180, 220], [215, 165, 245]], base: ['#fbeffd', '#f8e9fb', '#fdeef6'] },
    apricot:   { blobs: [[255, 200, 140], [255, 225, 160], [255, 175, 150]], base: ['#fff6ea', '#fff0dd', '#ffefe6'] },
    lime:      { blobs: [[200, 235, 120], [235, 240, 150], [175, 225, 150]], base: ['#f7fbe6', '#f1f8dc', '#eef8e6'] },
    blush:     { blobs: [[255, 185, 205], [240, 200, 230], [255, 210, 190]], base: ['#fff2f6', '#fbeef7', '#fff3ef'] },
    melon:     { blobs: [[255, 175, 140], [170, 230, 180], [255, 215, 150]], base: ['#fff4ee', '#f4fbef', '#fff8e8'] },
    mauve:     { blobs: [[215, 160, 205], [235, 190, 220], [200, 175, 225]], base: ['#faf0f8', '#f5ecf6', '#f4effb'] },
    sand:      { blobs: [[240, 205, 160], [228, 214, 178], [250, 190, 160]], base: ['#fbf6ee', '#f7f1e6', '#fdf1ea'] },
    pistachio: { blobs: [[190, 225, 160], [220, 235, 185], [205, 230, 165]], base: ['#f5faef', '#eff7e8', '#f6f9ea'] },
    clay:      { blobs: [[235, 170, 140], [245, 205, 175], [225, 185, 165]], base: ['#fbf1ec', '#f8ece5', '#fcf4ee'] },
    heather:   { blobs: [[200, 185, 225], [225, 205, 225], [185, 180, 215]], base: ['#f6f3fa', '#f2eef6', '#f4f2f9'] },
    // blue / cyan families (CTA cards only; kept off heroes)
    sky:        { blobs: [[130, 190, 255], [190, 165, 255], [120, 220, 245]], base: ['#eef4ff', '#e3edff', '#ede7ff'] },
    aqua:       { blobs: [[110, 215, 235], [150, 190, 255], [130, 230, 200]], base: ['#eafaff', '#e0f5fb', '#e8efff'] },
    cobalt:     { blobs: [[120, 160, 255], [140, 200, 255], [160, 140, 255]], base: ['#edf1ff', '#e5ecff', '#ebe9ff'] },
    periwinkle: { blobs: [[165, 175, 255], [150, 215, 255], [200, 170, 255]], base: ['#f0f1ff', '#e8ecff', '#eef6ff'] },
};

type PastelName = string;

/** One unique hero colour per page (home is excluded: it stays blue-cyan). */
const heroByPage: Record<string, PastelName> = {
    services: 'peach',
    'ai-workflow-examples': 'lilac',
    'ai-workflow-assessment': 'mint',
    'ai-agents': 'orchid',
    'ai-integration': 'sage',
    website: 'butter',
    'website-revamp': 'rose',
    app: 'coral',
    erp: 'apricot',
    'interactive-3d': 'mauve',
    'graphic-designing': 'blush',
    '3d-designing': 'sand',
    'ai-rendition': 'lime',
    about: 'pistachio',
    blog: 'melon',
    'manufacturing-distribution': 'clay',
    security: 'heather',
};

/** One unique CTA colour per page, never the same as that page's hero. */
const ctaByPage: Record<string, PastelName> = {
    services: 'cobalt',
    'ai-workflow-examples': 'aqua',
    'ai-workflow-assessment': 'sky',
    'ai-agents': 'periwinkle',
    'ai-integration': 'coral',
    website: 'sage',
    'website-revamp': 'mint',
    app: 'lilac',
    erp: 'orchid',
    'interactive-3d': 'butter',
    'graphic-designing': 'apricot',
    '3d-designing': 'rose',
    'ai-rendition': 'blush',
    about: 'melon',
    'manufacturing-distribution': 'mauve',
    security: 'pistachio',
};

const rgba = ([r, g, b]: RGB, a: number) => `rgba(${r}, ${g}, ${b}, ${a})`;

/** Soft hero background, used with PageHero's light (dark-text) mode. */
function softHeroGradient(p: Pastel): string {
    const [a, b, c] = p.blobs;
    return [
        `radial-gradient(60% 85% at 92% 6%, ${rgba(a, 0.95)} 0%, ${rgba(a, 0)} 70%)`,
        `radial-gradient(60% 85% at 4% 98%, ${rgba(b, 0.85)} 0%, ${rgba(b, 0)} 70%)`,
        `radial-gradient(45% 60% at 55% 55%, ${rgba(c, 0.35)} 0%, ${rgba(c, 0)} 70%)`,
        `linear-gradient(135deg, ${p.base[0]} 0%, ${p.base[1]} 50%, ${p.base[2]} 100%)`,
    ].join(', ');
}

/** Closing CTA card background. */
function softCtaGradient(p: Pastel): string {
    const [a, b, c] = p.blobs;
    return [
        `radial-gradient(55% 70% at 10% 20%, ${rgba(a, 0.9)} 0%, ${rgba(a, 0)} 70%)`,
        `radial-gradient(55% 70% at 90% 15%, ${rgba(b, 0.85)} 0%, ${rgba(b, 0)} 70%)`,
        `radial-gradient(60% 70% at 50% 110%, ${rgba(c, 0.85)} 0%, ${rgba(c, 0)} 70%)`,
        `linear-gradient(135deg, ${p.base[0]} 0%, ${p.base[1]} 50%, ${p.base[2]} 100%)`,
    ].join(', ');
}

/** Hero background for a page key. */
export const heroGradientFor = (key: string) =>
    softHeroGradient(pastels[heroByPage[key] ?? 'peach']);

/** CTA background for a page key. */
export const ctaGradientFor = (key: string) =>
    softCtaGradient(pastels[ctaByPage[key] ?? 'lilac']);
