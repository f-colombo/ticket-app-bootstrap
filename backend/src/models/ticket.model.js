const sql = require('./../db');

// Constructor
const Ticket = function (ticket) {
    this.id = ticket.id;
    this.id_usuario = ticket.id_usuario;
    this.descripcion = ticket.descripcion;
    this.pedido = ticket.pedido;
    this.activo = ticket.activo;
    this.creado = ticket.creado;
    this.nombre_usuario = ticket.nombre_usuario;
};

Ticket.getAll = result => {
    sql.query(
        'SELECT A.*, B.nombre AS nombre_usuario FROM ticket A INNER JOIN usuario B ON B.id = A.id_usuario',
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);
                return;
            }

            console.log('Tickets: ', res);
            result(null, res);
        }
    );
};

Ticket.getById = (id, result) => {
    sql.query(
        `SELECT A.*, B.nombre AS nombre_usuario FROM ticket A INNER JOIN usuario B ON B.id = A.id_usuario WHERE A.id = ${id}`,
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);
                return;
            }

            if (res.length) {
                console.log('Encontrado Ticket: ', res[0]);
                result(null, res[0]);
                return;
            }

            // No encuentra Ticket con Id
            result({ kind: 'not_found' }, null);
        }
    );
};

Ticket.create = (newTicket, result) => {
    sql.query(
        'INSERT INTO ticket SET id = NULL, id_usuario = ?, descripcion = ?, pedido = ?, activo = ?, creado = ?',
        [newTicket.id_usuario, newTicket.descripcion, newTicket.pedido, newTicket.activo, newTicket.creado],
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
                return;
            }

            newTicket.id = res.insertId;
            console.log('Ticket creado: ',
                { ...newTicket });
            result(null, { ...newTicket });
        }
    );
};

Ticket.updateById = (id, updTicket, result) => {
    sql.query(
        'UPDATE ticket SET id_usuario = ?, descripcion = ?, pedido = ?, activo = ? WHERE id =?',
        [updTicket.id_usuario, updTicket.descripcion, updTicket.pedido, updTicket.activo, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // no encontrado Ticket con ese Id
                result({ kind: 'not_found' }, null);
                return;
            }

            console.log('Ticket actualizado: ', { id: id, ...updTicket });
            result(null, { id: id, ...updTicket });
        }
    );
};

Ticket.removeById = (id, result) => {
    sql.query(
        'DELETE FROM ticket WHERE id =?', id,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // no encontrado Ticket con ese Id
                result({ kind: 'not_found' }, null);
                return;
            }

            console.log('Ticket eliminado: ', id);
            result(null, res);
        }
    );
};

Ticket.removeAll = result => {
    sql.query(
        'DELETE FROM ticket',
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log('Tickets eliminados: ', res.affectedRows);
            result(null, res);
        }
    );
};

module.exports = Ticket;
