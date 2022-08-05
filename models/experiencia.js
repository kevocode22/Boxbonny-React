const mongoose = require('mongoose');

const experienciaSchema = new mongoose.Schema({
	nombre: {type: String, required: true},
	descripcion: {type: String, required: true},
	incluye: {type: String, required: true},
	direccion: {type: String, required: true},
	ciudad: {type: String, required: true},		
	imagen: {type: String, required: true},
	rating: {type: Array},
	comentarios: [{
		fecha: {type:Date},
		comentario: {type: String},
		rating: {type:Number},
		idUsuario: {type:mongoose.Types.ObjectId, ref:'usuarios'}
		}],
	pack: {type: mongoose.Types.ObjectId, ref:"packs"}

})

const Experiencia = mongoose.model('experiencias', experienciaSchema)
module.exports = Experiencia