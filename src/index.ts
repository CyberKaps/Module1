
import express from 'express';
import dotenv from 'dotenv';
import codeRoutes from './routes/code.routes';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/code', codeRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));