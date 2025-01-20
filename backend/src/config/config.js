require("dotenv").config(); // ✅ Load environment variables from .env

module.exports = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "password",
    database: process.env.DB_NAME || "prepv3",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: process.env.DB_USER || "your_db_user",
    password: process.env.DB_PASS || "your_db_password",
    database: process.env.DB_TEST || "your_database_test",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: process.env.DB_USER || "your_db_user",
    password: process.env.DB_PASS || "your_db_password",
    database: process.env.DB_PROD || "your_database_prod",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres"
  }
};
