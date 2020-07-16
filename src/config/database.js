require('dotenv').config({path: ".env"});

console.log(process.env.DB_USER);
module.exports = {
  host: process.env.DB_ENDPOINT,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  dialect: 'mysql',
  define: {
    underscored: true,
    underscoredAll: true
  }
};
