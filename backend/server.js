// Framework
const express = require('express');
// Middleware
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Puerto para servidor
const PORT = 4001;

// Crear App Express
const app = express();
// Implementar middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(cookieParser());

// Parse request of content-type: application/json
app.use(bodyParser.json());

// Parse request of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a Ticket-App.' });
});

// Rutas para: Tipo Usuario
require('./src/routes/tipo-usuario.route')(app);

// Rutas para: Usuario
require('./src/routes/usuario.route')(app);

// Rutas para: Ticket
require('./src/routes/ticket.route')(app);

// Establece puerto para recibir requests
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});