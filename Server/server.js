import express from 'express';
import dotenv from 'dotenv';
import loanRoutes from './routes/loanRoutes.js';
import { initializeApp } from 'firebase-admin/app';
import { credential } from 'firebase-admin';
import logger from './utils/logger.js';

dotenv.config();

initializeApp({
  credential: credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const app = express();
app.use(express.json());

app.use('/api', loanRoutes);

app.use((err, req, res, next) => {
  logger.error(err);
  res.status(err.statusCode || 500).json({ error: err.message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Server listening on port ${port}`));
