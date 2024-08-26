"use client"
import React, { useEffect, useState } from 'react';
import ApiCard, { Tag, Word } from './components/api-card';
import { AxiosHttpClientAdapter, HttpClient } from '@/app/adapters/axios-adapter';
import { deleteCookie, getCookie } from 'cookies-next';
import Button from 'design-system/components/Button';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const UserPage: React.FC = () => {
    const { data: session } = useSession();
    const [words, setWords] = useState<Word[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(true);
    const httpClient = new AxiosHttpClientAdapter();
    const router = useRouter()
    const jwt = getCookie("jwt")
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
    }, [getAllWords, getAllTags, httpClient]);

    async function getAllWords(httpClient: HttpClient) {
        return await httpClient.request({
            url: `${process.env.NEXT_PUBLIC_API_URL}/words/all`,
            method: 'get',
            headers: { "Authorization": `Bearr ${jwt}` }
        });
    }

    async function getAllTags(httpClient: HttpClient) {
        return await httpClient.request({
            url: `${process.env.NEXT_PUBLIC_API_URL}/tags/all`,
            method: 'get',
            headers: { "Authorization": `Bearr ${jwt}` }
        });
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleLogout = async () => {
        await signOut({ redirect: false })
        deleteCookie("jwt")
        router.push('/api/auth/signin')
    }

    return (
        <>
            <h1>OLÁ {session?.user?.name}</h1>
            <ApiCard
                words={words}
                tags={tags} />
            <Button type='link' onClick={handleLogout}>Deslogar</Button>
        </>
    );
};

export default UserPage;
