type RequisicaoProps = {
    url: string;
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    body?: any;
    headers?: any;
    onUnauthorized?: () => void;
}

export class Requisicao {
    private static async generica(props: RequisicaoProps) {
        try {
            const resposta = await fetch(props.url, {
                method: props.method,
                headers: props.headers,
                body: JSON.stringify(props.body)
            })

            if (resposta.status === 401) {
                if (props.onUnauthorized) {
                    props.onUnauthorized();
                }
                return null;
            }

            const dados = await resposta.json()
            return dados;
        } catch (error) {
            throw new Error(`Falha ao acessar a URL ${props.url}`)
        }
    }

    public static async get(url: string, headers?: any, onUnauthorized?: () => void) {
        try {
            return this.generica({ url, method: 'GET', headers, onUnauthorized })
        } catch (error) {
            throw new Error(`Falha ao acessar a URL ${url}`)
        }
    }

    public static async post(url: string, body: any, headers?: any, onUnauthorized?: () => void) {
        try {
            return this.generica({ url, method: 'POST', body, headers: { 'Content-Type': 'application/json', ...headers }, onUnauthorized })
        } catch (error) {
            throw new Error(`Falha ao acessar a URL ${url}`)
        }
    }

    public static async patch(url: string, body: any, headers?: any, onUnauthorized?: () => void) {
        try {
            return this.generica({ url, method: 'PATCH', body, headers: { 'Content-Type': 'application/json', ...headers }, onUnauthorized })
        } catch (error) {
            throw new Error(`Falha ao acessar a URL ${url}`)
        }
    }

    public static async delete(url: string, headers?: any, onUnauthorized?: () => void) {
        try {
            return this.generica({ url, method: 'DELETE', headers, onUnauthorized })
        } catch (error) {
            throw new Error(`Falha ao acessar a URL ${url}`)
        }
    }
}