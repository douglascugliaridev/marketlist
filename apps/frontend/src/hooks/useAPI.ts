
import { Requisicao } from "@/utils/Requisicao";
import { CookieSession } from "@/utils/CookieSession";
import { useAPIWithAuth } from "./useAPIWithAuth";

export function useAPI() {
    const urlAPI = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const urlBase = urlAPI.endsWith('/') ? urlAPI.slice(0, -1) : urlAPI;
    const endpointAutenticacao = '/auth/login';
    const endpointRegistro = '/auth/register';
    const endpointProduto = '/product';
    const { handleUnauthorized } = useAPIWithAuth();

    function getAuthHeaders() {
        return {
            'Authorization': `Bearer ${CookieSession.get()?.token}`
        };
    }

    async function login(email: string, password: string) {
        const response = await Requisicao.post(`${urlBase}${endpointAutenticacao}`, { email, password }, {
            'Content-Type': 'application/json',
        });
        return response;
    }

    async function register(name: string, email: string, password: string) {
        const response = await Requisicao.post(`${urlBase}${endpointRegistro}`, { name, email, password }, {
            'Content-Type': 'application/json',
        });
        return response;
    }

    async function getProducts(page: number = 1, limit: number = 10) {
        const response = await Requisicao.get(`${urlBase}${endpointProduto}?page=${page}&limit=${limit}`, getAuthHeaders(), handleUnauthorized);
        return response;
    }

    async function getProduct(id: string) {
        const response = await Requisicao.get(`${urlBase}${endpointProduto}/${id}`, getAuthHeaders(), handleUnauthorized);
        return response;
    }

    async function createProduct(name: string, brand: string, isDefault: boolean) {
        const userId = CookieSession.get()?.userId;
        const response = await Requisicao.post(`${urlBase}${endpointProduto}`, { name, brand, isDefault, userId }, {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
        }, handleUnauthorized);
        return response;
    }

    async function deleteProduct(id: string) {
        const response = await Requisicao.delete(`${urlBase}${endpointProduto}/${id}`, getAuthHeaders(), handleUnauthorized);
        return response;
    }

    async function updateProduct(id: string, name: string, brand: string, isDefault: boolean) {
        const response = await Requisicao.patch(`${urlBase}${endpointProduto}/${id}`, { name, brand, isDefault }, {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
        }, handleUnauthorized);
        return response;
    }

    return {
        login,
        register,
        getProducts,
        getProduct,
        createProduct,
        deleteProduct,
        updateProduct,
    };
}
