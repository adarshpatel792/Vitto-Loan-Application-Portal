import { useState } from 'react';
import { ArrowRight, CheckCircle2, Clipboard, Languages, Loader2, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '../components/Button.jsx';
import { applicationApi, getApiErrorMessage } from '../services/api.js';
import { LANGUAGES, validateApplicationForm } from '../utils/validation.js';
import { formatCurrency } from '../utils/formatters.js';

const initialValues = {
  applicantName: '',
  mobileNumber: '',
  loanAmount: '',
  loanPurpose: '',
  preferredLanguage: 'English'
};

const FieldError = ({ message }) => (message ? <p className="mt-2 text-sm font-medium text-red-600">{message}</p> : null);

export const ApplyPage = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  const updateField = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const copyReference = async () => {
    await navigator.clipboard.writeText(referenceNumber);
    toast.success('Reference number copied.');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateApplicationForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error('Please fix the highlighted fields.');
      return;
    }

    try {
      setLoading(true);
      const response = await applicationApi.create({
        ...values,
        loanAmount: Number(values.loanAmount)
      });
      setReferenceNumber(response.data.applicationReferenceNumber);
      setValues(initialValues);
      toast.success(response.data.message);
    } catch (error) {
      if (error.response?.data?.details) {
        setErrors(error.response.data.details);
      }
      toast.error(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase text-mint">Borrower intake</p>
            <h1 className="mt-2 text-3xl font-black text-slate-950 dark:text-white">New loan application</h1>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600 dark:bg-slate-950 dark:text-slate-300">
            <ShieldCheck className="h-4 w-4 text-mint" />
            Secure API submission
          </div>
        </div>

        <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Applicant name</span>
              <input
                value={values.applicantName}
                onChange={(event) => updateField('applicantName', event.target.value)}
                className="mt-2 w-full rounded-md border border-slate-200 bg-white px-4 py-3 outline-none ring-mint/30 transition focus:ring-4 dark:border-slate-700 dark:bg-slate-950"
                placeholder="Aarav Sharma"
              />
              <FieldError message={errors.applicantName} />
            </label>

            <label className="block">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Mobile number</span>
              <input
                value={values.mobileNumber}
                onChange={(event) => updateField('mobileNumber', event.target.value.replace(/\D/g, '').slice(0, 10))}
                className="mt-2 w-full rounded-md border border-slate-200 bg-white px-4 py-3 outline-none ring-mint/30 transition focus:ring-4 dark:border-slate-700 dark:bg-slate-950"
                placeholder="9876543210"
                inputMode="numeric"
              />
              <FieldError message={errors.mobileNumber} />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Loan amount</span>
              <input
                value={values.loanAmount}
                onChange={(event) => updateField('loanAmount', event.target.value)}
                className="mt-2 w-full rounded-md border border-slate-200 bg-white px-4 py-3 outline-none ring-mint/30 transition focus:ring-4 dark:border-slate-700 dark:bg-slate-950"
                placeholder="250000"
                inputMode="decimal"
              />
              {values.loanAmount && Number(values.loanAmount) > 0 && (
                <p className="mt-2 text-sm font-semibold text-slate-500">{formatCurrency(values.loanAmount)}</p>
              )}
              <FieldError message={errors.loanAmount} />
            </label>

            <label className="block">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Preferred language</span>
              <div className="relative mt-2">
                <Languages className="pointer-events-none absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                <select
                  value={values.preferredLanguage}
                  onChange={(event) => updateField('preferredLanguage', event.target.value)}
                  className="w-full appearance-none rounded-md border border-slate-200 bg-white py-3 pl-10 pr-4 outline-none ring-mint/30 transition focus:ring-4 dark:border-slate-700 dark:bg-slate-950"
                >
                  {LANGUAGES.map((language) => (
                    <option key={language}>{language}</option>
                  ))}
                </select>
              </div>
              <FieldError message={errors.preferredLanguage} />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Loan purpose</span>
            <textarea
              value={values.loanPurpose}
              onChange={(event) => updateField('loanPurpose', event.target.value)}
              className="mt-2 min-h-32 w-full resize-y rounded-md border border-slate-200 bg-white px-4 py-3 outline-none ring-mint/30 transition focus:ring-4 dark:border-slate-700 dark:bg-slate-950"
              placeholder="Business expansion, inventory purchase, education, medical expense..."
            />
            <FieldError message={errors.loanPurpose} />
          </label>

          <Button type="submit" className="w-full sm:w-fit" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            Submit application
          </Button>
        </form>
      </section>

      <aside className="space-y-4">
        <section className="rounded-lg border border-slate-200 bg-ink p-6 text-white shadow-soft dark:border-slate-800">
          <p className="text-sm font-bold uppercase text-mint">Vitto promise</p>
          <h2 className="mt-3 text-2xl font-black">Fast intake, cleaner review, auditable decisions.</h2>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Each submission goes directly to the operations dashboard with a UUID reference, validation, and status workflow.
          </p>
        </section>

        {referenceNumber && (
          <section className="rounded-lg border border-mint/30 bg-mint/10 p-6 dark:bg-mint/5">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-mint" />
              <h3 className="text-lg font-black text-slate-950 dark:text-white">Application submitted</h3>
            </div>
            <p className="mt-3 break-all rounded-md bg-white p-3 text-sm font-bold text-slate-800 dark:bg-slate-900 dark:text-slate-100">
              {referenceNumber}
            </p>
            <Button variant="secondary" className="mt-4" onClick={copyReference}>
              <Clipboard className="h-4 w-4" />
              Copy reference
            </Button>
          </section>
        )}
      </aside>
    </div>
  );
};
