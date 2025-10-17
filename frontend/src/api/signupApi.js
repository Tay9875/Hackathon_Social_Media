
const API_SIGNUP_URL = `${import.meta.env.VITE_API_URL}/auth/signup`;


async function sha512(str) {
    const buf = await window.crypto.subtle.digest('SHA-512', new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function addUser(user) {
    const hash = await sha512(user.password);
    try {
        const response = await fetch(API_SIGNUP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: user.firstname,
                email: user.email,
                avatar: user.avatar,
                password: hash,
                description: user.description,
                gender: user.gender,
                lastName: user.lastname,
                birthDate: user.birthdate,
                adress: user.address
            })
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Failed to signup');
        }
        const newUser = await response.json();
        localStorage.setItem('token', JSON.stringify(newUser.token));
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
}



