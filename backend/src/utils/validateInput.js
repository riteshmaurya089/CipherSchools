const validateInput = (input, rules) => {
  const errors = [];

  rules.forEach((rule) => {
    const { field, type, required = true } = rule;
    const value = input[field];

    if (required && (value === undefined || value === null)) {
      errors.push(`${field} is required`);
      return;
    }

    if (type && value !== undefined && typeof value !== type) {
      errors.push(`${field} must be of type ${type}`);
    }
  });

  return errors;
};

module.exports = validateInput;