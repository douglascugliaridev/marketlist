import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("O hook useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
}