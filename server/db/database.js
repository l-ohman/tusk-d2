const Sequelize = require("sequelize");

console.log("Connecting to database...");

const init = () => {
  // Checks whether app is run locally or on heroku
  if (process.env.DATABASE_URL) {
    return new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      logging: false,
    });
  } else {
    return new Sequelize("postgres://localhost/dota2", { logging: false });
  }
};

module.exports = init();
