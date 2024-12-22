import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./database/connection.js";
import authRouter from "./routes/auth.router.js";
import { setupAssociations } from "./models/associations.model.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.config.js";

dotenv.config(); // Cargar variables de entorno

const app = express();
const PORT = process.env.PORT || 8080;

// Configuración de middlewares
app.use(cors());
app.use(express.json());

// Configurar asociaciones
setupAssociations();

// Definición de rutas
app.use("/api/v1/auth", authRouter);

// Rta para la documentación
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta inicial de prueba
app.get("/", async (req, res) => {
  try {
    await sequelize.authenticate(); // Probar la conexión
    res.status(200).json({ message: "API is running and DB connected" });
  } catch (error) {
    console.error("Error connecting to DB:", error);
    res.status(500).json({ message: "Error connecting to DB", error });
  }
});

// Iniciar el servidor después de que Sequelize esté listo
(async () => {
  try {
    await sequelize.sync({ alter: true }); // Sincroniza los modelos con la base de datos
    console.log("Modelos sincronizados con la base de datos.");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
      console.log(
        `Documentación disponible en http://localhost:${PORT}/api/v1/docs`
      );
    });
  } catch (error) {
    console.error("Error iniciando el servidor:", error);
  }
})();
