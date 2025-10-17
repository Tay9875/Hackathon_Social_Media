const API_SIGNUP_URL = 'http://localhost:3000/api/auth/signup';  

import bcrypt from 'bcryptjs';
const saltRounds = 10;


export async function addUser(user) {
    const hash = bcrypt.hashSync(user.password, saltRounds);
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
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newUser = await response.json();
        localStorage.setItem('token', JSON.stringify(newUser.token));
    } catch (error) {
        console.error('Error adding user:', error);
    }
}



