const API_POST_URL = 'http://localhost:3000/api/post';            

const posts = ref([])
const content = ref('')
const createdAt = ref('')
const createdBy = ref('')
const images = ref([])
const uuid = ref('')

 export async function fetchPosts() {
    try {
        const response = await fetch(API_POST_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        chats.value = await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

export async function addPost() {
    try {
        const response = await fetch(API_POST_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: content.value,
                createdAt: createdAt.value,
                uuid: uuid.value,
                createdBy: createdBy.value,
                images: images.value,
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newPost = await response.json();
        posts.value.push(newPost);
        uuid.value = '';
        content.value = '';
        createdAt.value = '';
        createdBy.value = '';
        images.value = '';
    } catch (error) {
        console.error('Error adding user:', error);
    }
}



