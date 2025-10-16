const API_COMMENT_URL = 'http://localhost:3000/api/comments';            

export async function fetchComments(profileUuid) {
    try {
        const response = await fetch(API_COMMENT_URL+'/profile/'+profileUuid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const comments = await response.json();
        return comments;
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
}


export async function addComment(comment) {
    try {
        const response = await fetch(API_COMMENT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
            body: JSON.stringify(comment)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newComment = await response.json();
        return newComment;
    } catch (error) {
        console.error('Error adding comment:', error);
    }
}

export async function updateComment(commentUuid, newContent) {
    try {
        const response = await fetch(`${API_COMMENT_URL}/${commentUuid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
            body: JSON.stringify({ message: newContent })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating comment:', error);
        return null;
    }
}

export async function deleteComment(commentUuid) {
    try {
        const response = await fetch(`${API_COMMENT_URL}/${commentUuid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return true;
    } catch (error) {
        console.error('Error deleting comment:', error);
        return false;
    }
}