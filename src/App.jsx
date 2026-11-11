import { useEffect, useMemo, useState } from 'react';
import { GENRES, movies } from './data/movies';
import TopBar from './components/TopBar';
import BottomNav from './components/BottomNav';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import MovieGrid from './components/MovieGrid';
import MovieModal from './components/MovieModal';

const LOADING_DELAY_MS = 900;
const GENRE_OPTIONS = ['Semua', ...GENRES];

const PAGE_META = {
  trending: { title: 'Trending Now', subtitle: 'Film dan serial yang paling ramai ditonton minggu ini.' },
  genres: { title: 'Jelajahi Genre', subtitle: 'Pilih genre favoritmu dan temukan tontonan berikutnya.' },
  movies: { title: 'Film', subtitle: 'Koleksi film pilihan dari berbagai genre.' },
  series: { title: 'TV Series', subtitle: 'Serial pilihan yang layak ditonton sampai tuntas.' },
  watchlist: { title: 'Daftar Tonton', subtitle: 'Film dan serial yang sudah kamu simpan.' },
};

const featuredMovies = movies.filter((movie) => movie.featured);
const trendingMovies = movies.filter((movie) => movie.trending);
const popularMovies = movies.filter((movie) => movie.popular);
const topRatedMovies = [...movies].sort((a, b) => b.rating - a.rating);

function PageHeader({ title, subtitle }) {
  return (
    <header className="space-y-2 px-4 sm:px-8 lg:px-16">
      <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
      {subtitle && <p className="text-muted">{subtitle}</p>}
    </header>
  );
}

export default function App() {
  const [view, setView] = useState('home');
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('Semua');
  const [watchlist, setWatchlist] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), LOADING_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const searchTerm = query.trim();
  const isSearching = searchTerm.length > 0;
  const lowerTerm = searchTerm.toLowerCase();

  const searchResults = useMemo(
    () =>
      movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(lowerTerm) ||
          movie.genres.some((item) => item.toLowerCase().includes(lowerTerm)),
      ),
    [lowerTerm],
  );

  const navigate = (next) => {
    setQuery('');
    setView(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleWatchlist = (id) => {
    setWatchlist((list) => (list.includes(id) ? list.filter((item) => item !== id) : [...list, id]));
  };

  const isHome = !isSearching && view === 'home';

  const renderPage = () => {
    if (isSearching) {
      return {
        title: 'Hasil pencarian',
        subtitle: `Menampilkan hasil untuk "${searchTerm}".`,
        movies: searchResults,
        empty: <p className="py-16 text-center text-muted">Tidak ada film atau genre yang cocok dengan "{searchTerm}".</p>,
      };
    }

    switch (view) {
      case 'trending':
        return { ...PAGE_META.trending, movies: trendingMovies };
      case 'genres': {
        const genreMovies = genre === 'Semua' ? movies : movies.filter((movie) => movie.genres.includes(genre));
        return {
          ...PAGE_META.genres,
          movies: genreMovies,
          extra: (
            <div className="flex gap-2 overflow-x-auto px-4 pb-1 sm:px-8 lg:px-16 no-scrollbar">
              {GENRE_OPTIONS.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={genre === item}
                  onClick={() => setGenre(item)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition duration-200 active:scale-95 ${
                    genre === item
                      ? 'border-neon bg-neon text-base'
                      : 'border-line bg-elevated/60 text-fg hover:border-neon/60'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          ),
          empty: <p className="py-16 text-center text-muted">Belum ada film untuk genre ini.</p>,
        };
      }
      case 'movies':
        return { ...PAGE_META.movies, movies: movies.filter((movie) => movie.type === 'movie') };
      case 'series':
        return { ...PAGE_META.series, movies: movies.filter((movie) => movie.type === 'series') };
      case 'watchlist':
        return {
          ...PAGE_META.watchlist,
          movies: movies.filter((movie) => watchlist.includes(movie.id)),
          empty: (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <p className="text-muted">Daftar tontonan kosong.</p>
              <button
                type="button"
                onClick={() => navigate('home')}
                className="inline-flex h-11 items-center rounded-full bg-accent px-6 text-sm font-semibold text-white transition duration-300 hover:bg-accent-hover active:scale-95"
              >
                Jelajahi film
              </button>
            </div>
          ),
        };
      default:
        return null;
    }
  };

  const page = isHome ? null : renderPage();

  return (
    <div className="min-h-svh bg-base text-fg">
      <TopBar
        view={isSearching ? null : view}
        onNavigate={navigate}
        query={query}
        onQueryChange={setQuery}
        watchlistCount={watchlist.length}
      />

      <main key={isHome ? 'home' : `${view}-${isSearching}`} className="anim-fade-up">
        {isHome ? (
          <>
            <Hero
              movies={featuredMovies}
              loading={loading}
              watchlist={watchlist}
              onSelect={setSelectedMovie}
              onToggle={toggleWatchlist}
            />
            <div className="space-y-12 py-12 lg:py-16">
              <MovieRow
                title="Trending Now"
                movies={trendingMovies}
                loading={loading}
                watchlist={watchlist}
                onSelect={setSelectedMovie}
              />
              <MovieRow
                title="Popular"
                movies={popularMovies}
                loading={loading}
                watchlist={watchlist}
                onSelect={setSelectedMovie}
              />
              <MovieRow
                title="Top Rated"
                movies={topRatedMovies}
                loading={loading}
                watchlist={watchlist}
                onSelect={setSelectedMovie}
              />
            </div>
          </>
        ) : (
          <div className="space-y-8 pb-16 pt-36 sm:pt-28">
            <PageHeader title={page.title} subtitle={page.subtitle} />
            {page.extra}
            <MovieGrid
              movies={page.movies}
              loading={loading}
              watchlist={watchlist}
              onSelect={setSelectedMovie}
              empty={page.empty}
            />
          </div>
        )}
      </main>

      <BottomNav view={isSearching ? null : view} onNavigate={navigate} />

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          saved={watchlist.includes(selectedMovie.id)}
          onToggle={toggleWatchlist}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
