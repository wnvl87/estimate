import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const context = { window: {} };
vm.createContext(context);
for (const file of ['quote_products.js', 'combination_rules.js']) {
  vm.runInContext(fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8'), context, { filename: file });
}

const products = context.window.QUOTE_PRODUCTS;
const rules = context.window.ARTHUR_COMBINATION_RULES;
const ds10 = products.find((product) => product.name === 'DS10');
assert.equal(ds10.id, 'legacy-cat-178661556928627');
assert.equal(ds10.passive, true);

for (const rule of rules) {
  assert.ok(products.some((product) => product.id === rule.conditions.speakerProductId), `${rule.name}: 공개 스피커 제품 ID가 필요합니다.`);
  assert.ok(products.some((product) => product.id === rule.conditions.amplifierProductId), `${rule.name}: 공개 앰프 제품 ID가 필요합니다.`);
}

const ds10Rule = rules.find((rule) => rule.name === 'DS10 패시브 포인트소스 기본 구성');
assert.equal(ds10Rule.conditions.amplifierProductId, 'legacy-cat-178661556928639');
assert.equal(ds10Rule.conditions.maxRoomLength, 12);
console.log('combination rule public-product synchronization passed');
