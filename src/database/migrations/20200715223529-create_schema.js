'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction (t =>{
      return Promise.all([
      queryInterface.createTable('compra', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        codigo: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        valor: {
          type: Sequelize.DECIMAL(6,2),
          allowNull: false
        },
        CPF: {
          type: Sequelize.STRING,
          allowNull: false
        },
        data: {
          type: Sequelize.Date,
          allowNull: false
        },      
      }, { transaction: t}),
      queryInterface.createTable('revendedor', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        CPF: {
          type: Sequelize.STRING,
          allowNull: false
        },
        nome: {
          type: Sequelize.STRING(6,2),
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false
        },
        senha: {
          type: Sequelize.STRING,
          allowNull: false
        },      
      }, {transaction: t})])      
  });
  },

  down: async (queryInterface, Sequelize) => {
   return queryInterface.sequelize.transaction (t =>{
      return Promise.all(
        [queryInterface.dropTable('compra', {transaction: t}),
        queryInterface.dropTable('compra', {transaction: t})]);
  });
}
};
