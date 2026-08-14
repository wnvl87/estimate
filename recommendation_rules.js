window.ArthurRecommendationRules = {
  selectSpeaker({ catalog, level, usage, isExpansion, space }) {
    const find = (fragment) => {
      const key = String(fragment || '').toLowerCase().replace(/\s+/g, '');
      return catalog.find((product) => String(product.name || '').toLowerCase().replace(/\s+/g, '').includes(key));
    };
    const veryNarrow = space.width <= 8 && space.length <= 12;
    const ds12Band = space.length <= 20 && space.height <= 5;
    if (level >= 2) return { product: find('K-LA12A') || find('DS12'), reason: '공간 규모가 커서 K-LA12A급 커버리지를 우선 검토합니다.' };
    if (ds12Band && !veryNarrow) return { product: find('DS12') || find('DS10'), reason: usage === 'speech' ? '세로거리 20m·높이 5m 이내의 스피치 중심 공간이라 DS12를 우선 제안합니다.' : '세로거리 20m·높이 5m 이내 조건에서 DS12를 우선 제안합니다.' };
    if (veryNarrow) return { product: find('DS10') || find('DS12'), reason: '더 좁은 공간이므로 DS10을 우선 검토합니다.' };
    return { product: find('DS12') || find('DS10') || find('PC43'), reason: '주력 스피커 후보 중 공간 조건에 맞는 모델을 우선 제안합니다.' };
  },
};
