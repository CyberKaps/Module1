

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const saveAnalysisResult = async (data: {
  code: string;
  language: string;
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
}) => {
  await prisma.analysisResult.create({ data });
};
