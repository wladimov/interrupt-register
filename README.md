# Power Outage API

La **Power Outage API** es una aplicación diseñada para gestionar interrupciones eléctricas, incluyendo usuarios, roles, clientes, sectores y eventos de interrupción. Este proyecto utiliza Node.js, Express y PostgreSQL con la extensión PostGIS para manejar datos geoespaciales.

---

## **Características Principales**

- Gestión de usuarios y roles.
- Registro y autenticación de usuarios con contraseñas encriptadas.
- Gestión de clientes con coordenadas geográficas.
- Gestión de sectores geográficos y horarios de interrupción.
- Registro y consulta de interrupciones programadas o reportadas.
- Documentación interactiva con Swagger.

---

## **Requisitos Previos**

1. **Node.js**: Versión 16 o superior.
2. **PostgreSQL**: Versión 13 o superior con la extensión PostGIS.
3. **Docker**: Para crear contenedores y manejar la persistencia de datos (opcional).

---

## **Configuración del Proyecto**

### **1. Clonar el Repositorio**

```bash
git clone https://github.com/wladimov/power-outage-api.git
cd power-outage-api
```

### **2. Instalar Dependencias**

Ejecuta el siguiente comando para instalar las dependencias:

```bash
npm install
```

### **3. Configurar Variables de Entorno**

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
PORT=8080
DB_NAME=power_outage_db
DB_USER=admin_user
DB_PASSWORD=secure_password
DB_HOST=localhost
JWT_SECRET=your_secret_key
```

### **4. Configuración de la Base de Datos**

1. Inicia PostgreSQL y habilita la extensión PostGIS:
   ```sql
   CREATE EXTENSION IF NOT EXISTS postgis;
   ```
2. Crea las tablas ejecutando los modelos de Sequelize o usa el script SQL incluido en el archivo `DATA_MODEL.md`.

### **5. Uso de Docker (Opcional)**

Si prefieres usar Docker para gestionar PostgreSQL:

1. Construye y ejecuta el contenedor:
   ```bash
   docker-compose up -d
   ```
2. Asegúrate de que el contenedor esté corriendo:
   ```bash
   docker ps
   ```

---

## **Ejecución de la Aplicación**

### **1. Modo Desarrollo**

```bash
npm run dev
```

### **2. Modo Producción**

```bash
npm start
```

### **3. Acceso a la API**

1. Verifica que la aplicación esté corriendo en: `http://localhost:8080`
2. Documentación interactiva disponible en: `http://localhost:8080/api/v1/docs`

---

## **Estructura del Proyecto**

```plaintext
.
├── server.js             # Archivo principal de la aplicación
├── src
│   ├── config            # Configuración global (Swagger, base de datos, etc.)
│   ├── controllers       # Controladores de las rutas
│   ├── middlewares       # Middlewares personalizados
│   ├── models            # Definición de modelos Sequelize
│   ├── routes            # Definición de rutas
│   ├── schemas           # Validaciones con Zod
│   └── database          # Configuración de Sequelize
├── docker-compose.yml    # Configuración de Docker para PostgreSQL
├── .env                  # Variables de entorno
├── package.json          # Dependencias y scripts
└── README.md             # Documentación del proyecto
```

---

## **Pruebas**

### **1. Pruebas con Postman**

#### **Endpoint de Registro de Usuario**

- **Método:** `POST`
- **URL:** `http://localhost:8080/api/v1/auth/register`
- **Encabezados (`Headers`):**
  ```json
  {
    "Content-Type": "application/json"
  }
  ```
- **Cuerpo (`Body`):**
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123",
    "roleId": 2
  }
  ```

#### **Endpoint de Inicio de Sesión**

- **Método:** `POST`
- **URL:** `http://localhost:8080/api/v1/auth/login`
- **Encabezados (`Headers`):**
  ```json
  {
    "Content-Type": "application/json"
  }
  ```
- **Cuerpo (`Body`):**
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123"
  }
  ```

### **2. Endpoints Principales**

- **Registro de Usuarios:** `POST /api/v1/auth/register`
- **Inicio de Sesión:** `POST /api/v1/auth/login`

---

## **Contribuir**

1. Realiza un fork del proyecto.
2. Crea una rama para tu nueva característica:
   ```bash
   git checkout -b feature/nueva-caracteristica
   ```
3. Realiza un pull request una vez finalizados los cambios.

---

## **Licencia**

Este proyecto está bajo la licencia [MIT](LICENSE).
