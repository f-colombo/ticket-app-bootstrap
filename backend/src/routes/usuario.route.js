module.exports = app => {

    const usuarioController = require('./../controllers/usuario.controller');

    // Obtener todos Usuarios
    app.get('/user', usuarioController.getAll);

    // Obtener Usuario con Id
    app.get('/user/:id', usuarioController.getById);

    // Crear Usuario
    app.post('/user', usuarioController.create);

    // LogIn Usuario
    app.post('/user/login', usuarioController.logIn);

};