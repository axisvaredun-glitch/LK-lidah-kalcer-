import { useEffect, useState } from 'react';
import { Check, Play, Plus, Star } from 'lucide-react';

const SLIDE_INTERVAL_MS = 7000;

export default function Hero({ movies, loading, watchlist, onSelect, onToggle }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (movies.length < 2) return undefined;
    const timer = setInterval(() => setIndex((current) => (current + 1) % movies.length), SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [movies.length, index]);

  if (loading) {
    return <div className="skeleton min-h-[88svh] w-full" aria-hidden="true" />;
  }

  const movie = movies[index];
  if (!movie) return null;
  const saved = watchlist.includes(movie.id);

  return (
    <section aria-label="Film unggulan" className="relative isolate min-h-[88svh] overflow-hidden">
      {movies.map((item, i) => (
        <img
          key={item.id}
          src={item.backdrop}
          alt=""
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className={`absolute inset-0 -z-10 h-full w-full object-cover transition-[opacity,transform] duration-[1200ms] ease-out ${
            i === index ? 'scale-110 opacity-100' : 'scale-100 opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-base via-base/60 to-base/10" />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-base/90 via-base/30 to-transparent" />

      <div className="flex min-h-[88svh] flex-col justify-end px-4 pb-24 pt-40 sm:px-8 sm:pt-32 md:pb-20 lg:px-16 lg:pb-24">
        <div key={movie.id} className="anim-fade-up max-w-2xl space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-xs font-bold text-base">
              <Star size={14} fill="currentColor" />
              {movie.rating.toFixed(1)}
            </span>
            <span className="text-muted">{movie.year}</span>
            <span className="text-muted">{movie.runtime}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span key={genre} className="rounded-full border border-line bg-base/50 px-3 py-1 text-xs font-semibold text-fg backdrop-blur">
                {genre}
              </span>
            ))}
          </div>

          <h1 className="text-4xl font-bold leading-[1.2] tracking-tight sm:text-5xl lg:text-6xl">{movie.title}</h1>
          <p className="line-clamp-3 text-base leading-relaxed text-muted sm:text-lg">{movie.synopsis}</p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={() => onSelect(movie)}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition duration-300 hover:-translate-y-0.5 hover:bg-accent-hover active:translate-y-0 active:scale-95"
            >
              <Play size={18} fill="currentColor" />
              Tonton Sekarang
            </button>
            <button
              type="button"
              onClick={() => onToggle(movie.id)}
              aria-pressed={saved}
              className={`glass inline-flex h-12 items-center gap-2 rounded-full border px-6 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 active:scale-95 ${
                saved ? 'border-neon text-neon' : 'border-line text-fg hover:border-neon/60'
              }`}
            >
              {saved ? <Check size={18} /> : <Plus size={18} />}
              {saved ? 'Ada di Daftar Tonton' : 'Tambah ke Daftar Tonton'}
            </button>
          </div>
        </div>

        <div className="mt-8 flex gap-2" role="tablist" aria-label="Pilih film unggulan">
          {movies.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Tampilkan ${item.title}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-8 bg-accent-hover' : 'w-3 bg-fg/40 hover:bg-fg/70'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
