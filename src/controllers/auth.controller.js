// Archivo: auth.controller.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Role from "../models/role.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret_key"; // Solo para entorno de desarrollo

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Incluir el rol en la consulta
    const user = await User.findOne({
      where: { email },
      include: { model: Role, as: "Role" },
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Correo o contraseña incorrectos" });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Correo o contraseña incorrectos" });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: user.id, role: user.Role.name }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { email, password, roleId } = req.body;

    // Verificar si el correo ya está registrado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const newUser = await User.create({
      email,
      password: hashedPassword,
      roleId,
    });

    res
      .status(201)
      .json({ message: "Usuario registrado exitosamente", userId: newUser.id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};
