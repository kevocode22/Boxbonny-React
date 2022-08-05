const Pack = require('../models/pack')

const packsControllers = {
	getPacks: async(req,res)=>{
		let packs
		let error = null
		try {
			packs = await Pack.find().populate("experiencias")
		} catch (err) {error = err
		console.error(error)}
		res.json({
			response: error ? 'ERROR' : {packs},
			success: error ? false : true,
			error: error
		})
	},

	getOnePack: async(req,res)=>{
		const id = req.params.id
		let pack
		let error = null
		try {
			pack = await Pack.findOne({_id: id}).populate("experiencias")
		}catch (err) {
			error = err
			console.error(error)
		}
		res.json({
			response: error ? 'ERROR' : pack,
			success: error ? false : true,
			error: error
		})

	},
	
	addPack: async(req,res)=>{
		const {nombre,precio,descripcion,imagen} = req.body.data
		let pack
		let error = null
		try{
			pack = await new Pack({
				nombre:nombre,
				precio:precio,
				descripcion:descripcion,
				imagen:imagen,
			}).save()
		}catch(err){error = err}
		res.json({
			response: error ? 'ERROR' : pack,
			success: error ? false : true,
			error: error
		})

	},
	modifyPack: async(req,res)=>{
		const id = req.params.id
		const pack = req.body.data
		let packdb
		let error = null
		try{
			packdb = await Pack.findOneAndUpdate({_id:id},pack,{new: true})
		}catch(err){error = err}
		res.json({
			response: error ? 'ERROR' : packdb,
			success: error ? false : true,
			error: error
		})
	},
	removePack: async(req,res)=>{
		const id = req.params.id
		let pack
		let error = null
		try{
			pack = await Pack.findOneAndDelete({_id: id})
		}catch (err) {error = err}
		res.json({
			response: error ? 'ERROR' : pack,
			success: error ? false : true,
			error: error
		})

	}

}
module.exports = packsControllers