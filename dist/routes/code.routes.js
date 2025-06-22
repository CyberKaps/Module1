"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const code_controller_1 = require("../controllers/code.controller");
const router = (0, express_1.Router)();
router.post('/analyze', (req, res, next) => {
    Promise.resolve((0, code_controller_1.analyzeCodeController)(req, res, next)).catch(next);
});
exports.default = router;
