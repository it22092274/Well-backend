import { Request, Response } from 'express';

export const getHello = (req: Request, res: Response): void => {
  res.send('Hello World from GET route!');
};

export const postHello = (req: Request, res: Response): void => {
  res.send('Hello World from POST route!');
};
