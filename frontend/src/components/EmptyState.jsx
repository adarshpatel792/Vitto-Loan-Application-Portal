import { FileSearch } from 'lucide-react';

export const EmptyState = ({ title, description }) => (
  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
    <FileSearch className="h-10 w-10 text-slate-400" />
    <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
    <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">{description}</p>
  </div>
);
