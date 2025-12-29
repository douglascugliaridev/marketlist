export interface RegisterDto {
    name: string;
    email: string;
    password: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface AuthResponse {
    userId: string;
    name: string;
    email: string;
    token: string;
}
