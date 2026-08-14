const VAT_RATE = 1.1;
const form = document.getElementById('estimateForm');
const channelPreview = document.getElementById('channelPreview');
const formError = document.getElementById('formError');
const resultSection = document.getElementById('result');
const quoteCards = document.getElementById('quoteCards');
const budgetSelect = document.getElementById('budget');
let catalog = Array.isArray(window.QUOTE_PRODUCTS) ? window.QUOTE_PRODUCTS : [];

const currency = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 });

function formatWon(amount) {
  return currency.format(Math.round(amount));
}

function populateBudgets() {
  for (let million = 1; million < 100; million += 1) {
    const option = document.createElement('option');
    option.value = String(million * 1000000);
    option.textContent = `${million.toLocaleString('ko-KR')}00만 원 이하`;
    budgetSelect.appendChild(option);
  }
}

function getChannelCount() {
  let channels = Number(document.getElementById('vocalCount').value || 0);
  document.querySelectorAll('.instrument-item input[type="checkbox"]').forEach((checkbox) => {
    if (!checkbox.checked) return;
    const qtyInput = document.getElementById(checkbox.dataset.qty);
    channels += Number(checkbox.dataset.channels) * Number(qtyInput.value || 0);
  });
  return Math.max(0, channels);
}

function updateChannelPreview() {
  channelPreview.textContent = `${getChannelCount()} ch`;
}

function normalize(text) {
  return String(text || '').toLowerCase().replace(/\s+/g, '');
}

function productByName(fragment) {
  const key = normalize(fragment);
  return catalog.find((product) => normalize(product.name).includes(key));
}

function productByCategoryAndBrand(category, brand) {
  return catalog.find((product) => product.cat === category && product.brand === brand);
}

function mixerFor(channels, preference) {
  const preferred = preference === 'auto' ? null : catalog.filter((product) => product.cat === '디지털 믹서' && product.brand === preference);
  if (preferred && preferred.length) {
    if (channels > 32) return preferred[0];
    return preferred[preferred.length - 1];
  }
  if (channels <= 16) return productByName('X32 Compact') || productByName('Wing Compact');
  if (channels <= 32) return productByName('SQ-5') || productByName('X32');
  return productByName('SQ-7') || productByName('M32-Live') || productByName('Wing');
}

function stageboxFor(mixer, channels) {
  if (!mixer || channels <= 16) return null;
  const brandProducts = catalog.filter((product) => product.cat === '디지털 I/O' && product.brand === mixer.brand);
  if (brandProducts.length) {
    if (channels > 32) return brandProducts[0];
    return brandProducts[brandProducts.length - 1];
  }
  return productByName('S32') || productByName('DX168') || null;
}

function speakerProfile(space) {
  const area = space.width * space.length;
  const longSide = Math.max(space.width, space.length);
  let level = 0;
  if (area >= 180 || space.audience >= 120 || longSide >= 18) level = 1;
  if (area >= 420 || space.audience >= 350 || longSide >= 32) level = 2;
  return level;
}

function speakerProducts(level, usage, isExpansion) {
  const normalizedLevel = Math.max(0, Math.min(level, 2));
  const profiles = [
    [{ product: productByName('PC43'), quantity: 1 }],
    [{ product: productByName('L83+L83S'), quantity: 1 }],
    [{ product: productByName('K-LA12A'), quantity: isExpansion ? 4 : 2 }]
  ];
  const items = (profiles[normalizedLevel] || []).filter((item) => item.product);
  if ((usage === 'worship' || usage === 'event') && normalizedLevel >= 1) {
    const subwoofer = productByName('K-LA218-DSP') || productByName('Pro S5118A');
    if (subwoofer) items.push({ product: subwoofer, quantity: isExpansion && normalizedLevel === 2 ? 2 : 1 });
  }
  return items;
}

function withVat(product) {
  return Math.round(Number(product.price || 0) * VAT_RATE);
}

function addItem(items, product, quantity, note = '') {
  if (!product || !quantity) return;
  const unitPrice = withVat(product);
  const existing = items.find((item) => item.product.id === product.id && item.note === note);
  if (existing) {
    existing.quantity += quantity;
    existing.subtotal = existing.quantity * existing.unitPrice;
    return;
  }
  items.push({ product, quantity, note, unitPrice, subtotal: unitPrice * quantity });
}

function buildConfiguration(tier, space, channels, options) {
  const baseLevel = speakerProfile(space);
  const offset = tier === 'economy' ? -1 : tier === 'expansion' ? 1 : 0;
  const level = Math.max(0, Math.min(2, baseLevel + offset));
  const items = [];

  speakerProducts(level, options.usage, tier === 'expansion').forEach(({ product, quantity }) => addItem(items, product, quantity, '메인 시스템'));

  const mixer = mixerFor(channels, options.mixerPreference);
  addItem(items, mixer, 1, `${channels}ch 운영 기준`);

  const stagebox = stageboxFor(mixer, channels);
  addItem(items, stagebox, 1, '무대 입출력 확장');

  if (options.monitorCount > 0) {
    const monitor = productByName('WM3210A') || productByName('WM3210P');
    addItem(items, monitor, options.monitorCount, '무대 모니터');
  }

  if (options.personalMixerCount > 0) {
    const personalMixer = productByName('P16-HQ') || productByName('P16-D');
    addItem(items, personalMixer, options.personalMixerCount, '개인 모니터링');
  }

  if (options.vocalCount > 0) {
    const wirelessMic = productByName('EW-D / 835-S SET') || productByName('XSW 2-835 SET');
    addItem(items, wirelessMic, options.vocalCount, '보컬·무선마이크');
  }

  const total = items.reduce((sum, item) => sum + item.subtotal, 0);
  const labels = {
    economy: { label: '절약안', description: '현재 사용 목적에 필요한 핵심 구성을 우선한 안입니다.' },
    standard: { label: '표준안', description: '입력하신 공간과 운영 규모를 기준으로 한 권장 구성입니다.' },
    expansion: { label: '확장안', description: '더 넓은 커버리지와 향후 운영 확장을 고려한 안입니다.' }
  };
  return { tier, ...labels[tier], items, total, level, mixer };
}

