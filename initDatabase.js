const fs = require('fs');
const { Sequelize } = require('sequelize');
const database = require('./config.json').database;
const { models } = require('./initModels');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: database
});

const force = process.argv.includes('--force')
sequelize.sync({ force }).then(async () => {

    console.log('DB SYNCED');
    sequelize.close();
})