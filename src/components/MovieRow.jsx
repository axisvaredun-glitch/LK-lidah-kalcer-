import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard, { MovieCardSkeleton } from './MovieCard';

const SKELETON_COUNT = 6;

export default function MovieRow({ title, movies, loading, watchlist, onSelect }) {
  const trackRef = useRef(null);

  const slide = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4 px-4 sm:px-8 lg:px-16">
        <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
        <div className="hidden gap-2 md:flex">
          <button
            type="button"
            onClick={() => slide(-1)}
            aria-label={`Geser ${title} ke kiri`}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-elevated/60 text-fg transition duration-200 hover:border-neon hover:text-neon active:scale-90"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => slide(1)}
            aria-label={`Geser ${title} ke kanan`}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-elevated/60 text-fg transition duration-200 hover:border-neon hover:text-neon active:scale-90"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory scroll-smooth gap-4 overflow-x-auto px-4 pb-4 sm:px-8 lg:px-16"
      >
        {loading
          ? Array.from({ length: SKELETON_COUNT }, (_, i) => (
              <div key={i} className="w-36 shrink-0 sm:w-44 lg:w-52">
                <MovieCardSkeleton />
              </div>
            ))
          : movies.map((movie) => (
              <div key={movie.id} className="w-36 shrink-0 snap-start sm:w-44 lg:w-52">
                <MovieCard movie={movie} saved={watchlist.includes(movie.id)} onSelect={onSelect} />
              </div>
            ))}
      </div>
    </section>
  );
}
