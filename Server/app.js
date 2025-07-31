import express from 'express';
import cors from 'cors';
import './config/firebase.js'; // initialize Firebase
import formRoutes from './routes/formRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/form', formRoutes);

export default app;