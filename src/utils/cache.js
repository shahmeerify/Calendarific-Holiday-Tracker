const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: process.env.CACHE_TTL || 3600 });

module.exports = cache;