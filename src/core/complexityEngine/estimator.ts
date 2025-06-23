
import { Tree } from 'tree-sitter';

export const estimateComplexity = (tree: Tree) => {
  let loopDepth = 0;
  let recursion = false;
  let functionName = '';
  let recursiveCalls = 0;
  let divideOps = 0;
  let totalLoops = 0;
  let listComprehensions = 0;

  const walk = (node: any, parentFn: string | null = null) => {
    if (node.type === 'function_definition' || node.type === 'function_declaration') {
      functionName = node.childForFieldName('name')?.text || '';
    }

    if (node.type === 'for_statement' || node.type === 'while_statement') {
      totalLoops++;
      loopDepth++;
    }

    if (
      (node.type === 'call' || node.type === 'call_expression') &&
      node.firstChild?.text === functionName
    ) {
      recursion = true;
      recursiveCalls++;
    }

    if (
      node.type === 'binary_operator' &&
      (node.text.includes('//') || node.text.includes('/2') || node.text.includes('/ 2') || node.text.includes('/'))
    ) {
      divideOps++;
    }

    if (
      node.type === 'list_comprehension' ||
      node.type === 'set_comprehension' ||
      node.type.includes('comprehension')
    ) {
      listComprehensions++;
      loopDepth++;
    }

    for (const child of node.children || []) {
      walk(child, functionName);
    }
  };

  walk(tree.rootNode);

  let time = 'O(1)';

  if (recursion && recursiveCalls === 1 && !divideOps && loopDepth === 0) {
    time = 'O(n)';
  } else if (recursion && recursiveCalls === 2 && divideOps === 1 && loopDepth === 0) {
    time = 'O(log n)'; 
  } else if (recursion && recursiveCalls === 2 && divideOps === 1 && loopDepth <= 3) {
    time = 'O(n log n)'; 
  } else if (recursion && recursiveCalls > 1 && divideOps === 0) {
    time = 'O(2^n)';
  } else if (recursion && recursiveCalls > 1 && divideOps > 0 && loopDepth === 0) {
    time = 'O(log n)';
  } else if (recursion && recursiveCalls > 1 && divideOps > 0) {
    time = 'O(n * 2^n)';
  } else if (recursion && divideOps > 0 && loopDepth > 3) {
    time = 'O(n^2 log n)';
  } else if (recursion && loopDepth >= 1) {
    time = 'O(n * 2^n)';
  } else if (loopDepth >= 3) {
    time = 'O(n^3)';
  } else if (loopDepth === 2) {
    time = 'O(n^2)';
  } else if (loopDepth === 1) {
    time = 'O(n)';
  }

  const space = recursion ? 'O(n)' : 'O(1)';

  return {
    timeComplexity: time,
    spaceComplexity: space,
    explanation: `Detected ${loopDepth} loop(s) (including ${listComprehensions} comprehension(s)), ${recursiveCalls} recursive call(s), and ${divideOps} divide operation(s). Time estimated as ${time}.`,
  };
};