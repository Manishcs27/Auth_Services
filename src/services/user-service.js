const UserRepository = require('../repository/user-repository');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const { JWT_KEY } = require('../config/serverConfig');

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }
    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in service layer", error);
            throw { error };
        }
    }

    // async destroy(userId) {
    //     try {
    //         const user = await this.userRepository.destroy(userId);
    //         return user;
    //     } catch (error) {
    //         console.log("Something went wrong in service layer", error);
    //         throw { error };
    //     }
    // }

    async signIn(email, plainPassword){
        try {
            const user = await this.userRepository.getByEmail(email);
            if (!user) {
                throw new Error('User not found');
            }
            const isMatch = this.checkPassword(plainPassword, user.password);
            if (!isMatch) {
                throw new Error('Invalid password');
            }
            const token = this.createToken({email: user.email, id: user.id});
            return token;
        } catch (error) {
            console.log("Something went wrong in service layer", error);
            throw { error };
        }
    }

    createToken(user){
        try {
            const result = jwt.sign(
                user,
                JWT_KEY,
                {
                    expiresIn: '1d'
                }

            )
            return result;
        } catch (error) {
            console.log("Something went wrong in service layer", error);
            throw { error };
        }
    }

    verifyToken(token){
        try {
            const result = jwt.verify(token, JWT_KEY);
            return result;
        } catch (error) {
            console.log("Something went wrong in service layer", error);
            throw { error };
        }
    }

    checkPassword(userInputPassword, encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in service layer", error);
            throw { error };
        }
    }

}
module.exports = UserService;