function renderItems(items) {
  if (!items.length) return '<li><strong>추천 가능 품목 확인 필요</strong><small>카탈로그 검토 후 상세 상담으로 안내합니다.</small></li>';
  return items.map((item) => `
    <li>
      <span><strong>${escapeHtml(item.product.brand)} ${escapeHtml(item.product.name)}</strong><small>${escapeHtml(item.note)} · ${item.quantity}개 × ${formatWon(item.unitPrice)}</small></span>
      <b>${formatWon(item.subtotal)}</b>
    </li>`).join('');
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

function renderQuotes(configurations, budget) {
  quoteCards.innerHTML = configurations.map((configuration) => {
    const isOverBudget = configuration.total > budget;
    const status = isOverBudget
      ? `선택 예산보다 ${formatWon(configuration.total - budget)} 높습니다. 현장 상담으로 조정할 수 있습니다.`
      : `선택 예산 내 구성입니다. 남은 예산 ${formatWon(budget - configuration.total)}`;
    return `
      <article class="quote-card ${configuration.tier === 'standard' ? 'recommended' : ''}">
        ${configuration.tier === 'standard' ? '<span class="quote-badge">권장</span>' : ''}
        <p class="tier">${configuration.tier === 'economy' ? 'ESSENTIAL' : configuration.tier === 'standard' ? 'RECOMMENDED' : 'EXPANSION'}</p>
        <h3>${configuration.label}</h3>
        <p class="tier-description">${configuration.description}</p>
        <div class="quote-total"><span>예상 장비 판매가 · 부가세 포함</span><strong>${formatWon(configuration.total)}</strong></div>
        <p class="quote-status ${isOverBudget ? 'over' : ''}">${status}</p>
        <ul class="item-list">${renderItems(configuration.items)}</ul>
        <p class="quote-footnote">설치·배선·운송·튜닝·시공 비용은 현장 실사 후 상세 견적으로 별도 안내합니다.</p>
      </article>`;
  }).join('');
}

function validateForm() {
  const required = [
    ['spaceType', '공간 유형을 선택해 주세요.'],
    ['width', '공간의 가로 길이를 입력해 주세요.'],
    ['length', '공간의 세로 길이를 입력해 주세요.'],
    ['height', '공간의 높이를 입력해 주세요.'],
    ['budget', '장비 예산 상한을 선택해 주세요.']
  ];
  for (const [id, message] of required) {
    const input = document.getElementById(id);
    if (!input.value || Number(input.value) < 0) return message;
  }
  if (!document.getElementById('acknowledge').checked) return '온라인 예상 견적 안내를 확인해 주세요.';
  return '';
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const validationMessage = validateForm();
  formError.textContent = validationMessage;
  if (validationMessage) return;

  const space = {
    type: document.getElementById('spaceType').value,
    width: Number(document.getElementById('width').value),
    length: Number(document.getElementById('length').value),
    height: Number(document.getElementById('height').value),
    audience: Number(document.getElementById('audience').value || 0)
  };
  const options = {
    usage: document.getElementById('usage').value,
    vocalCount: Number(document.getElementById('vocalCount').value || 0),
    monitorCount: Number(document.getElementById('monitorCount').value || 0),
    personalMixerCount: Number(document.getElementById('personalMixerCount').value || 0),
    mixerPreference: document.getElementById('mixerPreference').value
  };
  const channels = getChannelCount();
  const budget = Number(document.getElementById('budget').value);
  const configurations = ['economy', 'standard', 'expansion'].map((tier) => buildConfiguration(tier, space, channels, options));
  const area = Math.round(space.width * space.length);
  document.getElementById('resultSummary').textContent = `${area}㎡ 공간 · 예상 ${space.audience || '미입력'}명 · ${channels}ch 운영 기준으로 구성했습니다.`;
  renderQuotes(configurations, budget);
  resultSection.hidden = false;
  resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.getElementById('printQuote').addEventListener('click', () => window.print());
document.querySelectorAll('.instrument-item input').forEach((input) => input.addEventListener('input', updateChannelPreview));
document.querySelectorAll('.instrument-item input[type="checkbox"]').forEach((input) => input.addEventListener('change', updateChannelPreview));
document.getElementById('vocalCount').addEventListener('input', updateChannelPreview);

populateBudgets();
updateChannelPreview();

if (!catalog.length) {
  formError.textContent = '추천 품목 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.';
}
