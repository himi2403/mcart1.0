const JWT = require('jsonwebtoken')
const errors = require('../errors');
require('dotenv').config()
const merchantmodel = require("../models/merchant")
const productModel = require("../models/productschema")

module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
            }//token
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options = {
                expiresIn: "1y",
                issuer: "mCart.com",
                audience: userId.toString()
            }
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    reject(errors.internalError);
                } else {
                    resolve(token);
                }
            })
        })
    },

    verifyAccessToken: (req, res, next) => {
        const jwtToken = req.headers['authorization'] || req.headers['Authorization'];
        // console.log(jwtToken)
        if (!jwtToken) {
            return next(errors.tokenUbsentError);
        }
        JWT.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
            if (err) {
                return next(errors.unAuthorizedUserError);
            } else {
                console.log("lkshdlsalh",payload)
                req.userId = payload.aud;
                let userData = await merchantmodel.findById(req.userId);
                // let userdataProduct = await  productModel.findById()
                // if (userData.isActive !== true) {
                //     return next(errors.userDeactivatedError)
                // }
                return next(null, userData);
            }
        })
    }
// verifyAccessToken: (req, res, next) => {
//     if (!req.headers['authorization']) return next(createError.Unauthorized())
//     const authHeader = req.headers['authorization']
//     const bearerToken = authHeader.split(' ')
//     const token = bearerToken[1]
//     JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
//       if (err) {
//         const message =
//           err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
//         return next(createError.Unauthorized(message))
//       }
//       req.payload = payload
//       next()
//     })
//   },
}
