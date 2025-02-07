import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 8080,
  JWT_SECRET: process.env.JWT_SECRET || 'upfirst-secret-key',
  CLIENT_ID: process.env.CLIENT_ID || 'upfirst',
  REDIRECT_URI: process.env.REDIRECT_URI || 'http://localhost:8081/process',
};