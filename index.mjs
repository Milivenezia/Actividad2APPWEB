
// 1 - Importamos los módulos que creamos
import { fetchUsers } from './modules/fetchUsers.mjs';
import { writeAndRead } from './modules/fileHandler.mjs';

// 2 - Ejecutamos todo en orden dentro de un try/catch
try {
    // Paso 1: Fetch a la API + formateo con .map()
    const users = await fetchUsers();

    // Paso 2: Escribir en archivo local + leer lo guardado
    const result = await writeAndRead(users);

    // Paso 3: Imprimir por consola
    console.log('Usuarios guardados:\n' + result);

} catch (error) {
    console.log(`Se produjo un error: ${error.message}`);
}
