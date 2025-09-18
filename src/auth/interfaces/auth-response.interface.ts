import type { User } from "@/interfaces";

export interface AuthResponse {
    user:  User;
    token: string;
}

