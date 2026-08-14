const options = [];
for (let amount = 100; amount <= 2000; amount += 100) options.push(amount * 10000);
for (let amount = 2500; amount <= 5000; amount += 500) options.push(amount * 10000);
for (let amount = 6000; amount <= 10000; amount += 1000) options.push(amount * 10000);
if (options[0] !== 1_000_000) throw new Error(`첫 예산값 오류: ${options[0]}`);
if (options[19] !== 20_000_000) throw new Error(`2,000만원 경계 오류: ${options[19]}`);
if (options[20] !== 25_000_000) throw new Error(`2,500만원 경계 오류: ${options[20]}`);
if (options.at(-1) !== 100_000_000) throw new Error(`1억원 경계 오류: ${options.at(-1)}`);
console.log(`budget policy verified: ${options.length} options`);
