import fs from 'node:fs/promises';
import path from 'node:path';

async function writeAndRead(data) {
    try {
     
        const filePath = path.resolve('usuarios.json');

        const jsonString = JSON.stringify(data, null, 2);

  
        await fs.writeFile(filePath, jsonString);
        console.log('✔ Archivo guardado en:', filePath);

    
        const fileContent = await fs.readFile(filePath, 'utf-8');

        return fileContent;

    } catch (error) {
        throw new Error(`Error al leer/escribir archivo: ${error.message}`);
    }
}

export { writeAndRead };
