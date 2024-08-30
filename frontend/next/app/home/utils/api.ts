import { HttpClient } from '@/app/adapters/axios-adapter';
import { getCookie } from 'cookies-next';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = () => ({
    headers: { "Authorization": `Bearer ${getCookie("jwt")}` },
});

export const fetchWords = async (httpClient: HttpClient) =>
    httpClient.request({
        url: `${apiUrl}/words/get-yours`,
        method: 'get',
        ...getAuthHeaders(),
    });

export const fetchTags = async (httpClient: HttpClient) =>
    httpClient.request({
        url: `${apiUrl}/tags/get-yours`,
        method: 'get',
        ...getAuthHeaders(),
    });

export const createTag = async (data: { tag: string }, httpClient: HttpClient) =>
    httpClient.request({
        url: `${apiUrl}/tags/create`,
        method: 'post',
        body: data,
        ...getAuthHeaders(),
    });

export const createWord = async (data: { word: string }, httpClient: HttpClient) =>
    httpClient.request({
        url: `${apiUrl}/words/create`,
        method: 'post',
        body: data,
        ...getAuthHeaders(),
    });

export const deleteTag = async (tagId: string, httpClient: HttpClient) =>
    httpClient.request({
        url: `${apiUrl}/tags/delete?id=${tagId}`,
        method: 'delete',
        ...getAuthHeaders(),
    });

export const deleteWord = async (wordId: string, httpClient: HttpClient) =>
    httpClient.request({
        url: `${apiUrl}/words/delete?id=${wordId}`,
        method: 'delete',
        ...getAuthHeaders(),
    });
