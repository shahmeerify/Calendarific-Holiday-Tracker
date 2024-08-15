const calendarificService = require('../services/calendarificService');
const validateParams = require('../utils/validateParams');
const { APIError } = require('../utils/errorHandler');

exports.getHolidays = async (req, res, next) => {
  const params = {
    country: req.query.country,
    year: req.query.year,
    day: req.query.day,
    month: req.query.month,
    type: req.query.type,
  };

  const errors = validateParams(params);

  if (errors.length > 0) {
    return next(new APIError(errors.join(', '), 400));
  }

  try {
    const holidays = await calendarificService.getHolidays(params);
    res.json(holidays);
  } catch (error) {
    next(error);
  }
};

exports.getCountries = async (req, res, next) => {
  try {
    const countries = await calendarificService.getCountries();
    res.json(countries);
  } catch (error) {
    next(error);
  }
};