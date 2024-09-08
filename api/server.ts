import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || '')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Use authentication routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
