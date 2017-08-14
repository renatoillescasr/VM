var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var usuarios = new Schema({
	fechaIngreso: {
		type: Date,
		default: Date.now
	},
	idusuario:String,
	rol: String,
	username: String,
	password: String, 
	nombre: String,
	edad: Number,
	email: type: String,
	direccion: String,
	celular: {type: String, required: true},
	foto: String //opcional
});
/*usuarios.path('idusuario').validate(function(v){
	return ((v!="") && (v!=null));
});*/

module.exports = mongoose.model('Usuario', usuarios);