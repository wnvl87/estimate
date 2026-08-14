import fs from 'node:fs';
import vm from 'node:vm';
const source = fs.readFileSync(new URL('./quote_products.js', import.meta.url), 'utf8');
const context = { window: {} };
vm.runInNewContext(source, context);
const products = context.window.QUOTE_PRODUCTS;
if (!Array.isArray(products) || products.length !== 17) throw new Error(`expected 17 products, received ${products?.length}`);
if (products.some((product) => product.isPrimaryProduct !== true)) throw new Error('every static quote product must be primary');
console.log(`primary quote products verified: ${products.length}`);
