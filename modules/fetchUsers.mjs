
async function fetchUsers() {
    try {
        const response = await fetch('https://api.escuelajs.co/api/v1/users');
        const users = await response.json();

    
        const formattedUsers = users.map((user) => {
            return {
                id: user.id,
                email: user.email,
                name: user.name
            };
        });

        return formattedUsers;

    } catch (error) {
        throw new Error(`Error al obtener datos: ${error.message}`);
    }
}

export { fetchUsers };
