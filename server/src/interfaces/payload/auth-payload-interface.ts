// Create interface for login request body
export interface ILoginRequest {
    email: string;
    password: string;
    remember: boolean;
}