# API de Farmacia - Express.js

API RESTful para la gestión de una farmacia, implementada con Express.js. Este proyecto forma parte de la Práctica 4 enfocada en Routing Avanzado.

## 🚀 Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **pnpm** - Gestor de paquetes
- **nodemon** - Herramienta de desarrollo para auto-reinicio

## 📋 Requisitos Previos

- Node.js (versión recomendada: 18 o superior)
- pnpm (versión 10.18.1 o superior)

## ⚙️ Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/BYkevin10/mi-primera-api-express.git
cd mi-primera-api-express
```

2. Instalar dependencias:
```bash
pnpm install
```

## 🖥️ Ejecución

Para desarrollo (con auto-reinicio):
```bash
pnpm dev
```

Para producción:
```bash
pnpm start
```

El servidor se iniciará en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
mi-primera-api-express/
├── src/
│   ├── server.js            # Punto de entrada de la aplicación
│   ├── controllers/         # Lógica de negocio
│   │   ├── medicines.controller.js
│   │   ├── prescriptions.controller.js
│   │   └── sales.controller.js
│   ├── routes/             # Definición de rutas
│   │   ├── medicines.routes.js
│   │   ├── prescriptions.routes.js
│   │   └── sales.routes.js
│   ├── data/               # Datos mock
│   │   └── medicinesData.js
│   └── docs/               # Documentación
│       └── postman/        # Colección de Postman
│           └── Farmacia API - Práctica 4.postman_collection.json
├── package.json
├── pnpm-lock.yaml          # Lock file de dependencias
└── README.md
```

## 🛣️ Endpoints

### Medicamentos (Medicines)

- `GET /api/medicines` - Listar todos los medicamentos
  - Soporta filtrado: `/api/medicines?name=paracetamol`
  - Soporta paginación: `/api/medicines?page=1&limit=10`
- `GET /api/medicines/:id` - Obtener medicamento por ID
- `POST /api/medicines` - Crear nuevo medicamento
- `PUT /api/medicines/:id` - Actualizar medicamento
- `DELETE /api/medicines/:id` - Eliminar medicamento

### Prescripciones (Prescriptions)

- `GET /api/prescriptions` - Listar todas las prescripciones
- `GET /api/prescriptions/:id` - Obtener prescripción por ID
- `POST /api/prescriptions` - Crear nueva prescripción
- `PUT /api/prescriptions/:id` - Actualizar prescripción
- `DELETE /api/prescriptions/:id` - Eliminar prescripción

### Ventas (Sales)

- `GET /api/sales` - Listar todas las ventas
- `GET /api/sales/:id` - Obtener venta por ID
- `POST /api/sales` - Crear nueva venta
- `PUT /api/sales/:id` - Actualizar venta
- `DELETE /api/sales/:id` - Eliminar venta

## ✅ Validaciones Implementadas

1. **Validación de Campos Requeridos**
   - En la creación de medicamentos: name, manufacturer, dosage, price, stock
   - Validación de tipos de datos (números para price y stock)

2. **Manejo de Códigos de Estado HTTP**
   - **Respuestas Exitosas**:
     - 200 (OK) para operaciones exitosas de lectura y actualización
     - 201 (Created) para creación exitosa de nuevos recursos
   - **Respuestas de Error**:
     - 400 (Bad Request) para datos inválidos o campos faltantes
     - 404 (Not Found) para recursos no encontrados
     - 500 (Internal Server Error) para errores internos del servidor

3. **Filtrado y Paginación**
   - Filtrado por nombre en medicamentos
   - Paginación configurable con parámetros page y limit

## 📚 Prácticas Realizadas

1. **Práctica 4 - Routing Avanzado**
   - Implementación de rutas modulares
   - Middleware para parseo de JSON
   - Manejo de errores centralizado
   - Filtrado y paginación
   - Estructura de proyecto organizada

## 👤 Autor

KEVIN STIVEN PINTO AMAYA

