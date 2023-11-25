const db = require("../config/mysql-config");

const tabs = db.sequelize.define("tabs", {
    id: {
        type: db.DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: db.DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'tabs',
    timestamps: false
});

module.exports = {
    tabs
}