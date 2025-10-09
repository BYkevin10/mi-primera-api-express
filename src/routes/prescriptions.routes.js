const express = require('express');
const router = express.Router();
const {
    getAllPrescriptions,
    getPrescriptionById,
    createPrescription,
    updatePrescription,
    deletePrescription
} = require('../controllers/prescriptions.controller');

// GET /api/prescriptions - Listar todos los prescriptions
router.get('/', getAllPrescriptions);

// GET /api/prescriptions/:id - Obtener Prescription por ID
router.get('/:id', getPrescriptionById);

// POST /api/prescriptions - Crear nuevo Prescription
router.post('/', createPrescription);

// PUT /api/prescriptions/:id - Actualizar Prescription
router.put('/:id', updatePrescription);

// DELETE /api/prescriptions/:id - Eliminar Prescription
router.delete('/:id', deletePrescription);

module.exports = router;