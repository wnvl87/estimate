/*
 * 소비자용 예상 견적에 노출 가능한 승인 품목만 정의합니다.
 * 전체 카탈로그, 원가, 공급 조건, 내부 메모는 이 파일에 포함하지 않습니다.
 * price는 기존 기준 판매가(VAT 별도)이며, 화면에서는 VAT 10%를 반영해 표시합니다.
 */
window.QUOTE_PRODUCTS = [
  { id: 'ac-pc43', cat: '스피커', brand: 'Audiocenter', name: 'PC43 (조)', price: 2430000, isPrimaryProduct: true },
  { id: 'ac-l83-l83s', cat: '스피커', brand: 'Audiocenter', name: 'L83+L83S (조)', price: 5760000, isPrimaryProduct: true },
  { id: 'ac-kla12a', cat: '스피커', brand: 'Audiocenter', name: 'K-LA12A', price: 3800000, isPrimaryProduct: true },
  { id: 'ac-ds12', cat: '스피커', brand: 'Audiocenter', name: 'DS12', price: 1100000, isPrimaryProduct: true, passive: true },
  { id: 'ac-ds10', cat: '스피커', brand: 'Audiocenter', name: 'DS10', price: 890000, isPrimaryProduct: true, passive: true },
  { id: 'ac-kla218-dsp', cat: '서브우퍼', brand: 'Audiocenter', name: 'K-LA218-DSP', price: 6600000, isPrimaryProduct: true },
  { id: 'ac-t4800', cat: '파워앰프', brand: 'Audiocenter', name: 'T4800', price: 1020000, isPrimaryProduct: true },
  { id: 'ac-wm3210a', cat: '모니터스피커', brand: 'Audiocenter', name: 'WM3210A Active-DSP', price: 1100000, isPrimaryProduct: true },
  { id: 'behringer-x32-compact', cat: '디지털 믹서', brand: 'Behringer', name: 'X32 Compact', price: 3200000, isPrimaryProduct: true },
  { id: 'behringer-x32', cat: '디지털 믹서', brand: 'Behringer', name: 'X32', price: 3900000, isPrimaryProduct: true },
  { id: 'allen-heath-sq5', cat: '디지털 믹서', brand: 'Allen & Heath', name: 'SQ-5', price: 4900000, isPrimaryProduct: true },
  { id: 'allen-heath-sq7', cat: '디지털 믹서', brand: 'Allen & Heath', name: 'SQ-7', price: 6800000, isPrimaryProduct: true },
  { id: 'midas-m32-live', cat: '디지털 믹서', brand: 'Midas', name: 'M32-Live', price: 6500000, isPrimaryProduct: true },
  { id: 'yamaha-dm7', cat: '디지털 믹서', brand: 'Yamaha', name: 'DM7', price: 24000000, isPrimaryProduct: true },
  { id: 'behringer-s32', cat: '디지털 I/O', brand: 'Behringer', name: 'S32', price: 1800000, isPrimaryProduct: true },
  { id: 'allen-heath-dx168', cat: '디지털 I/O', brand: 'Allen & Heath', name: 'DX168', price: 3200000, isPrimaryProduct: true },
  { id: 'midas-dl32', cat: '디지털 I/O', brand: 'Midas', name: 'DL32', price: 2200000, isPrimaryProduct: true },
  { id: 'yamaha-rio1608', cat: '디지털 I/O', brand: 'Yamaha', name: 'Rio1608-D3', price: 6500000, isPrimaryProduct: true },
  { id: 'behringer-p16hq', cat: '퍼스널믹서', brand: 'Behringer', name: 'P16-HQ', price: 450000, isPrimaryProduct: true },
  { id: 'sennheiser-ewd835', cat: '무선마이크', brand: 'Sennheiser', name: 'EW-D / 835-S SET', price: 1250000, isPrimaryProduct: true }
];
