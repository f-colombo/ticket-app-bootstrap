const usuarioModel = require('./../models/usuario.model');

// Obtener todos los Usuarios
exports.getAll = (req, res) => {
    usuarioModel.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || 'Error obteniendo los Usuarios!'
            });
        else
            res.send(data);
    });
};

// Obtener Usuario por Id
exports.getById = (req, res) => {
    usuarioModel.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `No encontrado Usuario con Id: ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: 'Error obteniendo Usuario con Id: ' + req.params.id
                });
            }
        } else
            res.send(data);
    });
};

// Crear nuevo Usuario
exports.create = (req, res) => {
    // Validar request
    if (!req.body) {
        res.status(400).send({ message: 'Contenido no puede estar vacio!' });
    }

    // Crear Model Usuario
    const Usuario = new usuarioModel({
        // id: req.body.id,
        id_tipo: req.body.id_tipo,
        nombre: req.body.nombre,
        email: req.body.email,
        pass: req.body.pass,
        activo: true,
        creado: new Date()
    });

    // Guardar en DB
    usuarioModel.create(Usuario, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || 'Ha ocurrido un error al crear: Usuario!'
            });
        else
            res.send(data);
    });
};

// LogIn Usuario
exports.logIn = (req, res) => {
    // Validar request
    if (!req.body) {
        res.status(400).send({ message: 'Contenido no puede estar vacio!' });
    }

    // Crear Model Usuario
    const Usuario = new usuarioModel({
        // id: req.body.id,
        // id_tipo: req.body.id_tipo,
        // nombre: req.body.nombre,
        email: req.body.email,
        pass: req.body.pass,
        // activo: req.body.activo,
        // creado: req.body.creado
    });

    usuarioModel.logIn(Usuario, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `No encontrado Usuario: ${Usuario.email}.`
                });
            } else {
                res.status(500).send({
                    message: 'Error LogIn Usuario: ' + Usuario.email
                });
            }
        } else
            res.send(data);
    });
};
