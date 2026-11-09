import { useEffect } from 'react';
import { Check, Plus, Star, X } from 'lucide-react';

export default function MovieModal({ movie, saved, onToggle, onClose }) {
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="anim-fade fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="anim-fade-up no-scrollbar relative max-h-[92svh] w-full overflow-y-auto rounded-t-3xl bg-surface ring-1 ring-line sm:max-w-2xl sm:rounded-3xl"
      >
        <div className="relative aspect-video overflow-hidden">
          <img src={movie.backdrop} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-surface to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="glass absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-fg transition duration-200 hover:text-neon active:scale-90"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5 p-6 sm:p-8">
          <div className="space-y-3">
            <h2 id="movie-modal-title" className="text-2xl font-bold leading-[1.2] sm:text-3xl">
              {movie.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
              <span className="inline-flex items-center gap-1 font-semibold text-gold">
                <Star size={14} fill="currentColor" />
                {movie.rating.toFixed(1)}
              </span>
              <span>{movie.year}</span>
              <span>{movie.runtime}</span>
              <span>{movie.type === 'series' ? 'Serial TV' : 'Film'}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span key={genre} className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-fg">
                  {genre}
                </span>
              ))}
            </div>
          </div>

          <p className="leading-relaxed text-muted">{movie.synopsis}</p>

          <button
            type="button"
            onClick={() => onToggle(movie.id)}
            aria-pressed={saved}
            className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border text-sm font-semibold transition duration-300 active:scale-95 sm:w-auto sm:px-6 ${
              saved
                ? 'border-neon bg-neon/10 text-neon'
                : 'border-line text-fg hover:border-neon/60 hover:text-neon'
            }`}
          >
            {saved ? <Check size={18} /> : <Plus size={18} />}
            {saved ? 'Hapus dari Daftar Tonton' : 'Tambah ke Daftar Tonton'}
          </button>
        </div>
      </div>
    </div>
  );
}
