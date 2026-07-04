import { query } from '../db/pool.js';
import { ApiError } from '../utils/ApiError.js';
import { STATUS_TRANSITIONS } from '../utils/constants.js';

const mapApplication = (row) => ({
  id: row.id,
  applicantName: row.name,
  mobileNumber: row.mobile,
  loanAmount: Number(row.amount),
  loanPurpose: row.purpose,
  preferredLanguage: row.language,
  status: row.status,
  createdAt: row.created_at
});

export const createApplication = async (payload) => {
  const result = await query(
    `INSERT INTO applications (name, mobile, amount, purpose, language)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [
      payload.applicantName.trim(),
      String(payload.mobileNumber),
      Number(payload.loanAmount),
      payload.loanPurpose.trim(),
      payload.preferredLanguage
    ]
  );

  return mapApplication(result.rows[0]);
};

export const listApplications = async ({ status, search, page = 1, limit = 10 }) => {
  const where = [];
  const params = [];

  if (status) {
    params.push(status);
    where.push(`status = $${params.length}`);
  }

  if (search) {
    params.push(`%${String(search).toLowerCase()}%`);
    where.push(`(LOWER(name) LIKE $${params.length} OR mobile LIKE $${params.length})`);
  }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const offset = (Number(page) - 1) * Number(limit);

  params.push(Number(limit), offset);
  const listSql = `
    SELECT * FROM applications
    ${whereSql}
    ORDER BY created_at DESC
    LIMIT $${params.length - 1} OFFSET $${params.length}
  `;

  const countParams = params.slice(0, -2);
  const countSql = `SELECT COUNT(*)::int AS total FROM applications ${whereSql}`;

  const [itemsResult, countResult] = await Promise.all([
    query(listSql, params),
    query(countSql, countParams)
  ]);

  return {
    items: itemsResult.rows.map(mapApplication),
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: countResult.rows[0].total,
      totalPages: Math.ceil(countResult.rows[0].total / Number(limit)) || 1
    }
  };
};

export const updateApplicationStatus = async (id, nextStatus) => {
  const existing = await query('SELECT * FROM applications WHERE id = $1', [id]);

  if (existing.rowCount === 0) {
    throw new ApiError(404, 'Application not found.');
  }

  const current = existing.rows[0];
  const allowedNextStatuses = STATUS_TRANSITIONS[current.status] || [];

  if (!allowedNextStatuses.includes(nextStatus)) {
    throw new ApiError(409, `Cannot change status from ${current.status} to ${nextStatus}.`);
  }

  const updated = await query(
    'UPDATE applications SET status = $1 WHERE id = $2 RETURNING *',
    [nextStatus, id]
  );

  return mapApplication(updated.rows[0]);
};

export const getSummary = async () => {
  const [summaryResult, languageResult] = await Promise.all([
    query(
    `SELECT
      COUNT(*)::int AS total_applications,
      COALESCE(SUM(amount), 0)::numeric AS total_loan_amount,
      COUNT(*) FILTER (WHERE status = 'pending')::int AS pending_count,
      COUNT(*) FILTER (WHERE status = 'approved')::int AS approved_count,
      COUNT(*) FILTER (WHERE status = 'rejected')::int AS rejected_count
     FROM applications`
    ),
    query(
      `SELECT
        language,
        COUNT(*)::int AS application_count,
        COALESCE(SUM(amount), 0)::numeric AS total_loan_amount
       FROM applications
       GROUP BY language
       ORDER BY total_loan_amount DESC`
    )
  ]);

  const row = summaryResult.rows[0];
  return {
    totalApplications: row.total_applications,
    totalLoanAmount: Number(row.total_loan_amount),
    pendingCount: row.pending_count,
    approvedCount: row.approved_count,
    rejectedCount: row.rejected_count,
    loanAmountByLanguage: languageResult.rows.map((item) => ({
      language: item.language,
      total: Number(item.total_loan_amount),
      count: item.application_count
    }))
  };
};

export const checkDatabase = async () => {
  const result = await query('SELECT NOW() AS checked_at');
  return {
    connected: true,
    checkedAt: result.rows[0].checked_at
  };
};
