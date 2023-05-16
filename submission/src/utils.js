const crypto = require('crypto');

const generateId = () => crypto.randomUUID().slice(0, 8);
const generateDate = () => new Date().toISOString();

module.exports = { generateId, generateDate };
