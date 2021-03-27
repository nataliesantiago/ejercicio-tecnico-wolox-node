const userModel = require('../models/user.model');

class UserController {

    constructor() { }

    async getUser(userName) {
        const user = await userModel.findOne({ user_name: userName });
        return user;
    }

    async saveUser(userDto) {
        const user = new userModel(userDto);
        await user.save(userDto);
        return user;
    }

}

module.exports = UserController;