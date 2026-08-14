/*
 * 관리자 카탈로그에서 내보낸 활성 조합 규칙 파일입니다.
 * 원가·도매가·내부 메모는 포함하지 않습니다. 이후 관리자 내보내기 파일로 교체할 수 있습니다.
 */
window.ARTHUR_COMBINATION_RULES = [
  {
    name: 'DS10 패시브 포인트소스 기본 구성',
    description: '더 좁은 스피치 중심 공간에서 DS10과 UTA902DSP를 우선 검토합니다.',
    priority: 15,
    conditions: {
      speakerProductId: 'legacy-cat-178661556928627',
      amplifierProductId: 'legacy-cat-178661556928639',
      sourceCategory: 'main_system',
      speakerCategory: 'point_source',
      powerType: 'passive',
      amplifierChannels: 2,
      amplifierOutputWatts: 500,
      minPerSide: 1,
      recommendedPerSide: 2,
      pairQuantity: 1,
      usages: ['speech', 'worship', 'event'],
      minRoomLength: null,
      maxRoomLength: 12,
      maxRoomHeight: 5,
      highEnd: false
    },
    recommendedProducts: ['legacy-cat-178661556928627', 'legacy-cat-178661556928639'],
    exceptionNotes: '최종 출력·채널·설치 위치는 현장 실사 후 확정'
  },
  {
    name: 'DS12 패시브 포인트소스 기본 구성',
    description: '세로거리 20m·높이 5m 이내의 스피치·예배·행사 공간에서 DS12와 UTA902DSP를 우선 검토합니다.',
    priority: 20,
    conditions: {
      speakerProductId: 'legacy-cat-178661556928628',
      amplifierProductId: 'legacy-cat-178661556928639',
      sourceCategory: 'main_system',
      speakerCategory: 'point_source',
      powerType: 'passive',
      amplifierChannels: 2,
      amplifierOutputWatts: 500,
      minPerSide: 1,
      recommendedPerSide: 2,
      pairQuantity: 1,
      usages: ['speech', 'worship', 'event'],
      minRoomLength: null,
      maxRoomLength: 20,
      maxRoomHeight: 5,
      highEnd: false
    },
    recommendedProducts: ['legacy-cat-178661556928628', 'legacy-cat-178661556928639'],
    exceptionNotes: '최종 출력·채널·설치 위치는 현장 실사 후 확정'
  },
  {
    name: 'DS12 패시브 포인트소스 고급 구성',
    description: '고급화 구성이 필요한 DS12 포인트소스 설계에서 Powersoft Quattrocanali 1204 DSP를 우선 검토합니다.',
    priority: 30,
    conditions: {
      speakerProductId: 'legacy-cat-178661556928628',
      amplifierProductId: 'POWERSOFT-56615BE24E',
      sourceCategory: 'main_system',
      speakerCategory: 'point_source',
      powerType: 'passive',
      amplifierChannels: 4,
      amplifierOutputWatts: 400,
      minPerSide: 1,
      recommendedPerSide: 2,
      pairQuantity: 1,
      usages: ['speech', 'worship', 'event'],
      minRoomLength: null,
      maxRoomLength: 20,
      maxRoomHeight: 5,
      highEnd: true
    },
    recommendedProducts: ['legacy-cat-178661556928628', 'POWERSOFT-56615BE24E'],
    exceptionNotes: '고급 구성 여부와 실제 채널·출력은 현장 실사 후 확정'
  },
  {
   name: 'DSL45 패시브 라인어레이 기본 구성',
   description: 'DSL45 라인어레이는 좌·우 최소 4개씩 총 8개로 구성하고 UTA1804DSP를 기본 구동 앰프로 검토합니다.',
   priority: 40,
   conditions: {
     speakerProductId: 'legacy-cat-178661556928610',
     amplifierProductId: 'legacy-cat-178661556928641',
     sourceCategory: 'main_system',
     speakerCategory: 'line_array',
     powerType: 'passive',
     amplifierChannels: 4,
     amplifierOutputWatts: 1400,
     minPerSide: 4,
     recommendedPerSide: 4,
     pairQuantity: 8,
     usages: ['speech', 'worship', 'event'],
     minRoomLength: null,
     maxRoomLength: null,
     maxRoomHeight: null,
      highEnd: true
   },
    recommendedProducts: ['legacy-cat-178661556928610', 'legacy-cat-178661556928641'],
    exceptionNotes: '좌·우 4개 미만으로 줄이지 않으며 최종 출력·채널·설치 위치는 현장 실사 후 확정'
  },
  {
   name: 'T45-Passive 패시브 라인어레이 기본 구성',
   description: 'T45-Passive 라인어레이는 좌·우 최소 4개씩 총 8개로 구성하고 UTA1804DSP를 기본 구동 앰프로 검토합니다.',
   priority: 41,
   conditions: {
     speakerProductId: 'legacy-cat-17866155692868',
     amplifierProductId: 'legacy-cat-178661556928641',
     sourceCategory: 'main_system',
     speakerCategory: 'line_array',
     powerType: 'passive',
     amplifierChannels: 4,
     amplifierOutputWatts: 1400,
     minPerSide: 4,
     recommendedPerSide: 4,
     pairQuantity: 8,
     usages: ['speech', 'worship', 'event'],
     minRoomLength: null,
     maxRoomLength: null,
     maxRoomHeight: null,
      highEnd: true
   },
    recommendedProducts: ['legacy-cat-17866155692868', 'legacy-cat-178661556928641'],
    exceptionNotes: '좌·우 4개 미만으로 줄이지 않으며 최종 출력·채널·설치 위치는 현장 실사 후 확정'
  }
];
