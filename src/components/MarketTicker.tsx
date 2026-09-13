import { Activity, ArrowUpRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type Quote = {
  id: 'bitcoin' | 'ethereum' | 'solana';
  symbol: string;
  name: string;
  price: number | null;
  change: number | null;
};

const assets: Array<{ id: Quote['id']; symbol: string; name: string }> = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
];

const emptyQuotes: Quote[] = assets.map((asset) => ({ ...asset, price: null, change: null }));

function formatPrice(value: number | null) {
  if (value === null) return '—';
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: value >= 1000 ? 0 : 2 }).format(value);
}

export default function MarketTicker() {
  const [quotes, setQuotes] = useState<Quote[]>(emptyQuotes);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    let timer: number | undefined;
    let stopped = false;

    const load = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true',
          { signal: controller.signal, headers: { accept: 'application/json' } },
        );
        if (!response.ok) throw new Error('Market data unavailable');
        const data = await response.json() as Record<string, { usd?: number; usd_24h_change?: number }>;
        const next = assets.map((asset) => ({
          ...asset,
          price: Number.isFinite(data[asset.id]?.usd) ? data[asset.id].usd! : null,
          change: Number.isFinite(data[asset.id]?.usd_24h_change) ? data[asset.id].usd_24h_change! : null,
        }));
        if (!stopped) {
          setQuotes(next);
          setLive(next.some((quote) => quote.price !== null));
        }
      } catch (reason: unknown) {
        if ((reason as { name?: string })?.name !== 'AbortError' && !stopped) setLive(false);
      } finally {
        if (!stopped) timer = window.setTimeout(load, 60_000);
      }
    };

    load();
    return () => {
      stopped = true;
      controller.abort();
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  const loop = useMemo(() => [...quotes, ...quotes], [quotes]);

  return (
    <section className="market-ticker" aria-label="Live market data">
      <div className="market-ticker__label">
        <span className="market-ticker__signal" aria-hidden="true"><Activity size={13} /></span>
        <span>LIVE MARKETS</span>
      </div>
      <div className="market-ticker__viewport">
        <div className="market-ticker__track" aria-live="polite">
          {loop.map((quote, index) => (
            <div className="market-ticker__item" key={`${quote.id}-${index}`} aria-hidden={index >= quotes.length}>
              <span className="market-ticker__symbol">{quote.symbol}</span>
              <span className="market-ticker__price">${formatPrice(quote.price)}</span>
              <span className={quote.change !== null && quote.change >= 0 ? 'market-ticker__change market-ticker__change--up' : 'market-ticker__change market-ticker__change--down'}>
                {quote.change === null ? '—' : `${quote.change >= 0 ? '+' : ''}${quote.change.toFixed(2)}%`}
              </span>
            </div>
          ))}
        </div>
      </div>
      <a className="market-ticker__source" href="https://www.coingecko.com/" target="_blank" rel="noopener noreferrer" aria-label="Market data by CoinGecko">
        <span>{live ? 'LIVE' : 'MARKET'} · COINGECKO</span><ArrowUpRight size={11} aria-hidden="true" />
      </a>
    </section>
  );
}
