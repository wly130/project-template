const db = require("../config/mysql-config");

const tabs = db.sequelize.define("tabs", {
    id: {
        type: db.DataTypes.INTEGER(100),
        primaryKey: true
    },
    name: {
        type: db.DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'tabs',
    timestamps: false
});

module.exports = {
    tabs
}