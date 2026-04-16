const UserService= require('../services/user-service')

 const userService = new UserService();

const create = async (req,res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        res.status(201).json({
            message: "User created successfully",
            data: response,
            message: "User created successfully",
            success: true,
            error: {}
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong while creating the user",
            data:{},
            success: false,
             error: error
             });
    }
};

module.exports = {
    create
}