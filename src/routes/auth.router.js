import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/authValidate.js";
import { registerSchema, loginSchema } from "../schemas/auth.schemas.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Correo del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *         roleId:
 *           type: integer
 *           description: ID del rol asignado al usuario
 *       required:
 *         - email
 *         - password
 *         - roleId
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/register", validateSchema(registerSchema), register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Credenciales incorrectas
 */
router.post("/login", validateSchema(loginSchema), login);

/**
 * @swagger
 * /test:
 *   get:
 *     summary: Endpoint de prueba
 *     tags: [Test]
 *     responses:
 *       200:
 *         description: Éxito
 */
router.get("/test", (req, res) => {
  res.status(200).json({ message: "Test endpoint funcionando" });
});

export default router;
