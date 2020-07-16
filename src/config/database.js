require('dotenv').config();

module.exports = {
  host: process.env.DB_ENDPOINT,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE_POINT,
  define: {
    timestamps: false,
    underscored: false,
    underscoredAll: false,
    freezeTableName: true
  }
};
