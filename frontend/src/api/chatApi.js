const API_CHAT_URL = 'http://localhost:3000/api/chat';            

const chats = ref([])
const message = ref('')
const createdAt = ref('')
const createdBy = ref('')
const profile = ref('')
const uuid = ref('')

 export async function fetchChats() {
    try {
        const response = await fetch(API_CHAT_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        chats.value = await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

export async function addChat() {
    try {
        const response = await fetch(API_CHAT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message.value,
                createdAt: createdAt.value,
                uuid: uuid.value,
                createdBy: createdBy.value,
                profile: profile.value,
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newChat = await response.json();
        chats.value.push(newChat);
        uuid.value = '';
        message.value = '';
        createdAt.value = '';
        createdBy.value = '';
        profile.value = '';
    } catch (error) {
        console.error('Error adding user:', error);
    }
}



