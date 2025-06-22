// Complexity Estimator - src/core/complexityEngine/estimator.ts
import { Tree } from 'tree-sitter';

export const estimateComplexity = (tree: Tree) => {
  let loopDepth = 0;
  let recursion = false;
  let functionName = '';
  let recursiveCalls = 0;
  let divideOps = 0;
  let totalLoops = 0;

  const walk = (node: any, parentFn: string | null = null) => {
    // Track function definitions
    if (node.type === 'function_definition') {
      functionName = node.childForFieldName('name')?.text || '';
    }

    // Detect loops
    if (node.type === 'for_statement' || node.type === 'while_statement') {
      totalLoops++;
      loopDepth++;
    }

    // Detect recursive calls
    if (node.type === 'call' && node.firstChild?.text === functionName) {
      recursion = true;
      recursiveCalls++;
    }

    // Detect division (for log n inference)
    if (node.type === 'binary_operator' && (node.text.includes('//') || node.text.includes('/2'))) {
      divideOps++;
    }

    for (const child of node.children || []) {
      walk(child, functionName);
    }
  };

  // Starts recursive traversal from the root of the AST.
  walk(tree.rootNode);

  // Enhanced rule-based estimation logic
  let time = 'O(1)';

  if (recursion && divideOps > 0 && totalLoops > 0) {
    time = 'O(n log n)';
  } else if (recursion && divideOps > 0) {
    time = 'O(log n)';
  } else if (recursion && loopDepth >= 1) {
    time = 'O(n * 2^n)';
  } else if (recursion) {
    time = 'O(2^n)';
  } else if (loopDepth >= 2) {
    time = 'O(n^2)';
  } else if (loopDepth === 1) {
    time = 'O(n)';
  }

  const space = recursion ? 'O(n)' : 'O(1)';

  return {
    timeComplexity: time,
    spaceComplexity: space,
    explanation: `Detected ${loopDepth} loop(s), ${recursiveCalls} recursive call(s), and ${divideOps} divide operation(s). Time estimated as ${time}.`,
  };
};