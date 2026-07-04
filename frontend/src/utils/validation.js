export const LANGUAGES = ['Hindi', 'Tamil', 'Telugu', 'Marathi', 'English'];

export const validateApplicationForm = (values) => {
  const errors = {};

  if (!values.applicantName.trim() || values.applicantName.trim().length < 3) {
    errors.applicantName = 'Enter at least 3 characters.';
  }

  if (!/^\d{10}$/.test(values.mobileNumber)) {
    errors.mobileNumber = 'Enter exactly 10 digits.';
  }

  if (!values.loanAmount || Number(values.loanAmount) <= 0) {
    errors.loanAmount = 'Enter an amount greater than 0.';
  }

  if (!values.loanPurpose.trim()) {
    errors.loanPurpose = 'Describe the loan purpose.';
  }

  if (!LANGUAGES.includes(values.preferredLanguage)) {
    errors.preferredLanguage = 'Choose a supported language.';
  }

  return errors;
};
