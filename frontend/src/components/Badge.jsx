import clsx from 'clsx';

const statusStyles = {
  pending: 'bg-gold/15 text-amber-700 dark:text-amber-300',
  approved: 'bg-mint/15 text-emerald-700 dark:text-emerald-300',
  rejected: 'bg-coral/15 text-red-700 dark:text-red-300'
};

const languageStyles = {
  Hindi: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-200',
  Tamil: 'bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-200',
  Telugu: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-200',
  Marathi: 'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-200',
  English: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200'
};

export const Badge = ({ children, type = 'status' }) => {
  const styles = type === 'language' ? languageStyles : statusStyles;
  return (
    <span className={clsx('inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize', styles[children])}>
      {children}
    </span>
  );
};
