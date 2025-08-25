import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import loanRouter from './routes/loanRoutes.js';

// Firebase Admin setup
import admin from "firebase-admin";



const app = express();

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
});
// Middlewares
app.use(express.json());
app.use(cookieParser());

// CORS: allow frontend to send credentials & cookies
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true 
}));

// Routes
app.use('/api', loanRouter);

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

// MongoDB connection & Server start
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => console.log('Server running on port', process.env.PORT));
})
.catch(err => console.error('Mongo connect error:', err));

export default app;
