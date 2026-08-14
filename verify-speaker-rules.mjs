import fs from 'node:fs';
import vm from 'node:vm';
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(new URL('./quote_products.js', import.meta.url), 'utf8'), context);
vm.runInNewContext(fs.readFileSync(new URL('./recommendation_rules.js', import.meta.url), 'utf8'), context);
const catalog = context.window.QUOTE_PRODUCTS;
const choose = (level, usage, width, length, height) => context.window.ArthurRecommendationRules.selectSpeaker({ catalog, level, usage, isExpansion: false, space: { width, length, height } }).product?.name;
const cases = [
  ['좁은 공간', choose(0, 'event', 6, 10, 4), 'DS10'],
  ['20m·5m 스피치', choose(1, 'speech', 10, 20, 5), 'DS12'],
  ['20m·5m 경계 일반', choose(1, 'event', 10, 20, 5), 'DS12'],
  ['대형 공간', choose(2, 'worship', 20, 32, 8), 'K-LA12A'],
];
for (const [label, actual, expected] of cases) {
  if (actual !== expected) throw new Error(`${label}: expected ${expected}, got ${actual}`);
}
console.log(`speaker recommendation scenarios verified: ${cases.length}`);
