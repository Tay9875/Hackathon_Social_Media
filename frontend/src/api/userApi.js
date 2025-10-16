const API_USERS_URL = 'http://localhost:3000/api/users';

export async function getUsers() {
    try {
        const response = await fetch(`${API_USERS_URL}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error while retrieving users:', error);
        throw error;
    }
}