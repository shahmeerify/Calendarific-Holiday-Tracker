class APIError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  const errorHandler = (err, req, res, next) => {
    console.error(err);
  
    if (err instanceof APIError) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = { APIError, errorHandler };