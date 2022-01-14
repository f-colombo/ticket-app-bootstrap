module.exports = app => {

    const ticketController = require('./../controllers/ticket.controller');

    // Obtener todos Tickets
    app.get('/ticket', ticketController.getAll);

    // Obtener Ticket con Id
    app.get('/ticket/:id', ticketController.getById);

    // Crear Ticket
    app.post('/ticket', ticketController.create);

    // Actualizar Ticket
    app.put("/ticket/:id", ticketController.updateById);

    // Remover Ticket con Id
    app.delete("/ticket/:id", ticketController.removeById);

    // Remover Tickets
    app.delete("/ticket", ticketController.removeAll);

};