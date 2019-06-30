const Sequelize = require('sequelize');

const sequelize = new Sequelize('testHak2019','root', '1995op1995',
{
    dialect:'mysql',
    host:'localhost',
});
module.exports = sequelize;
