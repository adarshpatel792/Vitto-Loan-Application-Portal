import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button.jsx';

export const Modal = ({ title, children, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
  <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4" onMouseDown={onClose}>
    <section
      className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-soft dark:bg-slate-900"
      onMouseDown={(event) => event.stopPropagation()}
    >
      <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">{title}</h2>
        <Button variant="secondary" className="h-9 w-9 px-0" onClick={onClose} title="Close modal">
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="p-5">{children}</div>
    </section>
  </div>
  );
};
