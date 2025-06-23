

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const saveAnalysisResult = async (data: {
  code: string;
  language: string;
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
}) => {
  try {
  await prisma.analysisResult.create({ data });
} catch (error) {
  if (error instanceof Error) {
    console.error("❌ Failed to save result:", error.message);
  } else {
    console.error("❌ Failed to save result:", error);
  }
}
};
