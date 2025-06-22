"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeComplexity = void 0;
const tree_sitter_1 = __importDefault(require("tree-sitter"));
const tree_sitter_python_1 = __importDefault(require("tree-sitter-python"));
const estimator_1 = require("../core/complexityEngine/estimator");
const analysis_store_1 = require("../db/analysis.store");
const analyzeComplexity = (code, language) => __awaiter(void 0, void 0, void 0, function* () {
    const parser = new tree_sitter_1.default();
    if (language === 'python') {
        parser.setLanguage(tree_sitter_python_1.default);
    }
    else {
        throw new Error('Only Python is supported in this module.');
    }
    const tree = parser.parse(code);
    const analysis = (0, estimator_1.estimateComplexity)(tree);
    // Save the analysis result to the database
    yield (0, analysis_store_1.saveAnalysisResult)({
        code,
        language,
        timeComplexity: analysis.timeComplexity,
        spaceComplexity: analysis.spaceComplexity,
        explanation: analysis.explanation
    });
    return Object.assign({ language,
        code }, analysis);
});
exports.analyzeComplexity = analyzeComplexity;
