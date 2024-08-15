require('dotenv').config();
const express = require('express');
const holidayRoutes = require('./routes/holidayRoutes');
const { errorHandler } = require('./utils/errorHandler');

const app = express();

app.use(express.json());
app.use('/api', holidayRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;