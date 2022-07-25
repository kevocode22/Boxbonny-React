const Pack = require('../models/pack')
const Experiencia = require('../models/experiencia')
const crypto = require('crypto');

const experienciasControllers = {
	getExperiencias: async (req, res) => {
		let experiencias
		let error = null
		try {
			experiencias = await Experiencia.find()
		} catch (err) {
			error = err
			console.error(error)
		}
		res.json({
			response: error ? 'ERROR' : { experiencias },
			success: error ? false : true,
			error: error
		})
	},

	getOneExperiencia: async (req, res) => {
		const id = req.params.id
		let experiencia
		let error = null
		try {
			experiencia = await Experiencia.findOne({ _id: id })
			.populate("comentarios.idUsuario", {nombre:1, apellido:1, imagen:1})
		} catch (err) {
			error = err
			console.error(error)
		}
		res.json({
			response: error ? 'ERROR' : {experiencia},
			success: error ? false : true,
			error: error
		})

	},

	addExperiencia: async (req, res) => {
		console.log(req.body);
        const { nombre, descripcion, incluye, direccion, ciudad, pack } = req.body
		console.log("BUSCAR FILE",req.files);
        const  {files}  = req
		console.log("Files", files);
        let experiencia
        let error = null
        try {
            const experienciaExiste = await Experiencia.findOne({ nombre })
            if (experienciaExiste) {
                res.json({
                    success: false,
                    Message: "la experiencia que intentas agregar, ya ha sido cargada previamente"
                })
            } else {
				console.log("ACA LLEGO");
                const filename = crypto.randomBytes(10).toString('hex') + "." + files.imagen.name.split(".")[files.imagen.name.split(".").length - 1]
                console.log("DIRNAME", __dirname);
				const ruta = `${__dirname}/../client/build/media/${filename}`
				console.log("RUTAAAAA",ruta);
                files.imagen.mv(ruta, err => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("archivo cargado")
                    }
                })
                experiencia = await new Experiencia({
                    nombre: nombre,
                    descripcion: descripcion,
                    incluye: incluye,
                    direccion: direccion,
                    ciudad: ciudad,
                    imagen: "https://boxbonny-back.herokuapp.com/client/build/media/" + filename,
                    pack: pack
                }).save()
                nuevaExperiencia = await Pack.findOneAndUpdate({ _id: pack }, { $push: { experiencias: experiencia._id } }, { new: true })
                res.json({
                    success: true,
                    Message: "la experiencia se añadio exitosamente"
                })
            }
        } catch (err) {
            error = err
			console.log(err);
            res.json({
                success: false,
                Message: error

            })
        }
    },
	multiplesExperiencias: async (req, res) => {
		let experiencia = []
		const data = req.body.data
		let error = null
		try {
				data.map(async (item) => {
					const experiencia = await new Experiencia({
							nombre:item.nombre,
							descripcion:item.descripcion,
							incluye:item.incluye,
							direccion:item.direccion,
							ciudad:item.ciudad,
							imagen:item.imagen,
							pack:item.pack
						}).save()
						nuevaExperiencia = await Pack.findOneAndUpdate({_id:item.pack}, {$push: {experiencias: experiencia._id}}, {new: true})
				})
		} catch (err) { error = err }
		experiencia = await Experiencia.find()
		res.json({
				response: error ? "ERROR" : experiencia,
				success: error ? false : true,
				error: error
		})
},
	modifyExperiencia: async (req, res) => {
		const id = req.params.id
		const experiencia = req.body.data
		let experienciadb
		let error = null
		try {
			experienciadb = await Experiencia.findOneAndUpdate({ _id: id }, experiencia, { new: true })
		} catch (err) { error = err }
		res.json({
			response: error ? 'ERROR' : experienciadb,
			success: error ? false : true,
			error: error
		})
	},
	removeExperiencia: async (req, res) => {
		const id = req.params.id
		let experiencia
		let error = null
		try {
			experiencia = await Experiencia.findOneAndDelete({ _id: id })
			quitarExperiencia = await Pack.findOneAndUpdate({ _id: experiencia.pack }, { $pull: { experiencias: experiencia._id } }, { new: true })

		} catch (err) { error = err }
		res.json({
			response: error ? 'ERROR' : experiencia,
			success: error ? false : true,
			error: error
		})

	},
	


}




module.exports = experienciasControllers