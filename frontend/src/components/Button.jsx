import clsx from 'clsx';

const variants = {
  primary: 'bg-ink text-white hover:bg-slate-800 dark:bg-mint dark:text-slate-950 dark:hover:bg-emerald-300',
  secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700',
  danger: 'bg-coral text-white hover:bg-red-500',
  ghost: 'text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
};

export const Button = ({ children, className, variant = 'primary', type = 'button', ...props }) => (
  <button
    type={type}
    className={clsx(
      'inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60',
      variants[variant],
      className
    )}
    {...props}
  >
    {children}
  </button>
);
