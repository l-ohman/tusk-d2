const Sequelize = require('sequelize');
const db = require('../database');

const queryInterface = db.getQueryInterface();

let Match = db.define('matches',
    {
        matchId: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
        },
        patch: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        winningTeam: {
            type: Sequelize.ENUM('radiant', 'dire'),
            allowNull: false,
        },
        duration: { // in seconds
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        firstPick: {
            type: Sequelize.ENUM('radiant', 'dire'),
            allowNull: false,
        }
    },
    {
        timestamps: false,
        freezeTableName: true // because the plural of 'matches' is not 'matchs'
    }
);

module.exports = Match;
