function errorHandler(err, req, res, next){
    if( err.name === 'UnauthorizedError'){
        return res.status(401).json({
            success: false,
            message: "L'utilisateur n'est pas authentique !"
        })
    }
    
    return res.status(500).json({
        success: false,
        message: err
    })
}

module.exports = errorHandler;