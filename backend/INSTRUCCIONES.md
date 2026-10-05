# SolVentoProyecto - Configuración de Túnel y Servidor

## Estado Actual

El túnel playit `pgsql-attitudes.tun.ply.gg:22493` estaba apuntando al puerto 3000 (Next.js),
mientras que el backend Express corre en el puerto 5000.

## Pasos para Corregir

### Paso 1: Iniciar el Backend Express

```cmd
cd D:\Escritorio\Familia\Linda\Universidad Mesoamericana\PROYECTO PROFESIONAL\SolVentoProyecto\backend
node src\server.js
```

Deberías ver:
```
Servidor backend corriendo en http://0.0.0.0:5000
URL pública mediante playit: http://pgsql-attitudes.tun.ply.gg:5000
```

### Paso 2: Reconfigurar el Túnel playit

1. Ve a [playit.gg panel](https://playit.gg)
2. Encuentra el túnel `pgsql-attitudes.tun.ply.gg`
3. Modifica la configuración:
   - Puerto público: `22493` (mantener)
   - Puerto local: `5000` (cambiar de 3000 a 5000)
4. Desconecta y vuelve a conectar el túnel

### Paso 3: Probar el Endpoint

Desde PowerShell/curl:

```bash
curl -v -X POST http://pgsql-attitudes.tun.ply.gg:22493/api/data \
  -H 'Content-Type: application/json' \
  -d '{"nodeId":"mega2560-test","windSpeed":12.4,"solarVoltage":18.2,"batteryLevel":87.5}'
```

**Éxito esperado:** HTTP 200 con respuesta JSON:
```json
{"status":"ok","message":"Datos recibidos correctamente","data":{"nodeId":"mega2560-test","windSpeed":12.4,"solarVoltage":18.2,"batteryLevel":87.5}}
```

Verificar en la base de datos PostgreSQL (`solvento_db`, tabla `datos`) que la fila fue insertada.

### Paso 4: Usar con el SIM900 (cliente final)

El Arduino Mega con SIM900 debe enviar exactamente este payload por HTTP plano (sin TLS):

```
POST /api/data
Host: pgsql-attitudes.tun.ply.gg:22493
Content-Type: application/json

{"nodeId":"mega2560-test","windSpeed":12.4,"solarVoltage":18.2,"batteryLevel":87.5}
```

### Arquitectura

| Componente | Puerto Local | URL Pública playit | Propósito |
|---|---|---|---|
| Backend Express | 5000 | `pgsql-attitudes.tun.ply.gg:22493/api/data` | Recibir datos del nodo transmisor |
| Next.js Dashboard | 3000 | URL playit front-end | Mostrar datos en interfaz web |
| PostgreSQL | 5432 | localhost | Almacenamiento de datos |

## Archivos Relevantes

- `backend/src/server.js` - Servidor Express con endpoint `/api/data`
- `backend/.env` - Configuración: PORT=5000
- `frontend/src/app/api/telemetry/route.js` - Endpoint GET que consulta la base de datos