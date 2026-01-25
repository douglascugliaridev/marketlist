import Cookies from "js-cookie";

interface Usuario {
    name: string;
    email: string;
    token: string;
    userId: string;
}

export class CookieSession {

    private static readonly COOKIE_NAME = 'sessionMarketList';

    static create(valor: string) {
        Cookies.set(this.COOKIE_NAME, valor, {
            expires: 1,
            sameSite: "None",
            secure: true
        });
    }

    static get(): Usuario | null {
        const cookie = Cookies.get(this.COOKIE_NAME);
        if (cookie) {
            return JSON.parse(cookie);
        }
        return null;
    }

    static remove() {
        Cookies.remove(this.COOKIE_NAME);
    }

    static manager(usuario: Usuario) {
        if (usuario) {
            this.create(JSON.stringify(usuario));
        } else {
            this.remove();
        }
    }
}
