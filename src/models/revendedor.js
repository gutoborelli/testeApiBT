module.exports = (sequelize, DataTypes) => {
    const Revendedor = sequelize.define("Revendedor", {
        // id: DataTypes.INTEGER,
        CPF: DataTypes.STRING,
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        senha: DataTypes.STRING
    });

    return Revendedor;
}