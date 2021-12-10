const expressJwt = require('express-jwt');
const config = require('../config')

function authJwt(){
    const secret =config.SECRET;

    return expressJwt({
        secret,
        algorithms: ['HS256'],
    }).unless({
        path:[
            `/token`
            
        ]
    })
}

module.exports = authJwt;