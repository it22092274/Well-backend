import { VercelRequest, VercelResponse } from '@vercel/node';

export default (req: VercelRequest, res: VercelResponse) => {
  if (req.method === 'GET') {
    res.status(200).send('Hello World from GET route!');
  } else if (req.method === 'POST') {
    res.status(200).send('Hello World from POST route!');
  } else {
    res.status(405).send('Method Not Allowed');
  }
};
