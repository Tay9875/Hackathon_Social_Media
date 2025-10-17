const API_TOKEN_URL = `${import.meta.env.VITE_API_URL}/token/`;           

export async function validateToken(token) {
    try {
        const response = await fetch(API_TOKEN_URL+'check', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.ok;
    } catch (error) {
        console.error('Error validating token:', error);
        return false;
    }
}