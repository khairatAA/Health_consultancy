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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const Consultation_1 = require("../models/Consultation");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
// Create consultation
router.post('/create-consultation', auth_1.authenticateJWT, (0, express_validator_1.body)('patientId').isInt(), (0, express_validator_1.body)('consultationType').isString(), (0, express_validator_1.body)('medicalCondition').isString(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.role !== 'officer') {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { patientId, consultationType, medicalCondition } = req.body;
    const newConsultation = {
        patientId,
        officerId: req.user.id,
        consultationType,
        medicalCondition,
    };
    try {
        const consultation = yield Consultation_1.Consultation.create(newConsultation);
        res.status(201).json(consultation);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}));
// Get all consultations with filtering
router.get('/consultations', auth_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.role !== 'officer') {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    try {
        const consultations = yield Consultation_1.Consultation.findAll({
            where: req.query, // You may need to sanitize and validate query params
        });
        res.json(consultations);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}));
// Get consultation by ID
router.get('/consultation/:id', auth_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const consultation = yield Consultation_1.Consultation.findByPk(req.params.id);
        if (!consultation || (consultation.officerId !== req.user.id && req.user.role !== 'patient')) {
            return res.status(404).json({ message: 'Consultation not found or unauthorized' });
        }
        res.json(consultation);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}));
exports.default = router;
