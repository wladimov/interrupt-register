// Modelo para la tabla Clientes
import User from "./User.js";
const Client = sequelize.define(
  "Client",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: User,
        key: "id",
      },
    },
    idCard: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    coordinates: {
      type: DataTypes.GEOMETRY("Point", 4326),
      allowNull: false,
    },
  },
  {
    tableName: "clients",
    timestamps: true,
  }
);

export default Client;
