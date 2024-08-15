const axios = require('axios');
const cache = require('../utils/cache');
const { APIError } = require('../utils/errorHandler');

class CalendarificService {
  constructor() {
    this.apiKey = process.env.CALENDARIFIC_API_KEY;
    this.apiUrl = process.env.CALENDARIFIC_API_URL;
  }

  async getHolidays(params) {
    const cacheKey = `holidays_${JSON.stringify(params)}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await axios.get(`${this.apiUrl}/holidays`, {
        params: {
          api_key: this.apiKey,
          ...params
        },
      });

      if (response.data.meta.code !== 200) {
        throw new APIError(response.data.meta.error_type, response.data.meta.code);
      }

      const holidays = response.data.response.holidays;
      cache.set(cacheKey, holidays);
      return holidays;
    } catch (error) {
      if (error.response) {
        throw new APIError(error.response.data.error || 'Failed to fetch holidays', error.response.status);
      }
      throw new APIError('Failed to fetch holidays', 500);
    }
  }

  async getCountries() {
    const cacheKey = 'countries';
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await axios.get(`${this.apiUrl}/countries`, {
        params: {
          api_key: this.apiKey,
        },
      });

      if (response.data.meta.code !== 200) {
        throw new APIError(response.data.meta.error_type, response.data.meta.code);
      }

      const countries = response.data.response.countries;
      cache.set(cacheKey, countries);
      return countries;
    } catch (error) {
      if (error.response) {
        throw new APIError(error.response.data.error || 'Failed to fetch countries', error.response.status);
      }
      throw new APIError('Failed to fetch countries', 500);
    }
  }
}

module.exports = new CalendarificService();