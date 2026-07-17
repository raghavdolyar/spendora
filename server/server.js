import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/category.js';
import transactionRoutes from './routes/transaction.js';
import budgetRoutes from './routes/budget.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'spendora is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);

app.listen(PORT, () => {
  console.log(`server running on address http://localhost:${PORT}`);
});
