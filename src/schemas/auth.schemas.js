import { z } from "zod";

// Esquema de validación para el registro de usuarios
export const registerSchema = z.object({
  email: z
    .string()
    .email("El correo debe tener un formato válido")
    .min(1, "El correo es obligatorio"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(255, "La contraseña no debe superar los 255 caracteres"),
  roleId: z
    .number()
    .int("El ID del rol debe ser un número entero")
    .positive("El ID del rol debe ser un número positivo"),
});

// Esquema de validación para el inicio de sesión
export const loginSchema = z.object({
  email: z
    .string()
    .email("El correo debe tener un formato válido")
    .min(1, "El correo es obligatorio"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(255, "La contraseña no debe superar los 255 caracteres"),
});
