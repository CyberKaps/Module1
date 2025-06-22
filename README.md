# Time & Space Complexity Estimator (Internship Module)

This module analyzes submitted Python code and estimates its time and space complexity by parsing the Abstract Syntax Tree (AST) using Tree-sitter. It is built as a backend service using TypeScript, Node.js, Express, and rule-based logic.

---

## 🛠 Technologies Used

- Node.js
- Express.js
- TypeScript
- Tree-sitter (AST Parser)
- tree-sitter-python (Language grammar)
- REST API (JSON input/output)

---

## ⚙️ How It Works

1. Accepts Python code via a POST API.
2. Parses the code into an AST using Tree-sitter.
3. Traverses the AST to:
   - Count loops (for, while)
   - Detect recursion (self-calling functions)
   - Check for divide operations (e.g., n // 2)
4. Estimates:
   - Time Complexity: O(1), O(n), O(n²), O(log n), O(2ⁿ), O(n·2ⁿ)
   - Space Complexity: Based on recursion depth
5. Returns explanation in human-readable form.

---

## 📥 Sample Input

POST /api/code/analyze
# body
```json
{
  "language": "python",
  "code": "def fact(n):\n    if n == 1:\n        return 1\n    return n * fact(n-1)"
}

# output
```json
{
  "language": "python",
  "code": "def fact(n):\n    if n == 1:\n        return 1\n    return n * fact(n-1)",
  "timeComplexity": "O(2^n)",
  "spaceComplexity": "O(n)",
  "explanation": "Detected 0 loop(s), 1 recursive call(s), and 0 divide operation(s). Time estimated as O(2^n)."
}

