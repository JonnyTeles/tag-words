"use client"
import React, { useEffect, useState } from 'react';
import ApiCard, { Tag, Word } from './components/api-card';
import { AxiosHttpClientAdapter, HttpClient } from '@/adapters/axios-adapter';

const Home: React.FC = () => {
    const [words, setWords] = useState<Word[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(true);
    const httpClient = new AxiosHttpClientAdapter();

    useEffect(() => {
        async function fetchData() {
            try {
                const wordsResponse = await getAllWords(httpClient);
                const tagsResponse = await getAllTags(httpClient);
                setWords(wordsResponse.body);
                setTags(tagsResponse.body);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    async function getAllWords(httpClient: HttpClient) {
        return await httpClient.request({
            url: 'http://localhost:3333/words/all',
            method: 'get'
        });
    }

    async function getAllTags(httpClient: HttpClient) {
        return await httpClient.request({
            url: 'http://localhost:3333/tags/all',
            method: 'get'
        });
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    console.log(words)

    return (
        <>
            <h1>TÁ FUNCIONANDO</h1>
            <ApiCard
                words={words}
                tags={tags} />
        </>
    );
};

export default Home;
