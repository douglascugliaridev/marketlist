"use client"
import { CookieSession } from "@/utils/CookieSession";
import { createContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface Usuario {
    name: string;
    email: string;
    token: string;
    userId: string;
}

interface ContextProps {
    user: Usuario | null;
    login: (usuario: Usuario) => void;
    logout: () => void;
}

export const AuthContext = createContext<ContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<Usuario | null>(null);
    const router = useRouter();

    useEffect(() => {
        const usuario = CookieSession.get();
        if (usuario) {
            setUser(usuario);
        }
    }, []);

    const login = (usuario: Usuario) => {
        setUser(usuario);
        CookieSession.manager(usuario);
    };

    const logout = () => {
        router.push('/');
        setUser(null);
        CookieSession.remove();
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}