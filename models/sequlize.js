const dbconfig = require("../config/config.json");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  dbconfig.development.database,
  dbconfig.development.username,
  dbconfig.development.password,
  {
    host: dbconfig.development.host,
    dialect: dbconfig.development.dialect,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
})();

module.exports = sequelize;
