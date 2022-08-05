const passport = require('passport') 
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt

const Usuario = require('../models/usuario')

module.exports = passport.use(
    new jwtStrategy(
        {jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_KEY},
         (jwt_payload,done) => {
            // console.log(jwt_payload);
           Usuario.findOne({_id:jwt_payload.id})
            .then ( Usuario => {
                if (Usuario) {
                    return done(null, Usuario)
                } 
             
                else {
                    return done(null, false)
                }
            }
            )
            .catch(error => {
                console.log(error)
                return done(error,false)   
            })
         }
) )
