var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usuario = mongoose.model('Usuario');
var prendas = mongoose.model('Prendas');


var orden = new Schema({
	fechaIngreso: {
		type: Date,
		default: Date.now
	},
	idorden: Number,
	usuario: { type: Schema.ObjectId, ref: "Usuario" },
	prendas: [prendas]
});

module.exports = mongoose.model('Orden', orden);