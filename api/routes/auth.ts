import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../utils/mongodb';

const router = Router();

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  const { db } = await connectToDatabase();
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.collection('users').insertOne({
    username,
    password: hashedPassword,
  });

  res.status(201).send('User created');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  const { db } = await connectToDatabase();
  const user = await db.collection('users').findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid credentials');
  }

  const token = jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );

  res.status(200).json({ token });
});

export default router;
