/**
 * Cloudflare Workers용 전자도서관 CORS 프록시 (무료 플랜: 하루 10만 건 무료)
 * 배포 후 생성된 Worker URL을 앱의 [설정 > 프록시 서버 URL]에 입력하세요.
 */
const ALLOWED_SUFFIXES = [
  '.dkyobobook.co.kr',
  '.library.kr',
  '.yes24.com',
  '.sen.go.kr',
  '.goe.go.kr',
  '.gbgs.go.kr',
  '.ulsan.kr',
  '.ulsan.go.kr',
  '.yclib.go.kr',
  '.gangnam.go.kr',
  '.scourt.go.kr',
  '.chungnam.go.kr'
];

export default {
  async fetch(request) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const reqUrl = new URL(request.url);
    const target = reqUrl.searchParams.get('url');
    if (!target) {
      return new Response('Missing url parameter', { status: 400, headers: corsHeaders });
    }

    let parsedTarget;
    try {
      parsedTarget = new URL(target);
    } catch {
      return new Response('Invalid url parameter', { status: 400, headers: corsHeaders });
    }

    const allowed = ALLOWED_SUFFIXES.some((suffix) => parsedTarget.hostname.endsWith(suffix));
    if (!allowed) {
      return new Response(`Target host not allowed: ${parsedTarget.hostname}`, {
        status: 403,
        headers: corsHeaders
      });
    }

    try {
      const upstream = await fetch(parsedTarget.toString(), {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Mobile Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'ko-KR,ko;q=0.9'
        }
      });

      const body = await upstream.text();
      return new Response(body, {
        status: upstream.status,
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/html; charset=utf-8'
        }
      });
    } catch (err) {
      return new Response(`Upstream fetch failed: ${err.message}`, {
        status: 502,
        headers: corsHeaders
      });
    }
  }
};
