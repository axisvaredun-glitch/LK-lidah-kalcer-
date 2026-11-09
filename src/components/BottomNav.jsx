import { navItems } from '../data/navItems';

export default function BottomNav({ view, onNavigate }) {
  return (
    <nav
      aria-label="Navigasi bawah"
      className="glass fixed inset-x-0 bottom-0 z-40 border-t border-line pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-5">
        {navItems.map((item) => {
          const active = view === item.id;
          const Icon = item.icon;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onNavigate(item.id)}
                aria-current={active ? 'page' : undefined}
                className={`flex w-full flex-col items-center gap-1 py-2.5 text-[11px] font-semibold transition duration-200 active:scale-90 ${
                  active ? 'text-neon' : 'text-muted hover:text-fg'
                }`}
              >
                <Icon size={20} strokeWidth={active ? 2.4 : 2} />
                <span>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
