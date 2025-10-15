const API_TOKEN_URL = 'http://localhost:3000/api/token';            

const tokens = ref([])
const tokenName = ref('')
const tokenValue = ref('')
const createdBy = ref('')
const createdAt = ref('')
const userUuid = ref('')

 export async function fetchTokens() {
    try {
        const response = await fetch(API_TOKEN_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        chats.value = await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

export async function addToken() {
    try {
        const response = await fetch(API_TOKEN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tokenName: tokenName.value,
                createdAt: createdAt.value,
                userUuid: userUuid.value,
                createdBy: createdBy.value,
                tokenValue: tokenValue.value,
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newToken = await response.json();
        tokens.value.push(newToken);
        userUuid.value = '';
        tokenName.value = '';
        createdAt.value = '';
        createdBy.value = '';
        tokenValue.value = '';
    } catch (error) {
        console.error('Error adding user:', error);
    }
}



