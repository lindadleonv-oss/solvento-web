@echo off
cd "D:\Escritorio\Familia\Linda\Universidad Mesoamericana\PROYECTO PROFESIONAL\SolVentoProyecto\frontend"
echo Limpiando logs anteriores...
if exist server.log del server.log
echo Iniciando Next.js dev server...
echo Los logs se guardan en server.log
npm run dev > server.log 2>&1
timeout /t 5 /nobreak > nul
echo Servidor Next.js iniciado
echo Abre http://localhost:3000 en tu navegador