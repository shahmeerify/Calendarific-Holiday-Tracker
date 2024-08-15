const validateParams = (params) => {
    const errors = [];
  
    if (!params.country || typeof params.country !== 'string' || params.country.length !== 2) {
      errors.push('Invalid country code. Please provide a 2-letter ISO-3166 country code.');
    }
  
    if (!params.year || isNaN(params.year) || params.year.length !== 4) {
      errors.push('Invalid year. Please provide a 4-digit year.');
    }
  
    if (params.day && (isNaN(params.day) || params.day < 1 || params.day > 31)) {
      errors.push('Invalid day. Please provide a number between 1 and 31.');
    }
  
    if (params.month && (isNaN(params.month) || params.month < 1 || params.month > 12)) {
      errors.push('Invalid month. Please provide a number between 1 and 12.');
    }
  
    if (params.type && !['national', 'local', 'religious', 'observance'].includes(params.type)) {
      errors.push('Invalid type. Please provide one of: national, local, religious, observance.');
    }
  
    return errors;
  };
  
  module.exports = validateParams;