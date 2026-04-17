const { sign } = require('jsonwebtoken');
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
}

const signIn = async (req,res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        res.status(200).json({
            message: "Signed in successfully",
            data: response,
            success: true,
            error: {}
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong while signing in",
            data:{},
            success: false,
             error: error
             });
    }
}
    const isAuthenticated = async (req,res) => {
        try {
            const token = req.headers['x-access-token'];
            const response = await userService.isAuthenticated(token);
            res.status(200).json({
                message: "User is authenticated",
                data: response,
                success: true,
                error: {}
            });
        } catch (error) {
            console.log("Something went wrong in controller layer", error);
            res.status(500).json({
                message: "Something went wrong while authenticating the user",
                data:{},
                success: false,
                 error: error
                 });
        }
    }
    const isAdmin = async (req,res) => {
        try {
            const response = await userService.isAdmin(req.body.id);
            res.status(200).json({
                message: "Checked admin status successfully",
                data: response,
                success: true,
                error: {}
            });
        } catch (error) {
            console.log("Something went wrong in controller layer", error);
            res.status(500).json({
                message: "Something went wrong while checking admin status",
                data:{},
                success: false,
                 error: error
                 });
        }
    }

module.exports = {
    create,signIn,isAuthenticated,isAdmin
}