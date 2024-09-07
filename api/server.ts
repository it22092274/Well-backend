import express from 'express';
import bodyParser from 'body-parser';
import { connectToDatabase } from './utils/mongodb';
import authRoutes from './routes/auth';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', authRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
