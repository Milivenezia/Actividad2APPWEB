// Importar módulos necesarios
import http from 'node:http';
import { fetchAndSave } from './modules/fetchAndSave.mjs';
import { readFile } from './modules/readFile.mjs';

//  Crear el servidor HTTP
const server = http.createServer(async (req, res) => {
    try {
        //  Si la ruta es /usuarios y el verbo es GET
        if (req.url === '/usuarios' && req.method === 'GET') {
            await fetchAndSave();
            const data = await readFile();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);

        // Extra 1: Si la ruta es /usuarios/filtrados y el verbo es GET
        } else if (req.url === '/usuarios/filtrados' && req.method === 'GET') {
            await fetchAndSave();
            const data = await readFile();
            const usuarios = JSON.parse(data);
            const filtrados = usuarios.filter((user) => user.id < 10);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(filtrados, null, 2));

        // Para cualquier otra ruta o verbo
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ mensaje: 'Recurso no encontrado' }));
        }

    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ mensaje: `Error: ${error.message}` }));
    }
});

//  Poner el servidor a escuchar en el puerto 3000
server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});