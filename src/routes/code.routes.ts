import { Router } from 'express';
import { analyzeCodeController } from '../controllers/code.controller';

const router = Router();
router.post('/analyze', (req, res, next) => {
  Promise.resolve(analyzeCodeController(req, res, next)).catch(next);
});

export default router;