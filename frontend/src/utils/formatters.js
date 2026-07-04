export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(Number(amount || 0));

export const formatDate = (date) =>
  new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(date));

export const relativeTime = (date) => {
  const diffSeconds = Math.round((new Date(date).getTime() - Date.now()) / 1000);
  const units = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1]
  ];

  const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const match = units.find(([, seconds]) => Math.abs(diffSeconds) >= seconds);

  if (!match) return 'just now';

  const [unit, seconds] = match;
  return formatter.format(Math.round(diffSeconds / seconds), unit);
};

export const exportApplicationsToCsv = (applications) => {
  const headers = ['Application ID', 'Applicant', 'Mobile', 'Loan Amount', 'Purpose', 'Language', 'Status', 'Created At'];
  const rows = applications.map((item) => [
    item.id,
    item.applicantName,
    item.mobileNumber,
    item.loanAmount,
    item.loanPurpose,
    item.preferredLanguage,
    item.status,
    item.createdAt
  ]);
  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell ?? '').replaceAll('"', '""')}"`).join(','))
    .join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `vitto-applications-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};
