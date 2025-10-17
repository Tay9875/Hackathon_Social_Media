
async function sha512(str) {
    const buf = await window.crypto.subtle.digest('SHA-512', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

const API_LOGIN_URL = `${import.meta.env.VITE_API_URL}/auth/login`;

export async function loginUser(email, password) {
  const hash = await sha512(password);
  const response = await fetch(API_LOGIN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: hash })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to login');
  }
  const user = await response.json();
  localStorage.setItem('token', JSON.stringify(user.token));
  return user;
}