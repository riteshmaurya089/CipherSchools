const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const requiredVars = ['PORT', 'POSTGRES_URI', 'MONGO_URI', 'HF_API_KEY'];

requiredVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`Missing required environment variable: ${varName}`);
    process.exit(1);
  }
});

module.exports = {
  PORT: process.env.PORT,
  POSTGRES_URI: process.env.POSTGRES_URI,
  MONGO_URI: process.env.MONGO_URI,
  LLM_API_KEY: process.env.HF_API_KEY,
};