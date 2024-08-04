const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  // sync: { force: true },
});

const EntityInfo = require("../models/EntityInfo")(sequelize);


module.exports = {
  sequelize,
  Sequelize,
  EntityInfo,
};
