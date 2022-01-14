const tipoUsuarioModel = require('./../models/tipo-usuario.model');

// Obtener todos los TipoUsuario
exports.getAll = (req, res) => {
    tipoUsuarioModel.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || 'Error obteniendo los Tipos Usuario!'
            });
        else
            res.send(data);
    });
};

// Obtener Tipo Usuario por Id
exports.getById = (req, res) => {
    tipoUsuarioModel.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `No encontrado Tipo Usuario con Id: ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: 'Error obteniendo Tipo Usuario con Id: ' + req.params.id
                });
            }
        } else
            res.send(data);
    });
};

// Crear nuevo TipoUsuario
exports.create = (req, res) => {
    // Validar request
    if (!req.body) {
        res.status(400).send({ message: 'Contenido no puede estar vacio!' });
    }

    // Crear Model TipoUsuario
    const tipoUsuario = new tipoUsuarioModel({
        id: req.body.id,
        nombre: req.body.nombre,
        // activo: req.body.activo,
        // creado: req.body.creado
    });

    // Guardar en DB
    tipoUsuarioModel.create(tipoUsuario, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || 'Ha ocurrido un error al crear: Tipo Usuario!'
            });
        else
            res.send(data);
    });
};
