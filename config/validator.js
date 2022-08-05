const joi = require('joi');

const validator = (req, res, next) => {
    const schema = joi.object({
        nombre: joi.string()
            .min(3)
            .max(30)
            .trim()
            .pattern(new RegExp('[a-zA-Z]'))
            .required()
            .messages({
                'string.min': 'nombre: min 3 characters',
                'string.max': 'nombre: max 30 characters',
            }),
				apellido: joi.string()
            .min(3)
            .max(30)
            .trim()
            .pattern(new RegExp('[a-zA-Z]'))
            .required()
            .messages({
                'string.min': 'apellido: min 3 characters',
                'string.max': 'apellido: max 30 characters',
            }),
        email: joi.string()
            .email({ minDomainSegments: 2 })
            .required()
            .messages({
                'string.email': '"email": incorrect form'
            }),
        contraseña: joi.string()
            .min(8)
            .max(40)
            .pattern(new RegExp('[a-zA-Z0-9]'))
            .required()
            .messages({
                'string.min': '"contraseña": min 8 characters',
                'string.max': '"contraseña": max 30 characters'
            }),
        imagen: joi.string()
            .min(4)
            .trim()
            .required(),
        from: joi.string()

    })
    const validation = schema.validate(req.body.data, { abortEarly: false })
    if (validation.error) {
        return res.json({ success: false, from: 'validator', message: validation.error.details, test: validation })
    }
    next()
}
module.exports = validator