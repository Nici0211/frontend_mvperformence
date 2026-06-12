import type { ICustomer } from "../interface/ICustomer";
import { loginApi } from "../api/auth";


export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: ICustomer;
    kunde: ICustomer;
}


const TOKEN_KEY = "token";
const KUNDE_KEY = "loggedInKunde";


const AuthService = {
    /**
     * Logs in against the backend (POST /api/auth/login).
     * Stores JWT token and user data in localStorage.
     */
    async login(data: LoginRequest): Promise<LoginResponse> {
        const res = await loginApi(data);

        localStorage.setItem(TOKEN_KEY, res.token);
        localStorage.setItem(KUNDE_KEY, JSON.stringify(res.user));

        return { ...res, kunde: res.user };
    },

    /**
     * Logout: removes token and user data from localStorage.
     */
    logout(): void {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(KUNDE_KEY);
    },

    /**
     * Returns the stored JWT token (or null).
     */
    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    },

    /**
     * Returns the logged-in user (or null).
     */
    getKunde(): ICustomer | null {
        const raw = localStorage.getItem(KUNDE_KEY);
        if (!raw) return null;
        try {
            return JSON.parse(raw) as ICustomer;
        } catch {
            return null;
        }
    },

    /**
     * Returns whether a user is logged in.
     */
    isLoggedIn(): boolean {
        return !!this.getToken();
    },

    /**
     * Returns whether the logged-in user is an admin.
     */
    isAdmin(): boolean {
        return this.getKunde()?.role === "ADMIN";
    },
};

export default AuthService;
