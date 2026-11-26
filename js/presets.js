export const PLATFORM_META = {
  kyobo: {
    id: 'kyobo',
    label: '교보문고',
    badgeClass: 'badge-kyobo',
    defaultSearchPath: '/elibrary-front/search/searchList.ink?schTxt={query}',
    note: '도서관별 서브도메인(예: https://도서관.dkyobobook.co.kr)에서 비로그인 검색 가능'
  },
  bookers: {
    id: 'bookers',
    label: '부커스',
    badgeClass: 'badge-bookers',
    defaultSearchPath: '/search?keyword={query}',
    note: 'B2B 구독형 플랫폼으로 기관 로그인 후 검색 및 열람 가능'
  },
  yes24: {
    id: 'yes24',
    label: '예스24',
    badgeClass: 'badge-yes24',
    defaultSearchPath: '/elibrary/SearchResult.aspx?keyword={query}',
    note: '제휴 지역도서관 전자책 페이지에서 검색 및 대출 가능'
  }
};

export const LIBRARY_PRESETS = [
  // 교보문고 전자도서관 주요 지역도서관
  {
    id: 'preset-kyobo-seoul',
    platform: 'kyobo',
    name: '서울도서관 (교보문고)',
    url: 'https://seoul.dkyobobook.co.kr',
    searchTemplate: 'https://seoul.dkyobobook.co.kr/elibrary-front/search/searchList.ink?schTxt={query}',
    memo: '서울시민 무료 이용'
  },
  {
    id: 'preset-kyobo-gyeonggi',
    platform: 'kyobo',
    name: '경기도사이버도서관 (교보문고)',
    url: 'https://ebook.library.kr',
    searchTemplate: 'https://ebook.library.kr/elibrary-front/search/searchList.ink?schTxt={query}',
    memo: '경기도민 무료 이용'
  },
  {
    id: 'preset-kyobo-gangnam',
    platform: 'kyobo',
    name: '강남구립도서관 (교보문고)',
    url: 'https://gangnam.dkyobobook.co.kr',
    searchTemplate: 'https://gangnam.dkyobobook.co.kr/elibrary-front/search/searchList.ink?schTxt={query}',
    memo: '강남구립 통합회원'
  },
  {
    id: 'preset-kyobo-busan',
    platform: 'kyobo',
    name: '부산시 전자도서관 (교보문고)',
    url: 'https://busan.dkyobobook.co.kr',
    searchTemplate: 'https://busan.dkyobobook.co.kr/elibrary-front/search/searchList.ink?schTxt={query}',
    memo: '부산시 공공도서관 회원'
  },
  {
    id: 'preset-kyobo-incheon',
    platform: 'kyobo',
    name: '인천시 전자도서관 (교보문고)',
    url: 'https://incheon.dkyobobook.co.kr',
    searchTemplate: 'https://incheon.dkyobobook.co.kr/elibrary-front/search/searchList.ink?schTxt={query}',
    memo: '인천시 공공도서관 회원'
  },
  {
    id: 'preset-kyobo-daegu',
    platform: 'kyobo',
    name: '대구시 전자도서관 (교보문고)',
    url: 'https://daegu.dkyobobook.co.kr',
    searchTemplate: 'https://daegu.dkyobobook.co.kr/elibrary-front/search/searchList.ink?schTxt={query}',
    memo: '대구시 통합도서관 회원'
  },

  // 부커스 (Bookers) 구독형 전자도서관
  {
    id: 'preset-bookers-common',
    platform: 'bookers',
    name: '부커스 공식 웹/앱 (소속 도서관 선택)',
    url: 'https://www.bookers.life',
    searchTemplate: 'https://www.bookers.life',
    memo: '구독형 플랫폼 · 기관 로그인 필요'
  },
  {
    id: 'preset-bookers-chungnam',
    platform: 'bookers',
    name: '충남도서관 (부커스 구독형)',
    url: 'https://library.chungnam.go.kr',
    searchTemplate: 'https://www.bookers.life',
    memo: '충남도서관 로그인 후 부커스 연계'
  },

  // 예스24 전자도서관
  {
    id: 'preset-yes24-seoul-edu',
    platform: 'yes24',
    name: '서울특별시교육청 전자도서관 (예스24)',
    url: 'https://e-lib.sen.go.kr',
    searchTemplate: 'https://e-lib.sen.go.kr/search/simple/search.php?keyword={query}',
    memo: '서울시교육청 도서관 회원'
  },
  {
    id: 'preset-yes24-gyeonggi-edu',
    platform: 'yes24',
    name: '경기도교육청 통합전자도서관 (예스24)',
    url: 'https://lib.goe.go.kr',
    searchTemplate: 'https://lib.goe.go.kr',
    memo: '경기도교육청 도서관 회원'
  },
  {
    id: 'preset-yes24-sample',
    platform: 'yes24',
    name: '예스24 전자도서관 (직접 주소 입력 권장)',
    url: 'https://ebook.yes24.com',
    searchTemplate: 'https://www.yes24.com/Product/Search?domain=EBOOK&query={query}',
    memo: '이용 중인 지역도서관 URL로 수정해 사용하세요'
  }
];
