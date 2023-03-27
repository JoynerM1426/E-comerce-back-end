const sequelize = require('../utils/connection');
const User = require("../models/User");
require('../models/Category')
require('../models/Product')
require('../models/User')
require('../models')

const main = async() => {
    try{
        await sequelize.sync({ force: true });
        await User.create({
            firstName: "Test",
            lastName: "User",
            email: "test@gmail.com",
            password: "test1234",
            phone: "1234567890",
          });
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();