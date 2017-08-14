var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Images = new Schema({
	img: {
		type: String,
		enum: ['miniatura','detalle'],
		required: true
	},
	url: { type: String, required: true}
});

var prendas = new Schema({
	nombre: {type: String, required: true},
	modelo: {
		type: String,
		enum: ['Vestido','Falda','Body','Pantalón','Blusa','Camiseta']
	},
	descripcion: String,
	codigo: {type: String, required: true},
	marca: {type: String, required: true},
	costurera: String,
	precio: {type: Number, required: true},
	descuento: {type: Number, required: true},
	color: {
		type: String,
		enum: ['Rojo','Azul','Amarillo','Verde','Blanco','Negro']
	},
	talla: {
		type: String,
		enum: ['XXL','XL','L','M','S','XS'],
		required: true
	},
	cantStock: Number,
	cantVendidas: Number,
	img: [Images],
	modificado: {type: Date, default: Date.now}
});

prendas.path('nombre').validate(function (v){
	return ((v != "") && (v != null));
});

module.exports = mongoose.model('Prendas', prendas);