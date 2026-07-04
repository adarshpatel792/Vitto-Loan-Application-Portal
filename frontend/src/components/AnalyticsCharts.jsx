import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatCurrency } from '../utils/formatters.js';

const COLORS = ['#f5b84b', '#12b886', '#f97363', '#3b82f6', '#a855f7'];

const ChartEmptyState = ({ label }) => (
  <div className="flex h-72 items-center justify-center rounded-md bg-slate-50 text-center dark:bg-slate-950">
    <div>
      <p className="text-sm font-black text-slate-700 dark:text-slate-200">No analytics yet</p>
      <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  </div>
);

export const AnalyticsCharts = ({ summary }) => {
  const pieData = [
    { name: 'Pending', value: summary.pendingCount },
    { name: 'Approved', value: summary.approvedCount },
    { name: 'Rejected', value: summary.rejectedCount }
  ];

  const barData = summary.loanAmountByLanguage || [];
  const hasStatusData = pieData.some((item) => item.value > 0);
  const hasLanguageData = barData.some((item) => item.total > 0);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div>
          <h3 className="text-lg font-black text-slate-950 dark:text-white">Status distribution</h3>
          <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">Decision pipeline across all applications</p>
        </div>
        {hasStatusData ? (
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={3}>
                  {pieData.map((_, index) => <Cell key={index} fill={COLORS[index]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="mt-4">
            <ChartEmptyState label="Submit applications to populate status analytics." />
          </div>
        )}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div>
          <h3 className="text-lg font-black text-slate-950 dark:text-white">Loan value by language</h3>
          <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">Regional demand view from backend summary data</p>
        </div>
        {hasLanguageData ? (
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="language" />
                <YAxis tickFormatter={(value) => `${Math.round(value / 1000)}k`} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                  {barData.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="mt-4">
            <ChartEmptyState label="Language-level loan value appears after the first submission." />
          </div>
        )}
      </section>
    </div>
  );
};
