import { CheckCircle2, Clipboard, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { Badge } from './Badge.jsx';
import { Button } from './Button.jsx';
import { Modal } from './Modal.jsx';
import { formatCurrency, formatDate, relativeTime } from '../utils/formatters.js';

const Detail = ({ label, value }) => (
  <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-950">
    <p className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">{label}</p>
    <p className="mt-2 break-words text-sm font-semibold text-slate-900 dark:text-white">{value}</p>
  </div>
);

export const ApplicationDetailsModal = ({ application, onClose, onRequestStatus }) => {
  const copyId = async () => {
    await navigator.clipboard.writeText(application.id);
    toast.success('Application ID copied.');
  };

  return (
    <Modal title="Application details" onClose={onClose}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Reference number</p>
          <p className="mt-1 break-all text-sm font-bold text-slate-900 dark:text-white">{application.id}</p>
        </div>
        <Button variant="secondary" onClick={copyId}>
          <Clipboard className="h-4 w-4" />
          Copy ID
        </Button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Detail label="Applicant" value={application.applicantName} />
        <Detail label="Mobile" value={application.mobileNumber} />
        <Detail label="Loan amount" value={formatCurrency(application.loanAmount)} />
        <Detail label="Language" value={<Badge type="language">{application.preferredLanguage}</Badge>} />
        <Detail label="Status" value={<Badge>{application.status}</Badge>} />
        <Detail label="Created" value={`${formatDate(application.createdAt)} (${relativeTime(application.createdAt)})`} />
      </div>

      <div className="mt-3 rounded-md bg-slate-50 p-4 dark:bg-slate-950">
        <p className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Purpose</p>
        <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{application.loanPurpose}</p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        {application.status === 'pending' && (
          <>
          <Button variant="secondary" onClick={() => onRequestStatus('approved')}>
            <CheckCircle2 className="h-4 w-4" />
            Approve
          </Button>
          <Button variant="danger" onClick={() => onRequestStatus('rejected')}>
            <XCircle className="h-4 w-4" />
            Reject
          </Button>
          </>
        )}
      </div>
    </Modal>
  );
};
