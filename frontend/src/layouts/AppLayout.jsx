import { Outlet, NavLink } from 'react-router-dom';
import { ClipboardList, LayoutDashboard, Moon, ShieldCheck, Sun, WalletCards } from 'lucide-react';
import clsx from 'clsx';
import { useDarkMode } from '../context/DarkModeContext.jsx';
import { Button } from '../components/Button.jsx';

const navItems = [
  { to: '/apply', label: 'Apply', icon: ClipboardList },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }
];

const NavItem = ({ item, compact = false }) => {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        clsx(
          'flex items-center gap-3 rounded-md text-sm font-semibold transition',
          compact ? 'justify-center px-3 py-3' : 'px-3 py-2.5',
          isActive
            ? 'bg-ink text-white shadow-sm dark:bg-mint dark:text-slate-950'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
        )
      }
    >
      <Icon className="h-4 w-4" />
      {item.label}
    </NavLink>
  );
};

export const AppLayout = () => {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-200 bg-white p-4 lg:flex lg:flex-col dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="grid h-11 w-11 place-items-center rounded-md bg-ink text-white dark:bg-mint dark:text-slate-950">
            <WalletCards className="h-6 w-6" />
          </div>
          <div>
            <p className="text-lg font-black tracking-normal">Vitto</p>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Loan Operations</p>
          </div>
        </div>

        <div className="mt-8">
          <p className="px-3 text-xs font-black uppercase text-slate-400">Workspace</p>
          <nav className="mt-3 space-y-1">
            {navItems.map((item) => <NavItem key={item.to} item={item} />)}
          </nav>
        </div>

        <div className="mt-auto space-y-3">
          <div className="rounded-md border border-mint/20 bg-mint/10 p-3 dark:bg-mint/5">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-800 dark:text-emerald-300">
              <ShieldCheck className="h-4 w-4" />
              Secure workspace
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">PostgreSQL-backed application review.</p>
          </div>
          <Button variant="secondary" className="w-full justify-start" onClick={toggleDarkMode}>
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {isDark ? 'Light mode' : 'Dark mode'}
          </Button>
        </div>
      </aside>

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden dark:border-slate-800 dark:bg-slate-900/95">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-ink text-white dark:bg-mint dark:text-slate-950">
              <WalletCards className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-black tracking-normal">Vitto</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Loan Operations</p>
            </div>
          </div>
          <Button variant="secondary" className="h-10 w-10 px-0" onClick={toggleDarkMode} title="Toggle dark mode">
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      <div className="lg:pl-64">
        <main className="mx-auto max-w-[1500px] px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 border-t border-slate-200 bg-white p-2 lg:hidden dark:border-slate-800 dark:bg-slate-900">
        {navItems.map((item) => <NavItem key={item.to} item={item} compact />)}
      </nav>
    </div>
  );
};
