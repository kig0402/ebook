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
  // ==========================================
  // 1. 교보문고 전자도서관 (사용자 요청 + 주요 지역)
  // ==========================================
  {
    id: 'preset-kyobo-nanet',
    platform: 'kyobo',
    name: '국회도서관 (교보문고)',
    url: 'https://nanet.dkyobobook.co.kr',
    searchTemplate: 'https://nanet.dkyobobook.co.kr/elibrary-front/search/searchList.ink?schTxt={query}',
    memo: '국회전자도서관 교보문고 연동'
  },
  {
    id: 'preset-kyobo-gangjin',
    platform: 'kyobo',
    name: '강진군도서관 (교보문고)',
    url: 'https://gangjin.dkyobobook.co.kr',
    searchTemplate: 'https://gangjin.dkyobobook.co.kr/elibrary-front/search/searchList.ink?schTxt={query}',
    memo: '강진군립도서관 소장형'
  },
  {
    id: 'preset-kyobo-gangjin-sub',
    platform: 'kyobo',
    name: '강진군도서관(구독) (교보문고)',
    url: 'https://gangjinlib.dkyobobook.co.kr',
    searchTemplate: 'https://gangjinlib.dkyobobook.co.kr/elibrary-front/search/searchList.ink?schTxt={query}',
    memo: '강진군립도서관 구독형'
  },
  {
    id: 'preset-kyobo-gunpo',
    platform: 'kyobo',
    name: '군포시도서관 (교보문고)',
    url: 'https://gunpo.dkyobobook.co.kr',
    searchTemplate: 'https://gunpo.dkyobobook.co.kr/elibrary-front/search/searchList.ink?schTxt={query}',
    memo: '군포시립도서관 전자책'
  },
  {
    id: 'preset-kyobo-smc',
    platform: 'kyobo',
    name: '서울시의회 전문도서관 (교보문고)',
    url: 'https://smc.dkyobobook.co.kr',
    searchTemplate: 'https://smc.dkyobobook.co.kr/elibrary-front/search/searchList.ink?schTxt={query}',
    memo: '서울특별시의회 전문도서관'
  },
  {
    id: 'preset-kyobo-ulsan-univ',
    platform: 'kyobo',
    name: '울산대학교 (교보문고)',
    url: 'https://ulsanuniv.dkyobobook.co.kr',
    searchTemplate: 'https://ulsanuniv.dkyobobook.co.kr/elibrary-front/search/searchList.ink?schTxt={query}',
    memo: '울산대학교 중앙도서관'
  },
  {
    id: 'preset-kyobo-cheongju-sub',
    platform: 'kyobo',
    name: '청주시립도서관(구독) (교보문고)',
    url: 'https://cheongju.dkyobobook.co.kr',
    searchTemplate: 'https://cheongju.dkyobobook.co.kr/elibrary-front/search/searchList.ink?schTxt={query}',
    memo: '청주시립도서관 구독형 전자책'
  },
  {
    id: 'preset-kyobo-chilgok',
    platform: 'kyobo',
    name: '칠곡군립도서관 (교보문고)',
    url: 'https://chilgok.dkyobobook.co.kr',
    searchTemplate: 'https://chilgok.dkyobobook.co.kr/elibrary-front/search/searchList.ink?schTxt={query}',
    memo: '칠곡군립도서관 전자도서관'
  },
  {
    id: 'preset-kyobo-onbook',
    platform: 'kyobo',
    name: '온책방 (교보문고)',
    url: 'https://onbook.dkyobobook.co.kr',
    searchTemplate: 'https://onbook.dkyobobook.co.kr/elibrary-front/search/searchList.ink?schTxt={query}',
    memo: '대한민국 국민 통합 전자도서관'
  },
  {
    id: 'preset-kyobo-ulsan',
    platform: 'kyobo',
    name: '울산도서관 (교보문고)',
    url: 'https://ulsan.dkyobobook.co.kr',
    searchTemplate: 'https://ulsan.dkyobobook.co.kr/elibrary-front/search/searchList.ink?schTxt={query}',
    memo: '울산광역시 대표도서관'
  },
  {
    id: 'preset-kyobo-incheon-seogu',
    platform: 'kyobo',
    name: '인천서구구립도서관 (교보문고)',
    url: 'https://issl.dkyobobook.co.kr',
    searchTemplate: 'https://issl.dkyobobook.co.kr/elibrary-front/search/searchList.ink?schTxt={query}',
    memo: '인천광역시 서구 구립도서관'
  },
  {
    id: 'preset-kyobo-jne-sub',
    platform: 'kyobo',
    name: '전라남도교육청 전자도서관(구독) (교보문고)',
    url: 'https://jne.dkyobobook.co.kr',
    searchTemplate: 'https://jne.dkyobobook.co.kr/elibrary-front/search/searchList.ink?schTxt={query}',
    memo: '전라남도교육청 구독형 전자도서관'
  },
  {
    id: 'preset-kyobo-gangnam',
    platform: 'kyobo',
    name: '강남구전자도서관 (교보문고)',
    url: 'https://gangnam.dkyobobook.co.kr',
    searchTemplate: 'https://gangnam.dkyobobook.co.kr/elibrary-front/search/searchList.ink?schTxt={query}',
    memo: '강남구립 통합전자도서관'
  },
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

  // ==========================================
  // 2. 예스24 전자도서관 (사용자 요청 + 주요 지역)
  // ==========================================
  {
    id: 'preset-yes24-gyeongsan',
    platform: 'yes24',
    name: '경산시립도서관 (예스24)',
    url: 'https://lib.gbgs.go.kr',
    searchTemplate: 'https://lib.gbgs.go.kr',
    memo: '경산시립도서관 예스24 전자책'
  },
  {
    id: 'preset-yes24-ulju',
    platform: 'yes24',
    name: '울주통합도서관 (예스24)',
    url: 'https://uljuebook.ulju.ulsan.kr',
    searchTemplate: 'https://uljuebook.ulju.ulsan.kr',
    memo: '울주군 통합도서관 전자책'
  },
  {
    id: 'preset-yes24-gangnam',
    platform: 'yes24',
    name: '강남구전자도서관 (예스24)',
    url: 'https://ebook.gangnam.go.kr',
    searchTemplate: 'https://ebook.gangnam.go.kr',
    memo: '강남구 전자도서관 예스24 연동'
  },
  {
    id: 'preset-yes24-yeongcheon',
    platform: 'yes24',
    name: '영천시립도서관 (예스24)',
    url: 'http://www.yclib.go.kr:8080/default.asp',
    searchTemplate: 'http://www.yclib.go.kr:8080/default.asp',
    memo: '영천시립도서관 전자책도서관'
  },
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

  // ==========================================
  // 3. 부커스 (Bookers) 구독형 전자도서관
  // ==========================================
  {
    id: 'preset-bookers-court',
    platform: 'bookers',
    name: '법원도서관 (부커스)',
    url: 'https://library.scourt.go.kr',
    searchTemplate: 'https://www.bookers.life',
    memo: '법원도서관 부커스 구독형 전자책'
  },
  {
    id: 'preset-bookers-ulsan-junggu',
    platform: 'bookers',
    name: '울산중구통합도서관 (부커스)',
    url: 'https://lib.junggu.ulsan.kr',
    searchTemplate: 'https://www.bookers.life',
    memo: '울산종갓집도서관 등 중구 통합도서관'
  },
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
  }
];
