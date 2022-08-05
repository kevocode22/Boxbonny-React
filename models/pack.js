const mongoose = require('mongoose');

const packSchema = new mongoose.Schema({
	nombre: {type: String, required: true},
	precio: {type: Number, required: true},
	descripcion: {type: String, required: true},
	imagen: {type: String, required: true},
	experiencias: [{type: mongoose.Types.ObjectId, ref:"experiencias"}]

})

const Pack = mongoose.model('packs', packSchema)
module.exports = Pack