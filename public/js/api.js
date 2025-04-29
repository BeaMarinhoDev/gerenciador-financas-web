import dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config();

// Define a URL do backend
const backendUrl = process.env.BACKEND_URL || 'http://localhost:3000';

async function apiRequest(endpoint, method = 'GET', body = null) {
    const headers = { 'Content-Type': 'application/json' };
    const token = localStorage.getItem('authToken');
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${backendUrl}/${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return response.json();
}

export default apiRequest;