// MODULO  Lee el archivo usuarios.json
import fs from 'node:fs/promises';
import path from 'node:path';

const filePath = path.resolve('usuarios.json');

async function readFile() {
    const data = await fs.readFile(filePath, 'utf-8');
    return data;
}

export { readFile };