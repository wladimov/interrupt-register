// Modelo para la tabla Interrupciones
import Client from "./Client.js";
import Sector from "./Sector.js";
const Outage = sequelize.define(
  "Outage",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sectorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Sector,
        key: "id",
      },
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Client,
        key: "id",
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
    startAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "outages",
    timestamps: true,
  }
);

export default Outage;
