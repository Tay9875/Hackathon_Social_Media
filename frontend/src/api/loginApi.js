import bcrypt from 'bcryptjs';

const API_LOGIN_URL = `${import.meta.env.VITE_API_URL}/auth/login`;
const saltRounds = 10;

export async function loginUser(email, password) {
  const hash = bcrypt.hashSync(password, saltRounds);
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