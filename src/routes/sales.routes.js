const express = require('express');
const router = express.Router();
const {
    getAllSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale
} = require('../controllers/sales.controller');

// GET /api/sales - Listar todos los sales
router.get('/', getAllSales);

// GET /api/sales/:id - Obtener Sale por ID
router.get('/:id', getSaleById);

// POST /api/sales - Crear nuevo Sale
router.post('/', createSale);

// PUT /api/sales/:id - Actualizar Sale
router.put('/:id', updateSale);

// DELETE /api/sales/:id - Eliminar Sale
router.delete('/:id', deleteSale);

module.exports = router;