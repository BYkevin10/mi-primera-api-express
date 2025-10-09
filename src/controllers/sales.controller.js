const { sales, medicines, prescriptions } = require('../data/medicinesData');

// GET /api/sales - Listar todos los sales
const getAllSales = (req, res) => {
    try {
        res.json(sales);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// GET /api/sales/:id - Obtener Sale por ID
const getSaleById = (req, res) => {
    try {
        const sale = sales.find(s => s.id === parseInt(req.params.id));
        if (!sale) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        res.json(sale);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// POST /api/sales - Crear nuevo Sale
const createSale = (req, res) => {
    try {
        const { medicineId, quantity, prescriptionId, date } = req.body;

        // Validación de campos requeridos
        if (!medicineId || !quantity) {
            return res.status(400).json({ 
                error: 'Los campos medicineId y quantity son requeridos' 
            });
        }

        // Validar que el medicineId existe
        const medicineExists = medicines.find(m => m.id === parseInt(medicineId));
        if (!medicineExists) {
            return res.status(400).json({ error: 'El medicineId especificado no existe' });
        }

        // Validar stock disponible
        if (medicineExists.stock < parseInt(quantity)) {
            return res.status(400).json({ 
                error: `Stock insuficiente. Disponible: ${medicineExists.stock}, Solicitado: ${quantity}` 
            });
        }

        // Validar prescriptionId si se proporciona
        if (prescriptionId) {
            const prescriptionExists = prescriptions.find(p => p.id === parseInt(prescriptionId));
            if (!prescriptionExists) {
                return res.status(400).json({ error: 'El prescriptionId especificado no existe' });
            }
        }

        const newSale = {
            id: sales.length + 1,
            medicineId: parseInt(medicineId),
            quantity: parseInt(quantity),
            prescriptionId: prescriptionId ? parseInt(prescriptionId) : null,
            date: date || new Date().toISOString().split('T')[0] // Fecha actual si no se proporciona
        };

        // Actualizar stock del medicamento
        medicineExists.stock -= parseInt(quantity);

        sales.push(newSale);
        res.status(201).json(newSale);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// PUT /api/sales/:id - Actualizar Sale
const updateSale = (req, res) => {
    try {
        const saleIndex = sales.findIndex(s => s.id === parseInt(req.params.id));
        if (saleIndex === -1) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }

        const { medicineId, quantity, prescriptionId, date } = req.body;
        const updatedSale = {
            ...sales[saleIndex],
            ...(medicineId && { medicineId: parseInt(medicineId) }),
            ...(quantity && { quantity: parseInt(quantity) }),
            ...(prescriptionId && { prescriptionId: parseInt(prescriptionId) }),
            ...(date && { date })
        };

        sales[saleIndex] = updatedSale;
        res.json(updatedSale);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// DELETE /api/sales/:id - Eliminar Sale
const deleteSale = (req, res) => {
    try {
        const saleIndex = sales.findIndex(s => s.id === parseInt(req.params.id));
        if (saleIndex === -1) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }

        const deletedSale = sales.splice(saleIndex, 1)[0];
        res.json({ message: 'Venta eliminada correctamente', deletedSale });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getAllSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale
};