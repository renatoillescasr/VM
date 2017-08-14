module.exports = function(app) {
  var Usuarios = require('../models/usuariosModel.js'); 
  //GET - Retorna todos los usuarios de la DB
  findAllUsers = function(req, res) {
    console.log("GET - /users");
    return Usuarios.find(function(err, users) {
      if(!err) {
        return res.send(users);
      } else {
        res.statusCode = 500;
        console.log('Error interno (%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Error de servidor' });
      }
    });
  }; 
  //GET - Retorna un usuario con ID específico
  findById = function(req, res) {
    console.log("GET - /user/:id");
    return Usuarios.findById(req.params.id, function(err, user) {
      if(!user) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      if(!err) {
        return res.send({ status: 'OK', user:user });
      } else {
        res.statusCode = 500;
        console.log('Error interno(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Error de servidor' });
      }
    });
  }; 
  //POST - Agrega un nuevo usuario a la DB
  addUser = function(req, res) {
    console.log('POST - /user');
    console.log(req.body);

    var user = new Usuarios({
      idusuario:    req.body.idusuario,
      nombre :  req.body.nombre, 
      edad:    req.body.edad,
      email :    req.body.email, 
      direccion:   req.body.direccion, 
      celular:    req.body.celular, 
    });

    user.save(function(err) {
      if(!err) {
        console.log("Usuario creado");
        return res.send({ status: 'OK', user:user });
      } else {
        console.log(err);
        if(err.name == 'Error de Validación') {
          res.statusCode = 400;
          res.send({ error: 'Error de Validación' });
        } else {
          res.statusCode = 500;
          res.send({ error: 'Error de servidor' });
        }
        console.log('Error interno(%d): %s',res.statusCode,err.message);
      }
    });

    res.send(prenda);
  }; 
  //PUT - Actualiza un registro previo de un usuario con ID específico
  updateUser = function(req, res) {
    console.log("PUT - /user/:id");
    console.log(req.body);
    return Usuarios.findById(req.params.id, function(err, user) {
      if(!user) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if (req.body.idusuario != null) user.idusuario = req.body.idusuario;
      if (req.body.nombre != null) user.nombre = req.body.nombre;
      if (req.body.edad != null) user.edad = req.body.edad; 
      if (req.body.email != null) user.email = req.body.email;
      if (req.body.direccion != null) user.direccion  = req.body.direccion;
      if (req.body.celular != null) user.celular = req.body.celular;

      return user.save(function(err) {
        if(!err) {
          console.log('Usuario Actualizado');
          return res.send({ status: 'OK', user:user });
        } else {
          if(err.name == 'Error de Validación') {
            res.statusCode = 400;
            res.send({ error: 'Error de Validación' });
          } else {
            res.statusCode = 500;
            res.send({ error: 'Error de servidor' });
          }
          console.log('Error interno(%d): %s',res.statusCode,err.message);
        }

        res.send(user);
      });
    });
  }; 
  //DELETE - Borra un usuario con ID específico
  deleteUser = function(req, res) {
    console.log("DELETE - /user/:id");
    return Usuarios.findById(req.params.id, function(err, user) {
      if(!user) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      return user.remove(function(err) {
        if(!err) {
          console.log('Usuario eliminado');
          return res.send({ status: 'OK' });
        } else {
          res.statusCode = 500;
          console.log('Error interno(%d): %s',res.statusCode,err.message);
          return res.send({ error: 'Error de servidor' });
        }
      })
    });
  }; 
  //Link de rutas y funciones
  app.get('/users', findAllUsers);
  app.get('/user/:id', findById);
  app.post('/user', addUser);
  app.put('/user/:id', updateUser);
  app.delete('/user/:id', deleteUser);
}