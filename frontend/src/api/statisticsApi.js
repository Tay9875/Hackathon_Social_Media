const API_USERS_URL = 'http://localhost:3000/api/users';

// FAKE DATA
const fakeUsers = [
    { id: 1, name: 'Alice', age: 30, gender: 'female', address: '123 Main St' },
    { id: 2, name: 'Bob', age: 25, gender: 'male' },
    { id: 3, name: 'Charlie', age: 35, gender: 'male', address: '456 Oak Ave' },
    { id: 4, name: 'Diana', age: 28, gender: 'female', address: '789 Pine Rd' },
    { id: 5, name: 'Eve', age: 22, gender: 'female' },
];

export async function getUsers() {
    try {
        // const response = await fetch(`${API_USERS_URL}`);
        // if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // return await response.json();
        return fakeUsers; // Return fake data for testing
    } catch (error) {
        console.error('Error while retrieving users:', error);
        throw error;
    }
}

export async function getUsersCount(users) {
    try {
        if (Array.isArray(users)) return users.length;
        if (users && Array.isArray(users.data)) return users.data.length;
        throw new Error('Unexpected users format');
    } catch (error) {
        console.error("Error while retrieving users count:", error);
        throw error;
    }
}

export async function getUsersByGender(users) {
    try {
        if (!Array.isArray(users)) {
            if (users && Array.isArray(users.data)) {
                users = users.data;
            } else {
                throw new Error('Unexpected users format');
            }
        }
        
        const genderCount = users.reduce((acc, user) => {
            const gender = user.gender || 'unknown';
            acc[gender] = (acc[gender] || 0) + 1;
            return acc;
        }, {});
        return genderCount;
    } catch (error) {
        console.error("Error while retrieving users by gender:", error);
        throw error;
    }
}

export async function getAddressesCount(users) {
    try {
        if (!Array.isArray(users)) {
            if (users && Array.isArray(users.data)) {
                users = users.data;
            } else {
                throw new Error('Unexpected users format');
            }
        }

        const nbAddresses = users.filter(user => user.address !== undefined);
        return nbAddresses.length;
    } catch (error) {
        console.error("Error while retrieving addresses count:", error);
        throw error;
    }
}

export async function getAverageAge(users) {
    try {
        if (!Array.isArray(users)) {
            if (users && Array.isArray(users.data)) {
                users = users.data;
            } else {
                throw new Error('Unexpected users format');
            }
        }

        const totalAge = users.reduce((acc, user) => acc + (user.age || 0), 0);
        return users.length ? totalAge / users.length : 0;
    } catch (error) {
        console.error("Error while retrieving users by age:", error);
        throw error;
    }
}