const express = require('express');
const router = express.Router();
const {
    getAllMedicines,
    getMedicineById,
    createMedicine,
    updateMedicine,
    deleteMedicine
} = require('../controllers/medicines.controller');

// GET /api/medicines - Listar todos los medicines (con filtrado y paginación)
router.get('/', getAllMedicines);

// GET /api/medicines/:id - Obtener Medicine por ID
router.get('/:id', getMedicineById);

// POST /api/medicines - Crear nuevo Medicine
router.post('/', createMedicine);

// PUT /api/medicines/:id - Actualizar Medicine
router.put('/:id', updateMedicine);

// DELETE /api/medicines/:id - Eliminar Medicine
router.delete('/:id', deleteMedicine);

module.exports = router;