import MovieCard, { MovieCardSkeleton } from './MovieCard';

const SKELETON_COUNT = 12;

export default function MovieGrid({ movies, loading, watchlist, onSelect, empty }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 px-4 sm:px-8 md:grid-cols-4 lg:px-16 xl:grid-cols-6">
        {Array.from({ length: SKELETON_COUNT }, (_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return <div className="px-4 sm:px-8 lg:px-16">{empty}</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 px-4 sm:px-8 md:grid-cols-4 lg:px-16 xl:grid-cols-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} saved={watchlist.includes(movie.id)} onSelect={onSelect} />
      ))}
    </div>
  );
}
