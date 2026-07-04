import { Badge } from './Badge.jsx';
import { formatCurrency, formatDate, relativeTime } from '../utils/formatters.js';

export const ApplicationTable = ({ applications, onSelect }) => (
  <>
    <div className="grid gap-3 md:hidden">
      {applications.map((item) => (
        <button
          key={item.id}
          type="button"
          className="rounded-lg border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-mint/60 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900"
          onClick={() => onSelect(item)}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-base font-black text-slate-950 dark:text-white">{item.applicantName}</p>
              <p className="mt-1 text-xs font-medium text-slate-500">{item.mobileNumber}</p>
            </div>
            <Badge>{item.status}</Badge>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-bold uppercase text-slate-500">Amount</p>
              <p className="mt-1 text-sm font-black text-slate-900 dark:text-white">{formatCurrency(item.loanAmount)}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-slate-500">Language</p>
              <div className="mt-1">
                <Badge type="language">{item.preferredLanguage}</Badge>
              </div>
            </div>
          </div>
          <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.loanPurpose}</p>
          <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
            <p className="text-xs font-medium text-slate-500">{formatDate(item.createdAt)} | {relativeTime(item.createdAt)}</p>
          </div>
        </button>
      ))}
    </div>

    <div className="hidden overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm md:block dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left dark:divide-slate-800">
          <thead className="bg-slate-50 dark:bg-slate-950">
            <tr>
              {['Applicant', 'Mobile', 'Loan Amount', 'Purpose', 'Language', 'Status', 'Created Date'].map((heading) => (
                <th key={heading} className="px-4 py-3 text-xs font-black uppercase text-slate-500 dark:text-slate-400">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {applications.map((item) => (
              <tr
                key={item.id}
                className="cursor-pointer transition hover:bg-slate-50 dark:hover:bg-slate-800/60"
                onClick={() => onSelect(item)}
              >
                <td className="px-4 py-4">
                  <p className="font-bold text-slate-900 dark:text-white">{item.applicantName}</p>
                  <p className="mt-1 max-w-[160px] truncate text-xs text-slate-500">{item.id}</p>
                </td>
                <td className="px-4 py-4 text-sm font-medium text-slate-600 dark:text-slate-300">{item.mobileNumber}</td>
                <td className="px-4 py-4 text-sm font-bold text-slate-900 dark:text-white">{formatCurrency(item.loanAmount)}</td>
                <td className="max-w-[260px] px-4 py-4 text-sm text-slate-600 dark:text-slate-300">
                  <span className="line-clamp-2">{item.loanPurpose}</span>
                </td>
                <td className="px-4 py-4"><Badge type="language">{item.preferredLanguage}</Badge></td>
                <td className="px-4 py-4"><Badge>{item.status}</Badge></td>
                <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-300">
                  <p>{formatDate(item.createdAt)}</p>
                  <p className="mt-1 text-xs text-slate-400">{relativeTime(item.createdAt)}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
);
