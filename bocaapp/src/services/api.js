import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://api-bocadillos.onrender.com';

// Busca o token salvo e monta o header Authorization
async function getAuthHeaders() {
  const token = await AsyncStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// AUTH
export async function apiRegister({ name, email, password, phone }) {
  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, phone }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro ao cadastrar');
  return data;
}

export async function apiLogin({ email, password }) {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Email ou senha inválidos');
  // Salva o token e o usuário localmente
  if (data.token) await AsyncStorage.setItem('token', data.token);
  if (data.user) await AsyncStorage.setItem('user', JSON.stringify(data.user));
  return data;
}

export async function apiLogout() {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('user');
}

// PRODUTOS
export async function apiGetProducts() {
  const headers = await getAuthHeaders();
  const response = await fetch(`${BASE_URL}/api/products/salty`, { headers });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Erro ao buscar produtos');
  const lista = data.salty || [];
  return lista.map((item) => ({ ...item, image_url: item.image }));
}