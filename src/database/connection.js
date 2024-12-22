import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Cargar las variables de entorno

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
    },
  }
);

// Probar la conexión
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión exitosa a la base de datos.");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  }
})();

export default sequelize;
