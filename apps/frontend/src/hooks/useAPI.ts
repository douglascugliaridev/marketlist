export function useAPI() {
    const urlAPI = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const urlBase = urlAPI.endsWith('/') ? urlAPI.slice(0, -1) : urlAPI;
    const endpointAutenticacao = '/auth/login';
    const endpointRegistro = '/auth/register';

    async function login(email: string, password: string) {
        const response = await fetch(`${urlBase}${endpointAutenticacao}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        return response.json();
    }

    async function register(name: string, email: string, password: string) {
        const response = await fetch(`${urlBase}${endpointRegistro}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
        return response.json();
    }

    return {
        login,
        register,
    };

}
