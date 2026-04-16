const {User } = require('../models/index');

class UserRepository {
    async create(data){
        try {
            const user = await User.create(data);
            return user;
            
        } catch (error) {
            console.log("Something went wrong in repository layer",error)
                throw {error}
        }

    }

        async destroy(userId){
        try {
            const user = await User.destroy({ where: 
                { 
                    id: userId
                 } 
                });
            return user;
            
        } catch (error) {
            console.log("Something went wrong in repository layer",error)
                throw {error}
        }

    }

    async getByID(userId){
        try {
            const user = await User.findByPk(userId,{
                attributres: ['email','id']
            });
            return user;
        } catch (error) {
            console.log("Something went wrong in repository layer",error)
                throw {error}
        }
    }
}

module.exports = UserRepository;