// Archivo: associations.js
import User from "./user.model.js";
import Role from "./role.model.js";

export const setupAssociations = () => {
  // Asociación: Un rol tiene muchos usuarios
  Role.hasMany(User, { foreignKey: "roleId", as: "Users" });

  // Asociación: Un usuario pertenece a un rol
  User.belongsTo(Role, { foreignKey: "roleId", as: "Role" });
};
