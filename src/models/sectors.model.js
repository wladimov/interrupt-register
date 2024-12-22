// Modelo para la tabla Sectores
const Sector = sequelize.define(
  "Sector",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    polygon: {
      type: DataTypes.GEOMETRY("Polygon", 4326),
      allowNull: false,
    },
  },
  {
    tableName: "sectors",
    timestamps: true,
  }
);

export default Sector;
