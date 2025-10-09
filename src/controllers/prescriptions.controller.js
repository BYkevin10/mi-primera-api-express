const { prescriptions, medicines } = require('../data/medicinesData');

// GET /api/prescriptions - Listar todos los prescriptions
const getAllPrescriptions = (req, res) => {
    try {
        res.json(prescriptions);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// GET /api/prescriptions/:id - Obtener Prescription por ID
const getPrescriptionById = (req, res) => {
    try {
        const prescription = prescriptions.find(p => p.id === parseInt(req.params.id));
        if (!prescription) {
            return res.status(404).json({ error: 'Prescription no encontrada' });
        }
        res.json(prescription);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// POST /api/prescriptions - Crear nuevo Prescription
const createPrescription = (req, res) => {
    try {
        const { patientName, medicineId, dosage, instructions } = req.body;

        // Validación de campos requeridos
        if (!patientName || !medicineId || !dosage || !instructions) {
            return res.status(400).json({ 
                error: 'Todos los campos son requeridos: patientName, medicineId, dosage, instructions' 
            });
        }

        // Validar que el medicineId existe
        const medicineExists = medicines.find(m => m.id === parseInt(medicineId));
        if (!medicineExists) {
            return res.status(400).json({ error: 'El medicineId especificado no existe' });
        }

        const newPrescription = {
            id: prescriptions.length + 1,
            patientName,
            medicineId: parseInt(medicineId),
            dosage,
            instructions
        };

        prescriptions.push(newPrescription);
        res.status(201).json(newPrescription);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// PUT /api/prescriptions/:id - Actualizar Prescription
const updatePrescription = (req, res) => {
    try {
        const prescriptionIndex = prescriptions.findIndex(p => p.id === parseInt(req.params.id));
        if (prescriptionIndex === -1) {
            return res.status(404).json({ error: 'Prescription no encontrada' });
        }

        const { patientName, medicineId, dosage, instructions } = req.body;

        // Validar que el medicineId existe si se está actualizando
        if (medicineId) {
            const medicineExists = medicines.find(m => m.id === parseInt(medicineId));
            if (!medicineExists) {
                return res.status(400).json({ error: 'El medicineId especificado no existe' });
            }
        }

        const updatedPrescription = {
            ...prescriptions[prescriptionIndex],
            ...(patientName && { patientName }),
            ...(medicineId && { medicineId: parseInt(medicineId) }),
            ...(dosage && { dosage }),
            ...(instructions && { instructions })
        };

        prescriptions[prescriptionIndex] = updatedPrescription;
        res.json(updatedPrescription);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// DELETE /api/prescriptions/:id - Eliminar Prescription
const deletePrescription = (req, res) => {
    try {
        const prescriptionIndex = prescriptions.findIndex(p => p.id === parseInt(req.params.id));
        if (prescriptionIndex === -1) {
            return res.status(404).json({ error: 'Prescription no encontrada' });
        }

        const deletedPrescription = prescriptions.splice(prescriptionIndex, 1)[0];
        res.json({ message: 'Prescription eliminada correctamente', deletedPrescription });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getAllPrescriptions,
    getPrescriptionById,
    createPrescription,
    updatePrescription,
    deletePrescription
};