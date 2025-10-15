const API_SIGNUP_URL = 'http://localhost:3000/api/signup';  

const bcrypt = require('bcrypt');
const saltRounds = 10;


export async function addUser(firstName, email, avatar, password, description, gender, lastName, birthDate, address) {
    const hash = bcrypt.hashSync(password, saltRounds);
    try {
        const response = await fetch(API_SIGNUP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstName.value,
                email: email.value,
                avatar: avatar.value,
                password: hash,
                description: description.value,
                gender: gender.value,
                lastName: lastName.value,
                birthDate: birthDate.value,
                address: address.value
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



