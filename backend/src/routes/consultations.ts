import { Router } from 'express';
import { authenticateJWT } from '../middlewares/auth';
import { Consultation, ConsultationCreationAttributes } from '../models/Consultation';
import { body, validationResult } from 'express-validator';

const router = Router();

interface CreateConsultationRequest {
  patientId: number;
  consultationType: string;
  medicalCondition: string;
}

// Create consultation
router.post('/create-consultation', authenticateJWT,
  body('patientId').isInt(),
  body('consultationType').isString(),
  body('medicalCondition').isString(),
  async (req, res) => {
    if (req.user.role !== 'officer') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { patientId, consultationType, medicalCondition } = req.body as CreateConsultationRequest;

    const newConsultation: ConsultationCreationAttributes = {
      patientId,
      officerId: req.user.id,
      consultationType,
      medicalCondition,
    };

    try {
      const consultation = await Consultation.create(newConsultation);
      res.status(201).json(consultation);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  }
);

// Get all consultations with filtering
router.get('/consultations', authenticateJWT, async (req, res) => {
  if (req.user.role !== 'officer') {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  try {
    const consultations = await Consultation.findAll({
      where: req.query, // You may need to sanitize and validate query params
    });

    res.json(consultations);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// Get consultation by ID
router.get('/consultation/:id', authenticateJWT, async (req, res) => {
  try {
    const consultation = await Consultation.findByPk(req.params.id);

    if (!consultation || (consultation.officerId !== req.user.id && req.user.role !== 'patient')) {
      return res.status(404).json({ message: 'Consultation not found or unauthorized' });
    }

    res.json(consultation);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

export default router;
