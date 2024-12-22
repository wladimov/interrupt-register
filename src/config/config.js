import dotenv from "dotenv";

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 8080,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};
