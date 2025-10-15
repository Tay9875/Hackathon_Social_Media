API_LOGIN_URL = 'http://localhost:3000/api/login';


export async function loginUser(email, password) {
  const response = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return await response.json(); // généralement { token, user }
}