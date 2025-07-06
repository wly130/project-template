export interface LoginInfo {
    access_token: string;
    refresh_token: string;
    user_id: number;
}

export interface RefreshToken {
    access_token: string;
}