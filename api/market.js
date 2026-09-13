export async function GET() {
  const endpoint = new URL('https://api.coingecko.com/api/v3/simple/price');
  endpoint.searchParams.set('ids', 'bitcoin,ethereum,solana');
  endpoint.searchParams.set('vs_currencies', 'usd');
  endpoint.searchParams.set('include_24hr_change', 'true');

  try {
    const response = await fetch(endpoint, { headers: { accept: 'application/json' }, cache: 'no-store' });
    const data = await response.json();
    return Response.json(data, {
      status: response.ok ? 200 : response.status,
      headers: { 'cache-control': response.ok ? 's-maxage=30, stale-while-revalidate=60' : 'no-store' },
    });
  } catch {
    return Response.json({ error: 'Market data unavailable' }, { status: 502, headers: { 'cache-control': 'no-store' } });
  }
}
