module.exports = (sequelize, DataTypes) => {
    const Compra = sequelize.define("Compra", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        codigo: DataTypes.INTEGER,
        valor: DataTypes.DECIMAL(6,2),
        CPF: DataTypes.STRING,
        data: DataTypes.DATE
    });

    return Compra;
}