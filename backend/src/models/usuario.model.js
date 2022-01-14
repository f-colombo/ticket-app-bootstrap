const sql = require('./../db');

// Constructor
const Usuario = function (usuario) {
    this.id = usuario.id;
    this.id_tipo = usuario.id_tipo;
    this.nombre = usuario.nombre;
    this.email = usuario.email;
    this.pass = usuario.pass;
    this.activo = usuario.activo;
    this.creado = usuario.creado;
};

Usuario.getAll = result => {
    sql.query(
        'SELECT * FROM usuario',
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);
                return;
            }

            console.log('Usuarios: ', res);
            result(null, res);
        }
    );
};

Usuario.getById = (id, result) => {
    sql.query(
        `SELECT * FROM usuario WHERE id = ${id}`,
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);
                return;
            }

            if (res.length) {
                console.log('Encontrado Usuario: ', res[0]);
                result(null, res[0]);
                return;
            }

            // No encuentra Usuario con Id
            result({ kind: 'not_found' }, null);
        }
    );
};

Usuario.create = (newUsuario, result) => {
    sql.query(
        'INSERT INTO usuario SET ?',
        newUsuario,
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
                return;
            }

            newUsuario.id = res.insertId;
            console.log('Usuario creado: ',
                { ...newUsuario });
            result(null, { ...newUsuario });
        }
    );
};

Usuario.logIn = (accUsuario, result) => {
    sql.query(
        `SELECT * FROM usuario
        WHERE email = '${accUsuario.email}'
        AND pass = '${accUsuario.pass}'
        AND activo = 1`,
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);
                return;
            }

            if (res.length) {
                console.log('Encontrado Usuario: ', res[0]);
                result(null, res[0]);
                return;
            }

            // No encuentra Usuario con Id
            result({ kind: 'not_found' }, null);
        }
    );
};

module.exports = Usuario;
