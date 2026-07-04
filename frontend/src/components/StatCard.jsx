export const StatCard = ({ title, value, helper, icon: Icon, tone = 'bg-white' }) => (
  <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs font-black uppercase text-slate-500 dark:text-slate-400">{title}</p>
        <p className="mt-2 text-2xl font-black text-slate-950 dark:text-white">{value}</p>
        {helper && <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">{helper}</p>}
      </div>
      {Icon && (
        <div className={`grid h-11 w-11 place-items-center rounded-md ${tone}`}>
          <Icon className="h-5 w-5" />
        </div>
      )}
    </div>
  </section>
);
