import { useEffect, useMemo, useState } from 'react';
import { Activity, ArrowUpRight, CircleAlert } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

type Coin = 'bitcoin' | 'ethereum' | 'solana';

type Point = { time: number; price: number };

type MarketResponse = { prices?: [number, number][] };

const coins: Array<{ id: Coin; label: string; symbol: string }> = [
  { id: 'bitcoin', label: 'Bitcoin', symbol: 'BTC' },
  { id: 'ethereum', label: 'Ethereum', symbol: 'ETH' },
  { id: 'solana', label: 'Solana', symbol: 'SOL' },
];

const milestones = [
  { year: '2019', title: 'Market begins', text: 'Trading & investing became part of the journey.' },
  { year: '2021', title: 'Economics', text: 'Ilmu Ekonomi at Universitas Islam Indonesia.' },
  { year: '2026', title: 'Build', text: 'Turning ideas into web tools and digital experiments.' },
  { year: 'Future', title: 'Keep building', text: 'Ideas that are not finished yet—but are worth building.' },
];

function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: value >= 1000 ? 0 : 2 }).format(value);
}

export default function MarketJourney() {
  const [coin, setCoin] = useState<Coin>('bitcoin');
  const [points, setPoints] = useState<Point[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    fetch(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=30&interval=daily`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Market data unavailable');
        return response.json() as Promise<MarketResponse>;
      })
      .then((data) => setPoints((data.prices ?? []).map(([time, price]) => ({ time, price })).filter((point) => Number.isFinite(point.price))))
      .catch((reason: unknown) => {
        if ((reason as { name?: string })?.name !== 'AbortError') setError(true);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [coin]);

  const chart = useMemo(() => {
    if (points.length < 2) return null;
    const width = 720;
    const height = 250;
    const pad = 20;
    const values = points.map((point) => point.price);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = Math.max(max - min, 1);
    const coords = points.map((point, index) => {
      const x = pad + (index / (points.length - 1)) * (width - pad * 2);
      const y = height - pad - ((point.price - min) / range) * (height - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    const last = points[points.length - 1];
    const first = points[0];
    const change = ((last.price - first.price) / first.price) * 100;
    return { width, height, path: `M ${coords.join(' L ')}`, last, change, min, max };
  }, [points]);

  const selected = coins.find((item) => item.id === coin)!;

  return (
    <section id="market-journey" className="section-shell" aria-labelledby="market-journey-title">
      <div className="section-grid">
        <div>
          <p className="eyebrow">03 / Market Journey</p>
          <h2 id="market-journey-title" className="display-title">Markets move.<br />So do we.</h2>
          <div className="prose-jrhs mt-7">
            <p>Perjalanan memahami trading dan investing dimulai pada 9 Maret 2019. Di sini, market data menjadi konteks visual—bukan klaim performa investasi pribadi.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2" aria-label="Pilih aset">
            {coins.map((item) => (
              <button key={item.id} type="button" onClick={() => setCoin(item.id)} aria-pressed={coin === item.id} className={`min-h-11 rounded-full border px-4 text-xs font-semibold transition ${coin === item.id ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-ink)]' : 'border-[var(--color-line)] bg-[var(--color-paper)] text-[var(--color-muted)] hover:text-[var(--color-ink)]'}`}>
                {item.symbol}
              </button>
            ))}
          </div>
        </div>

        <div className="ios-tile overflow-hidden p-4 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Live market context</p>
              <h3 className="mt-2 text-xl font-semibold text-[var(--color-ink)]">{selected.label} <span className="text-[var(--color-muted)]">/ USD</span></h3>
            </div>
            <div className="text-right">
              {chart ? <><p className="text-xl font-semibold text-[var(--color-ink)]">${formatPrice(chart.last.price)}</p><p className={`text-xs font-semibold ${chart.change >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>{chart.change >= 0 ? '+' : ''}{chart.change.toFixed(2)}% / 30d</p></> : <p className="text-xs text-[var(--color-muted)]">{loading ? 'Loading…' : 'Unavailable'}</p>}
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-canvas)] p-2" aria-live="polite">
            {chart ? (
              <svg viewBox={`0 0 ${chart.width} ${chart.height}`} className="h-auto w-full" role="img" aria-label={`${selected.label} 30 day price trend`}>
                <line x1="20" x2="700" y1="220" y2="220" stroke="currentColor" opacity=".08" />
                <motion.path d={chart.path} fill="none" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" pathLength="1" initial={reduceMotion ? false : { pathLength: 0 }} whileInView={reduceMotion ? undefined : { pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.25, ease: 'easeOut' }} />
                <circle cx="700" cy={220 - ((chart.last.price - chart.min) / Math.max(chart.max - chart.min, 1)) * 200} r="5" fill="var(--color-accent)" />
              </svg>
            ) : error ? (
              <div className="flex min-h-52 items-center justify-center gap-2 px-4 text-center text-sm text-[var(--color-muted)]"><CircleAlert size={17} aria-hidden="true" />Market data sedang tidak tersedia. UI tetap berjalan tanpa data palsu.</div>
            ) : <div className="flex min-h-52 items-center justify-center text-sm text-[var(--color-muted)]"><Activity className="mr-2 animate-pulse" size={17} />Mengambil market data…</div>}
          </div>

          <div className="mt-4 flex items-center justify-between gap-4 text-[11px] text-[var(--color-muted)]">
            <span>30-day historical price</span>
            <a href="https://www.coingecko.com/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-1 hover:text-[var(--color-ink)]">CoinGecko ↗ <ArrowUpRight size={12} aria-hidden="true" /></a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-7xl px-0 md:mt-20">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((item, index) => (
            <motion.article key={item.year} className="ios-tile p-5" initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: .35, delay: index * .06 }}>
              <p className="text-xs font-semibold tracking-[.14em] text-[var(--color-accent)]">{item.year}</p>
              <h3 className="mt-4 text-lg font-semibold text-[var(--color-ink)]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-text)]">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
