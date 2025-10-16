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

        const currentYear = new Date().getFullYear();
        const ages = users
            .map(user => {
            if (user.birthDate) {
                const birthYear = new Date(user.birthDate).getFullYear();
                return currentYear - birthYear;
            }
            return null;
            })
            .filter(age => age !== null);
        const totalAge = ages.reduce((acc, age) => acc + age, 0);
        return ages.length ? (totalAge / ages.length) : 0;
    } catch (error) {
        console.error("Error while retrieving users by age:", error);
        throw error;
    }
}