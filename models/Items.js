module.exports = (sequelize, DataTypes) => {
    return sequelize.define('items', {
        name: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true
        },
    });
}