import { Request, Response, NextFunction } from 'express';
import { analyzeComplexity } from '../services/analyzer.service';

export const analyzeCodeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, language } = req.body;
    if (!code || !language) return res.status(400).json({ error: 'Code and language are required.' });

    const result = await analyzeComplexity(code, language);
    res.json(result);
  } catch (err) {
    next(err);
  }
};