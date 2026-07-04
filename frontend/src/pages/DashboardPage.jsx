import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Clock3, Download, IndianRupee, ListFilter, RefreshCw, RotateCcw, Search, Users, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { AnalyticsCharts } from '../components/AnalyticsCharts.jsx';
import { ApplicationDetailsModal } from '../components/ApplicationDetailsModal.jsx';
import { ApplicationTable } from '../components/ApplicationTable.jsx';
import { Button } from '../components/Button.jsx';
import { ConfirmModal } from '../components/ConfirmModal.jsx';
import { EmptyState } from '../components/EmptyState.jsx';
import { SkeletonRows } from '../components/Skeleton.jsx';
import { StatCard } from '../components/StatCard.jsx';
import { useDebounce } from '../hooks/useDebounce.js';
import { applicationApi, getApiErrorMessage } from '../services/api.js';
import { exportApplicationsToCsv, formatCurrency } from '../utils/formatters.js';

const emptySummary = {
  totalApplications: 0,
  totalLoanAmount: 0,
  pendingCount: 0,
  approvedCount: 0,
  rejectedCount: 0,
  loanAmountByLanguage: []
};

export const DashboardPage = () => {
  const [applications, setApplications] = useState([]);
  const [summary, setSummary] = useState(emptySummary);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [confirmStatus, setConfirmStatus] = useState('');
  const [updating, setUpdating] = useState(false);
  const debouncedSearch = useDebounce(search);

  const filters = useMemo(
    () => ({
      status: status || undefined,
      search: debouncedSearch || undefined,
      page: pagination.page,
      limit: pagination.limit
    }),
    [status, debouncedSearch, pagination.page, pagination.limit]
  );

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const [listResponse, summaryResponse] = await Promise.all([
        applicationApi.list(filters),
        applicationApi.summary()
      ]);
      setApplications(listResponse.data.data);
      setPagination(listResponse.data.pagination);
      setSummary(summaryResponse.data.data);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [filters]);

  const updateStatus = async () => {
    try {
      setUpdating(true);
      const response = await applicationApi.updateStatus(selected.id, confirmStatus);
      toast.success(response.data.message);
      setSelected(response.data.data);
      setConfirmStatus('');
      await loadDashboard();
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setUpdating(false);
    }
  };

  const changePage = (page) => {
    setPagination((current) => ({ ...current, page }));
  };

  const resetFilters = () => {
    setSearch('');
    setStatus('');
    setPagination((current) => ({ ...current, page: 1 }));
  };

  const resetToFirstPage = (setter) => (value) => {
    setPagination((current) => ({ ...current, page: 1 }));
    setter(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-mint" />
            <p className="text-xs font-black uppercase text-emerald-700 dark:text-emerald-300">Live operations</p>
          </div>
          <h1 className="mt-2 text-3xl font-black text-slate-950 dark:text-white">Loan applications</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Review borrower demand and manage lending decisions.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={loadDashboard}>
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button variant="secondary" onClick={() => exportApplicationsToCsv(applications)} disabled={!applications.length}>
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Total applications" value={summary.totalApplications} icon={Users} tone="bg-slate-100 text-slate-700" />
        <StatCard title="Total loan amount" value={formatCurrency(summary.totalLoanAmount)} icon={IndianRupee} tone="bg-mint/15 text-emerald-700" />
        <StatCard title="Pending" value={summary.pendingCount} helper="Awaiting decision" icon={Clock3} tone="bg-gold/15 text-amber-700" />
        <StatCard title="Approved" value={summary.approvedCount} helper="Ready for next step" icon={CheckCircle2} tone="bg-mint/15 text-emerald-700" />
        <StatCard title="Rejected" value={summary.rejectedCount} helper="Decision closed" icon={XCircle} tone="bg-coral/15 text-red-700" />
      </div>

      <AnalyticsCharts summary={summary} />

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-3 lg:grid-cols-[1fr_220px_auto]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              value={search}
              onChange={(event) => resetToFirstPage(setSearch)(event.target.value)}
              className="w-full rounded-md border border-slate-200 bg-white py-3 pl-10 pr-4 outline-none ring-mint/30 transition focus:ring-4 dark:border-slate-700 dark:bg-slate-950"
              placeholder="Search applicant name or mobile number"
            />
          </label>
          <label className="relative block">
            <ListFilter className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <select
              value={status}
              onChange={(event) => resetToFirstPage(setStatus)(event.target.value)}
              className="w-full appearance-none rounded-md border border-slate-200 bg-white py-3 pl-10 pr-4 outline-none ring-mint/30 transition focus:ring-4 dark:border-slate-700 dark:bg-slate-950"
            >
              <option value="">All statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </label>
          <Button variant="secondary" onClick={resetFilters} disabled={!search && !status}>
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </section>

      {loading ? (
        <SkeletonRows rows={6} />
      ) : applications.length ? (
        <>
          <ApplicationTable applications={applications} onSelect={setSelected} />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Page {pagination.page} of {pagination.totalPages} ({pagination.total} applications)
            </p>
            <div className="flex gap-2">
              <Button variant="secondary" disabled={pagination.page <= 1} onClick={() => changePage(pagination.page - 1)}>
                Previous
              </Button>
              <Button
                variant="secondary"
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => changePage(pagination.page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      ) : (
        <EmptyState title="No applications found" description="Adjust filters or submit a borrower application to populate the dashboard." />
      )}

      {selected && (
        <ApplicationDetailsModal
          application={selected}
          onClose={() => setSelected(null)}
          onRequestStatus={setConfirmStatus}
        />
      )}

      {confirmStatus && (
        <ConfirmModal
          status={confirmStatus}
          loading={updating}
          onCancel={() => setConfirmStatus('')}
          onConfirm={updateStatus}
        />
      )}
    </div>
  );
};
