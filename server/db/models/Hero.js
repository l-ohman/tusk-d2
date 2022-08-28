// Database model for heroes
const Sequelize = require('sequelize');
const db = require('../database');

const Hero = db.define('hero',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    { timestamps: false }
);

module.exports = Hero;
