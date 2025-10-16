const API_USERS_URL = 'http://localhost:3000/api/users';

export async function getUsers() {
    try {
        const response = await fetch(`${API_USERS_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error while retrieving users:', error);
        throw error;
    }
}

export async function getUserByUuid(userUuid) {
    try {
        const response = await fetch(`${API_USERS_URL}/${userUuid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Error while retrieving user:', error);
        throw error;
    }
}