import Parser from 'tree-sitter';
import Python from 'tree-sitter-python';
import JavaScript from 'tree-sitter-javascript';
import Cpp from 'tree-sitter-cpp';
import Java from 'tree-sitter-java'
import { estimateComplexity } from '../core/complexityEngine/estimator';
import { saveAnalysisResult } from '../db/analysis.store';

export const analyzeComplexity = async (code: string, language: string) => {
  const parser = new Parser();

  if (language === 'python') {
    parser.setLanguage(Python as any);
    } else if (language === 'javascript') {
    parser.setLanguage(JavaScript as any);
    } else if (language === 'cpp') {
    parser.setLanguage(Cpp as any);
    } else if (language === 'java') {
        parser.setLanguage(Java as any)
    }
     else {
    throw new Error('Language not supported.');
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