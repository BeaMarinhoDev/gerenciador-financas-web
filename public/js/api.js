async function apiRequest(endpoint, method = 'GET', body = null) {
    const headers = { 'Content-Type': 'application/json' };
    const token = localStorage.getItem('authToken');
    if (token) headers['Authorization'] = `Bearer ${token}`;

    try {
        const response = await fetch(`${backendUrl}/${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Erro ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`[API ERROR] ${error.message}`);
        throw error;
    }
}

export default apiRequest;