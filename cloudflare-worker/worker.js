/**
 * Cloudflare Workers용 전자도서관 CORS 프록시 (무료 플랜으로 충분)
 * 배포 후 생성된 Worker URL을 앱의 [설정 > 프록시 서버 URL]에 입력하세요.
 */
const ALLOWED_SUFFIXES = [
  '.dkyobobook.co.kr',
  '.library.kr',
  '.yes24.com',
  '.sen.go.kr',
  '.goe.go.kr'
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
      return new Response('Target host not allowed', { status: 403, headers: corsHeaders });
    }

    const upstream = await fetch(parsedTarget.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Mobile Safari/537.36'
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
  }
};
