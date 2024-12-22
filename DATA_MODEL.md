```sql
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL REFERENCES roles(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL UNIQUE REFERENCES users(id),
    id_card VARCHAR(20) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    coordinates GEOMETRY(Point, 4326) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sectors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    polygon GEOMETRY(Polygon, 4326) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE outages (
    id SERIAL PRIMARY KEY,
    sector_id INT NOT NULL REFERENCES sectors(id),
    client_id INT NOT NULL REFERENCES clients(id),
    description TEXT,
    start_at TIMESTAMP NOT NULL,
    end_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_clients_coordinates ON clients USING GIST (coordinates);
CREATE INDEX idx_sectors_polygon ON sectors USING GIST (polygon);

INSERT INTO roles (name) VALUES ('Admin'), ('Client');

INSERT INTO users (email, password, role_id)
VALUES
('admin@example.com', 'hashed_password', 1),
('client1@example.com', 'hashed_password', 2),
('client2@example.com', 'hashed_password', 2);

INSERT INTO clients (user_id, id_card, first_name, last_name, coordinates)
VALUES
(2, '1234567890', 'John', 'Doe', ST_SetSRID(ST_MakePoint(-78.4872125, -0.1841235), 4326)),
(3, '0987654321', 'Jane', 'Smith', ST_SetSRID(ST_MakePoint(-78.491234, -0.195678), 4326));

INSERT INTO sectors (name, start_time, end_time, polygon)
VALUES
('Sector Norte', '09:00', '12:00', ST_SetSRID(ST_GeomFromText('POLYGON((-78.5 -0.2, -78.4 -0.2, -78.4 -0.1, -78.5 -0.1, -78.5 -0.2))'), 4326)),
('Sector Sur', '13:00', '16:00', ST_SetSRID(ST_GeomFromText('POLYGON((-78.6 -0.3, -78.5 -0.3, -78.5 -0.2, -78.6 -0.2, -78.6 -0.3))'), 4326));

INSERT INTO outages (sector_id, client_id, description, start_at)
VALUES
(1, 1, 'Interrupción programada por mantenimiento', '2024-12-21 09:00:00'),
(2, 2, 'Interrupción por falla técnica', '2024-12-21 13:30:00');

```
