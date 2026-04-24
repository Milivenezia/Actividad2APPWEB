
import { fetchUsers } from './modules/fetchUsers.mjs';
import { writeAndRead } from './modules/fileHandler.mjs';


try {

    const users = await fetchUsers();

    const result = await writeAndRead(users);


    console.log('Usuarios guardados:\n' + result);

} catch (error) {
    console.log(`Se produjo un error: ${error.message}`);
}
