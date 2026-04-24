//  Importar módulos necesarios (http, fs/promises, path)
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';

//  Construir la ruta al archivo usuarios.json
const filePath = path.resolve('usuarios.json');

//  Función que obtiene usuarios de la API y los guarda en el archivo
async function fetchAndSave() {
    const response = await fetch('https://api.escuelajs.co/api/v1/users');
    const users = await response.json();

    const formattedUsers = users.map((user) => {
        return {
            id: user.id,
            email: user.email,
            name: user.name
        };
    });

    await fs.writeFile(filePath, JSON.stringify(formattedUsers, null, 2));
}

//  Función que lee el archivo usuarios.json
async function readFile() {
    const data = await fs.readFile(filePath, 'utf-8');
    return data;
}

// Crear el servidor HTTP
const server = http.createServer(async (req, res) => {
    try {
        //  Si la ruta es /usuarios y el verbo es GET
        if (req.url === '/usuarios' && req.method === 'GET') {
            await fetchAndSave();
            const data = await readFile();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);

        //  Para cualquier otra ruta o verbo
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ mensaje: 'Recurso no encontrado' }));
        }

    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ mensaje: `Error: ${error.message}` }));
    }
});

//  Poner el servidor a escuchar en un puerto
server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});