import { Pool } from "pg";
import { config } from "../config/config.js";

const USER = encodeURIComponent(config.db.user);
const PASSWORD = encodeURIComponent(config.db.password);
const HOST = encodeURIComponent(config.db.host);
const PORT = encodeURIComponent(config.db.port);
const DATABASE = encodeURIComponent(config.db.database);
const URI = `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`;

const pool = new Pool({ connectionString: URI });

export default pool;
