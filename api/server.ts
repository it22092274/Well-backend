import express from 'express';
import dotenv from 'dotenv';
import connectDB from '../config/db';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use(require('./auth/login'));
app.use(require('./auth/signup'));

app.listen(process.env.PORT || 3000, () => {
    console.log('server is up and running')
})

export default app;
