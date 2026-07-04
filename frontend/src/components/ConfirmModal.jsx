import { AlertTriangle } from 'lucide-react';
import { Button } from './Button.jsx';
import { Modal } from './Modal.jsx';

export const ConfirmModal = ({ status, loading, onCancel, onConfirm }) => (
  <Modal title="Confirm status update" onClose={onCancel}>
    <div className="flex gap-4">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-gold/15 text-amber-700">
        <AlertTriangle className="h-5 w-5" />
      </div>
      <div>
        <p className="font-semibold text-slate-900 dark:text-white">
          Move this application to <span className="capitalize">{status}</span>?
        </p>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Status changes are limited to pending applications so the workflow stays auditable.
        </p>
      </div>
    </div>
    <div className="mt-6 flex justify-end gap-3">
      <Button variant="secondary" onClick={onCancel} disabled={loading}>
        Cancel
      </Button>
      <Button variant={status === 'rejected' ? 'danger' : 'primary'} onClick={onConfirm} disabled={loading}>
        {loading ? 'Updating...' : 'Confirm'}
      </Button>
    </div>
  </Modal>
);
