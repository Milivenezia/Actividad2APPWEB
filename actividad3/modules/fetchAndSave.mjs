// MODULO  Obtiene usuarios de la API y los guarda en el archivo
import fs from 'node:fs/promises';
import path from 'node:path';

const filePath = path.resolve('usuarios.json');

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

export { fetchAndSave };