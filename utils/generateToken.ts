import jwt from 'jsonwebtoken';

const generateToken = (id: any) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '30d' });
};

export default generateToken;
