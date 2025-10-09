const { medicines } = require('../data/medicinesData');

// GET /api/medicines - Listar todos los medicines
const getAllMedicines = (req, res) => {
    try {
        // Filtrado por nombre (Query String)
        if (req.query.name) {
            const filteredMedicines = medicines.filter(medicine => 
                medicine.name.toLowerCase().includes(req.query.name.toLowerCase())
            );
            return res.json(filteredMedicines);
        }

        // Paginación (Query String)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const result = {
            data: medicines.slice(startIndex, endIndex),
            total: medicines.length,
            page,
            totalPages: Math.ceil(medicines.length / limit)
        };

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// GET /api/medicines/:id - Obtener Medicine por ID
const getMedicineById = (req, res) => {
    try {
        const medicine = medicines.find(m => m.id === parseInt(req.params.id));
        if (!medicine) {
            return res.status(404).json({ error: 'Medicine no encontrado' });
        }
        res.json(medicine);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// POST /api/medicines - Crear nuevo Medicine
const createMedicine = (req, res) => {
    try {
        const { name, manufacturer, dosage, price, stock } = req.body;

        // Validación de campos requeridos
        if (!name || !manufacturer || !dosage || !price || !stock) {
            return res.status(400).json({ 
                error: 'Todos los campos son requeridos: name, manufacturer, dosage, price, stock' 
            });
        }

        const newMedicine = {
            id: medicines.length + 1,
            name,
            manufacturer,
            dosage,
            price: parseFloat(price),
            stock: parseInt(stock)
        };

        medicines.push(newMedicine);
        res.status(201).json(newMedicine);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// PUT /api/medicines/:id - Actualizar Medicine
const updateMedicine = (req, res) => {
    try {
        const medicineIndex = medicines.findIndex(m => m.id === parseInt(req.params.id));
        if (medicineIndex === -1) {
            return res.status(404).json({ error: 'Medicine no encontrado' });
        }

        const { name, manufacturer, dosage, price, stock } = req.body;
        const updatedMedicine = {
            ...medicines[medicineIndex],
            ...(name && { name }),
            ...(manufacturer && { manufacturer }),
            ...(dosage && { dosage }),
            ...(price && { price: parseFloat(price) }),
            ...(stock && { stock: parseInt(stock) })
        };

        medicines[medicineIndex] = updatedMedicine;
        res.json(updatedMedicine);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// DELETE /api/medicines/:id - Eliminar Medicine
const deleteMedicine = (req, res) => {
    try {
        const medicineIndex = medicines.findIndex(m => m.id === parseInt(req.params.id));
        if (medicineIndex === -1) {
            return res.status(404).json({ error: 'Medicine no encontrado' });
        }

        const deletedMedicine = medicines.splice(medicineIndex, 1)[0];
        res.json({ message: 'Medicine eliminado correctamente', deletedMedicine });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getAllMedicines,
    getMedicineById,
    createMedicine,
    updateMedicine,
    deleteMedicine
};