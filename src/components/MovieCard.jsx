import { useState } from 'react';
import { Bookmark, Film, Star } from 'lucide-react';

export function MovieCardSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="skeleton aspect-[2/3] w-full rounded-xl" />
      <div className="skeleton mt-3 h-4 w-3/4 rounded" />
      <div className="skeleton mt-2 h-3 w-1/2 rounded" />
    </div>
  );
}

export default function MovieCard({ movie, saved, onSelect }) {
  const [status, setStatus] = useState('loading');

  return (
    <button
      type="button"
      onClick={() => onSelect(movie)}
      className="group block w-full text-left outline-none"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-elevated shadow-lg shadow-black/40 ring-1 ring-line transition duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_18px_40px_-12px_rgba(190,18,60,0.55)] group-focus-visible:ring-2 group-focus-visible:ring-neon">
        {status === 'loading' && <div className="skeleton absolute inset-0" />}

        {status === 'error' ? (
          <div className="absolute inset-0 grid place-items-center text-muted">
            <Film size={32} />
          </div>
        ) : (
          <img
            src={movie.poster}
            alt={`Poster ${movie.title}`}
            loading="lazy"
            decoding="async"
            onLoad={() => setStatus('loaded')}
            onError={() => setStatus('error')}
            className={`h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110 ${
              status === 'loaded' ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        <div className="absolute inset-0 bg-linear-to-t from-base/90 via-base/0 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

        <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-base/80 px-2 py-1 text-xs font-bold text-gold backdrop-blur">
          <Star size={12} fill="currentColor" />
          {movie.rating.toFixed(1)}
        </span>

        {saved && (
          <span className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-accent text-white">
            <Bookmark size={14} fill="currentColor" />
          </span>
        )}
      </div>

      <h3 className="mt-3 truncate text-sm font-semibold text-fg transition-colors group-hover:text-neon sm:text-base">
        {movie.title}
      </h3>
      <p className="truncate text-xs text-muted">
        {movie.year} • {movie.genres[0]}
      </p>
    </button>
  );
}
