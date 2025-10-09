// Datos iniciales para medicines
let medicines = [
    {
        id: 1,
        name: 'Paracetamol',
        manufacturer: 'Genfar',
        dosage: '500mg',
        price: 15.50,
        stock: 100
    },
    {
        id: 2,
        name: 'Amoxicilina',
        manufacturer: 'Bayer',
        dosage: '250mg',
        price: 45.80,
        stock: 50
    },
    {
        id: 3,
        name: 'Ibuprofeno',
        manufacturer: 'Pfizer',
        dosage: '400mg',
        price: 22.30,
        stock: 75
    }
];

// Datos iniciales para prescriptions
let prescriptions = [
    {
        id: 1,
        patientName: 'Juan Pérez',
        medicineId: 1,
        dosage: '1 tableta cada 8 horas',
        instructions: 'Tomar después de los alimentos'
    },
    {
        id: 2,
        patientName: 'María García',
        medicineId: 2,
        dosage: '1 cápsula cada 12 horas',
        instructions: 'Completar el tratamiento de 7 días'
    }
];

// Datos iniciales para sales
let sales = [
    {
        id: 1,
        medicineId: 1,
        quantity: 2,
        prescriptionId: 1,
        date: '2025-10-09'
    },
    {
        id: 2,
        medicineId: 3,
        quantity: 1,
        prescriptionId: null,
        date: '2025-10-09'
    }
];

module.exports = {
    medicines,
    prescriptions,
    sales
};