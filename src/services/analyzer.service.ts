import Parser from 'tree-sitter';
import Python from 'tree-sitter-python';
import { estimateComplexity } from '../core/complexityEngine/estimator';
import { saveAnalysisResult } from '../db/analysis.store';

export const analyzeComplexity = async (code: string, language: string) => {
  const parser = new Parser();

  if (language === 'python') {
    parser.setLanguage(Python as any);
  } else {
    throw new Error('Only Python is supported in this module.');
  }

  const tree = parser.parse(code);
  const analysis = estimateComplexity(tree);


   // Save the analysis result to the database
  await saveAnalysisResult({
    code,
    language,
    timeComplexity: analysis.timeComplexity,
    spaceComplexity: analysis.spaceComplexity,
    explanation: analysis.explanation
  });

  return {
    language,
    code,
    ...analysis,
  };
};