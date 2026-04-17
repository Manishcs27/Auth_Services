const validateUserAuth = (req, res, next) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            success: false,
            data:{},
            message: "Email and password are required",
            err : "Email or password not found in the request body"
        });
    }
    next();
};

module.exports = {
    validateUserAuth
}