import { Bookmark, Search, User } from 'lucide-react';
import { navItems } from '../data/navItems';

export default function TopBar({ view, onNavigate, query, onQueryChange, watchlistCount }) {
  return (
    <header className="glass fixed inset-x-0 top-0 z-40 border-b border-line">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3 sm:px-8 md:h-16 md:flex-nowrap md:py-0 lg:px-16">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="order-1 text-xl font-bold tracking-tight transition-opacity hover:opacity-80"
        >
          LK(lidah kadal) 21<span className="text-neon">.</span>
        </button>

        <nav aria-label="Menu utama" className="order-3 hidden md:order-2 md:flex md:items-center md:gap-6">
          {navItems.map((item) => {
            const active = view === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                aria-current={active ? 'page' : undefined}
                className={`relative py-5 text-sm font-semibold transition-colors hover:text-fg after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:rounded-full after:bg-neon after:transition-transform after:duration-300 ${
                  active ? 'text-fg after:scale-x-100' : 'text-muted after:scale-x-0'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="order-2 ml-auto flex items-center gap-2 md:order-4 md:ml-0">
          <button
            type="button"
            onClick={() => onNavigate('watchlist')}
            aria-label="Daftar tonton"
            className="relative grid h-10 w-10 place-items-center rounded-full text-fg transition duration-200 hover:bg-elevated active:scale-90"
          >
            <Bookmark size={20} />
            {watchlistCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-white">
                {watchlistCount}
              </span>
            )}
          </button>
          <button
            type="button"
            disabled
            title="Akun segera hadir"
            aria-label="Profil, segera hadir"
            className="grid h-10 w-10 cursor-not-allowed place-items-center rounded-full border border-line bg-elevated text-muted"
          >
            <User size={18} />
          </button>
        </div>

        <label className="order-4 relative block w-full md:order-3 md:ml-auto md:w-72">
          <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Cari film, serial, atau genre"
            aria-label="Cari film, serial, atau genre"
            className="h-10 w-full rounded-full border border-line bg-elevated/70 pl-10 pr-4 text-sm text-fg placeholder:text-muted outline-none transition duration-200 focus:border-neon focus:ring-2 focus:ring-neon/40"
          />
        </label>
      </div>
    </header>
  );
}
