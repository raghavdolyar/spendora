import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/category.js';
import transactionRoutes from './routes/transaction.js';
import budgetRoutes from './routes/budget.js';
import dashboardRoutes from './routes/dashboard.js';
import insightRoutes from './routes/insight.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  }),
);

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'spendora is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/insights', insightRoutes);

app.listen(PORT, () => {
  console.log(`server running on address http://localhost:${PORT}`);
});
