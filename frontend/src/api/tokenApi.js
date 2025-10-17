const API_TOKEN_URL = `${import.meta.env.VITE_API_URL}/tokens/`;

export async function validateToken(token) {
    try {
        const response = await fetch(API_TOKEN_URL+'check', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.status === 200;
    } catch (error) {
        console.error('Error validating token:', error);
        return false;
    }
}