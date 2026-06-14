export interface RequestOptions {
    endpoint: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    addCookies?: boolean;
    dataToSend?: Record<string, unknown>;
}