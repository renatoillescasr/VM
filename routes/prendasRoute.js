module.exports = function(app) {
  var Prendas = require('../models/prendasModel.js'); 
  //GET - Retorna todas las prendas de la DB
  findAllPrendas = function(req, res) {
    console.log("GET - /prendas");
    return Prendas.find(function(err, prendas) {
      if(!err) {
        return res.send(prendas);
      } else {
        res.statusCode = 500;
        console.log('Error interno (%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Error de servidor' });
      }
    });
  }; 
  //GET - Retorna una prenda con ID específico
  findById = function(req, res) {
    console.log("GET - /prenda/:id");
    return Prendas.findById(req.params.id, function(err, prenda) {
      if(!prenda) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      if(!err) {
        // Send { status:OK, prenda { prenda values }}
        return res.send({ status: 'OK', prenda:prenda });
      } else {
        res.statusCode = 500;
        console.log('Error interno(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Error de servidor' });
      }
    });
  };

  //filtrar prendas por talla
  findByTalla = function(req, res){
    console.log('Petición recibida: Listar prendas por talla');
    return Prendas.find({talla: req.body.talla}, function(err, docs){
      res.json(docs);
    });
  };

  //filtrar prendas por color
  findByColor = function(req, res){
    console.log('Petición recibida: Listar prendas por color');
    return Prendas.find({color: req.body.color}, function(err,docs){
      res.json(docs);
    });
  };

  //POST - Agrega una nueva prenda a la DB
  addPrenda = function(req, res) {
    console.log('POST - /prenda');
    console.log(req.body);

    var prenda = new Prendas({
      nombre:    req.body.nombre,
      modelo :  req.body.modelo, 
      descripcion:    req.body.descripcion,
      codigo :    req.body.codigo, 
      marca:   req.body.marca, 
      costurera:    req.body.costurera,
      precio:  req.body.precio,
      descuento: req.body.descuento,
      color: req.body.color,
      talla: req.body.talla,
      cantStock: req.body.cantStock,
      cantVendidas: req.body.cantVendidas,
      img: req.body.img,
      modificado: req.body.modificado  
    });

    prenda.save(function(err) {
      if(!err) {
        console.log("Prenda creada");
        return res.send({ status: 'OK', prenda:prenda });
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
  //PUT - Actualiza un registro previo de una prenda
  updatePrenda = function(req, res) {
    console.log("PUT - /prenda/:id");
    console.log(req.body);
    return Prendas.findById(req.params.id, function(err, prenda) {
      if(!prenda) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if (req.body.nombre != null) prenda.nombre = req.body.nombre;
      if (req.body.modelo != null) prenda.modelo = req.body.modelo;
      if (req.body.descripcion != null) prenda.descripcion = req.body.descripcion; 
      if (req.body.codigo != null) prenda.codigo = req.body.codigo;
      if (req.body.marca != null) prenda.marca  = req.body.marca;
      if (req.body.costurera != null) prenda.costurera = req.body.costurera;
      if (req.body.precio != null) prenda.precio = req.body.precio;
      if (req.body.descuento != null) prenda.descuento = req.body.descuento;
      if (req.body.color != null) prenda.color = req.body.color;
      if (req.body.talla != null) prenda.talla = req.body.talla;
      if (req.body.cantStock != null) prenda.cantStock = req.body.cantStock;
      if (req.body.cantVendidas != null) prenda.cantVendidas = req.body.cantVendidas;
      if (req.body.img != null) prenda.img = req.body.img;
      if (req.body.modificado != null) prenda.modificado = req.body.modificado;

      return prenda.save(function(err) {
        if(!err) {
          console.log('Prenda Actualizada');
          return res.send({ status: 'OK', prenda:prenda });
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

        res.send(prenda);
      });
    });
  }; 
  //DELETE - Borra una prenda con ID específico
  deletePrenda = function(req, res) {
    console.log("DELETE - /prenda/:id");
    return Prendas.findById(req.params.id, function(err, prenda) {
      if(!prenda) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      return prenda.remove(function(err) {
        if(!err) {
          console.log('Prenda eliminada');
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
  app.get('/prendas', findAllPrendas);
  app.get('/prenda/:id', findById);
  app.post('/prenda', addPrenda);
  app.put('/prenda/:id', updatePrenda);
  app.delete('/prenda/:id', deletePrenda);
}