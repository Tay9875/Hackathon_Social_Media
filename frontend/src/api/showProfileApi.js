const API_PROFILE_URL = 'http://localhost:3000/api/profile';

export async function showProfileUser(userId) {
    try {
        const response = await fetch(`${API_PROFILE_URL}/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération du profil utilisateur:', error);
        throw error;
    }
}
