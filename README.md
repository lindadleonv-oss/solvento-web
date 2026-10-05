# SolVento — Sistema de energía híbrido eólico-solar

Monitoreo de telemetría para el nodo transmisor de la Aldea Los Paxtes, Salamá, Baja Verapaz.

## Arquitectura

| Componente | Local | Público (playit) | Propósito |
|---|---|---|---|
| Backend Express | `localhost:5000` | `http://<tunnel>:<puerto>/api/data` | Recibe datos del nodo (POST) |
| Dashboard Next.js | `localhost:3000` | — | Muestra las lecturas en tiempo real |
| PostgreSQL | `localhost:5432` | — | Almacenamiento de datos |

```
Nodo (SIM900) ──POST /api/data──> Backend Express ──INSERT──> PostgreSQL
                                                                 │
Dashboard Next.js <──GET /api/telemetry──> route.js <────────────┘ (SELECT)
```

## Requisitos

- Node.js 18+
- PostgreSQL 14+ corriendo localmente

## Configuración inicial

### 1. Clonar e instalar dependencias

```cmd
git clone https://github.com/lindadleonv-oss/solvento-web.git
cd solvento-web
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

### 2. Variables de entorno

```cmd
cd backend
copy .env.example .env
```

Editar `backend/.env`:

```
PORT=5000
DB_NAME=solvento_db
DB_USER=postgres
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432
```

```cmd
cd ..\frontend
copy .env.example .env.local
```

Editar `frontend/.env.local` con los mismos valores de base de datos (sin `PORT`).

### 3. Base de datos (migraciones)

Crear la base de datos vacía en PostgreSQL:

```sql
CREATE DATABASE solvento_db;
```

Aplicar las migraciones (crean la tabla `sensor_readings`):

```cmd
cd backend
npm run db:migrate
```

### 4. Arrancar

```cmd
cd backend
npm start        :: http://localhost:5000

cd ..\frontend
npm run dev      :: http://localhost:3000
```

## Uso

### Enviar datos (el nodo hace esto)

```bash
curl -X POST http://localhost:5000/api/data \
  -H "Content-Type: application/json" \
  -d '{"nodeId":"mega2560-test","windSpeed":12.4,"solarVoltage":18.2,"batteryLevel":87.5}'
```

Respuesta esperada:

```json
{ "status": "ok", "message": "Datos recibidos y almacenados correctamente", "data": { ... } }
```

### Ver datos

- Endpoint: `GET http://localhost:3000/api/telemetry`
- Dashboard: `http://localhost:3000` (actualiza cada 5 segundos)

## Comandos útiles

| Comando | Dónde | Qué hace |
|---|---|---|
| `npm start` | `backend/` | Inicia el servidor Express |
| `npm run dev` | `backend/` | Inicia Express con nodemon (auto-reinicia al editar) |
| `npm run db:migrate` | `backend/` | Aplica migraciones pendientes |
| `npm run db:migrate:undo` | `backend/` | Revierte la última migración |
| `npm run dev` | `frontend/` | Inicia el dashboard Next.js |
| `npm run build` | `frontend/` | Build de producción del dashboard |

## Notas

- El túnel playit debe apuntar al puerto local **5000** del backend (no al 3000).
- Los archivos `.env` y `.env.local` no se suben al repositorio; cada máquina debe tener su propia copia basada en los `.env.example`.
