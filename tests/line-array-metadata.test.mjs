import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const sandbox = { window: {} };
const source = readFileSync(new URL('../quote_products.js', import.meta.url), 'utf8');
vm.runInNewContext(source, sandbox, { filename: 'quote_products.js' });

const products = sandbox.window.QUOTE_PRODUCTS;
for (const productName of ['DSL 45', 'T45-Passive', 'K-LA12A']) {
  const product = products.find((item) => item.name === productName);
  assert.ok(product, `${productName} must exist in the public catalog`);
  assert.equal(product.lineArray, true, `${productName} must be marked as a line array`);
  assert.equal(product.minPerSide, 4, `${productName} must require at least four units per side`);
  assert.equal(Math.max(product.minPerSide * 2, 8), 8, `${productName} must calculate to at least eight total units`);
}

console.log('Line-array metadata test passed');
