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

const uta1804 = products.find((product) => product.id === 'legacy-cat-178661556928641');
assert.ok(uta1804, 'UTA1804DSP는 공개 조합 규칙에 사용할 수 있어야 합니다.');
assert.equal(uta1804.name, 'UTA1804DSP');
assert.equal(uta1804.price, 1720000);

for (const [name, speakerProductId] of [
  ['DSL45 패시브 라인어레이 기본 구성', 'legacy-cat-178661556928610'],
  ['T45-Passive 패시브 라인어레이 기본 구성', 'legacy-cat-17866155692868'],
]) {
  const rule = rules.find((item) => item.name === name);
  assert.ok(rule, `${name} 규칙이 필요합니다.`);
  assert.equal(rule.conditions.speakerProductId, speakerProductId);
  assert.equal(rule.conditions.amplifierProductId, uta1804.id);
  assert.equal(rule.conditions.speakerCategory, 'line_array');
  assert.equal(rule.conditions.minPerSide, 4);
  assert.equal(rule.conditions.recommendedPerSide, 4);
  assert.equal(rule.conditions.pairQuantity, 8);
  assert.equal(rule.conditions.highEnd, true, `${name}는 확장안에서 적용되어야 합니다.`);
}
console.log('combination rule public-product synchronization passed');
