# Docker_FinalProject
 Proyecto final estructuras del PC II
 
 Instrucciones para ser ejecutado en docker:
 1. git clone https://github.com/djulioj/Docker_FinalProject.git
 2. cd Docker_FinalProject
 3. docker build -t app .
 4. docker-compose up -d
 5. verificar conexión: curl -X GET localhost:3001/connection
 6. Almacenar en la base de datos el id, timestamp y hash: curl -X POST --header 'Content-Type: application/json' -d '{"id": "123"}' localhost:3001/adduser
 7. Devolver formato Json tabla s: curl -X GET localhost:3001/jsontables
 8. Borrar todos los elementos: curl -X DELETE localhost:3001/delete

# Integrantes:
- Juan Julio
- Miguel Marsiglia
- Steven Osorio
