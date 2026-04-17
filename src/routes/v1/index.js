const express = require('express');

const userController = require('../../controllers/user-controller');

const {AuthRequestValidators} = require('../../middlewares/index')

const router = express.Router();

router.post('/signup', userController.create);

router.post('/signin',AuthRequestValidators.validateUserAuth , userController.signIn);

module.exports = router;