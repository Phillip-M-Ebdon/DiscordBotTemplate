const fs = require('fs');
const { Sequelize, DataTypes } = require('sequelize');
const database = require('./config.json').database;

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: database
});

const modelFiles = fs.readdirSync('./models').filter(model => model.endsWith('.js'));
let allModels = [];
for (const modelFile of modelFiles) {
    const model = require(`./models/${modelFile}`)(sequelize, DataTypes);
    allModels.push(model);
}

module.exports = { allModels }
