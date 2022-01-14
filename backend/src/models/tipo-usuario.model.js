const sql = require('./../db');

// Constructor
const TipoUsuario = function (tipoUsuario) {
    this.id = tipoUsuario.id;
    this.nombre = tipoUsuario.nombre;
    this.activo = tipoUsuario.activo;
    this.creado = tipoUsuario.creado;
};

TipoUsuario.getAll = result => {
    sql.query(
        'SELECT * FROM tipo_usuario',
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);
                return;
            }

            console.log('Tipos de Usuario: ', res);
            result(null, res);
        }
    );
};

TipoUsuario.getById = (id, result) => {
    sql.query(
        `SELECT * FROM tipo_usuario WHERE id = ${id}`,
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);
                return;
            }

            if (res.length) {
                console.log('Encontrado Tipo Usuario: ', res[0]);
                result(null, res[0]);
                return;
            }

            // No encuentra Tipo Usuario con Id
            result({ kind: 'not_found' }, null);
        }
    );
};

TipoUsuario.create = (newTipoUsuario, result) => {
    sql.query(
        'INSERT INTO tipo_usuario SET ?',
        newTipoUsuario,
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
                return;
            }

            newTipoUsuario.id = res.insertId;
            console.log('Tipo Usuario creado: ',
                { ...newTipoUsuario });
            result(null, { ...newTipoUsuario });
        }
    );
};

module.exports = TipoUsuario;