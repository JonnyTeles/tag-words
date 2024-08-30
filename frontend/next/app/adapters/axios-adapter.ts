import axios, { AxiosError, AxiosResponse } from "axios";

type HttpRequest = {
    url: string;
    method: 'get' | 'post' | 'put' | 'patch' | 'delete';
    body?: any;
    headers?: any;
}

export interface HttpClient<R = any> {
    request: (data: HttpRequest) => Promise<R>;
}

export class AxiosHttpClientAdapter implements HttpClient {
    async request(data: HttpRequest) {
        let axiosResponse: AxiosResponse;

        try {
            axiosResponse = await axios.request({
                url: data.url,
                method: data.method,
                data: data.body,
                headers: data.headers || {},
            });
        } catch (error) {
            const _error = error as AxiosError<{ message: string }>
            throw new Error(_error.response?.data.message || 'Erro interno do servidor')
        }
        return {
            statusCode: axiosResponse.status,
            body: axiosResponse.data
        }
    }
}