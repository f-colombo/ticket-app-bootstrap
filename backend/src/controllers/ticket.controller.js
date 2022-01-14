const ticketModel = require('./../models/ticket.model');

// Obtener todos los Tickets
exports.getAll = (req, res) => {
    ticketModel.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || 'Error obteniendo los Tickets!'
            });
        else
            res.send(data);
    });
};

// Obtener Ticket por Id
exports.getById = (req, res) => {
    ticketModel.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `No encontrado Ticket con Id: ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: 'Error obteniendo Ticket con Id: ' + req.params.id
                });
            }
        } else
            res.send(data);
    });
};

// Crear Ticket
exports.create = (req, res) => {
    // Validar request
    if (!req.body) {
        res.status(400).send({ message: 'Contenido no puede estar vacio!' });
    }

    // Crear Model Ticket
    const Ticket = new ticketModel({
        // id: req.body.id,
        id_usuario: req.body.id_usuario,
        descripcion: req.body.descripcion,
        pedido: false,
        activo: true,
        creado: new Date()
    });

    // Guardar en DB
    ticketModel.create(Ticket, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || 'Ha ocurrido un error al crear: Ticket!'
            });
        else
            res.send(data);
    });
};

// Actualizar Ticket
exports.updateById = (req, res) => {
    // Validar request
    if (!req.body) {
        res.status(400).send({ message: 'Contenido no puede estar vacio!' });
    }

    // Crear Model Ticket
    // const updTicket = new ticketModel(req.body);
    const updTicket = new ticketModel({
        id: Number(req.params.id),
        id_usuario: req.body.id_usuario,
        descripcion: req.body.descripcion,
        pedido: req.body.pedido,
        activo: req.body.activo,
        creado: new Date()
    });
    
    ticketModel.updateById(req.params.id, updTicket,
        (err, data) => {
            if (err) {
                if (err.kind === 'not_found') {
                    res.status(404).send({
                        message: `No encontrado Ticket con Id: ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: 'Error actualizando Ticket con Id: ' + req.params.id
                    });
                }
            } else
                res.send(data);
        });
};

// Remover Ticket
exports.removeById = (req, res) => {
    ticketModel.removeById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `No encontrado Ticket con Id: ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: 'Error removiendo Ticket con Id: ' + req.params.id
                });
            }
        } else
            res.send({ message: 'Ticket eliminado exitosamente!' });
    });
};

// Remover Tickets
exports.removeAll = (req, res) => {
    ticketModel.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Error removiendo Tickets."
        });
      else res.send({ message: `Tickets eliminados exitosamente!` });
    });
  };
