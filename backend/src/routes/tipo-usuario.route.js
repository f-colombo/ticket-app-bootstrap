module.exports = app => {

    const tipoUsuarioController = require('./../controllers/tipo-usuario.controller');

    // Obtener todos Tipos Usuario
    app.get('/user/type', tipoUsuarioController.getAll);

    // Obtener Tipo Usuario con Id
    app.get('/user/type/:id', tipoUsuarioController.getById);

    // Crear Tipo Usuario
    app.post('/user/type', tipoUsuarioController.create);

};