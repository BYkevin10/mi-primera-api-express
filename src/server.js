const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Importar rutas
const medicinesRoutes = require('./routes/medicines.routes');
const prescriptionsRoutes = require('./routes/prescriptions.routes');
const salesRoutes = require('./routes/sales.routes');

// Usar rutas
app.use('/api/medicines', medicinesRoutes);
app.use('/api/prescriptions', prescriptionsRoutes);
app.use('/api/sales', salesRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.json({ 
        message: 'API de Farmacia - Práctica 4 - KEVIN STIVEN PINTO AMAYA',
        endpoints: {
            medicines: '/api/medicines',
            prescriptions: '/api/prescriptions', 
            sales: '/api/sales'
        },
        features: {
            filtering: 'GET /api/medicines?name=paracetamol',
            pagination: 'GET /api/medicines?page=1&limit=2'
        }
    });
});

// Manejo de rutas no encontradas - CORREGIDO para Express 4
app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor de Farmacia ejecutándose en http://localhost:${PORT}`);
    console.log(`📋 Endpoints disponibles:`);
    console.log(`   • Medicines: http://localhost:${PORT}/api/medicines`);
    console.log(`   • Prescriptions: http://localhost:${PORT}/api/prescriptions`);
    console.log(`   • Sales: http://localhost:${PORT}/api/sales`);
    console.log(`\n💊 Dominio: FARMACIA - Desarrollado por: KEVIN STIVEN PINTO AMAYA`);
});