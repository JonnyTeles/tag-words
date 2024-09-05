import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchTagById, fetchWordById } from "../utils/api";
import { AxiosHttpClientAdapter } from "@/app/adapters/axios-adapter";

const httpClient = new AxiosHttpClientAdapter();

export const useCustomDeleteHooks = () => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const [params, setParams] = useState<string | null>(null);
    const [id, setId] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        const search = searchParams.get('delete');
        const id = searchParams.get('id') || '';
        const decodedId = decodeURIComponent(id) || ''
        setParams(search === 'tag' || search === 'word' ? search : null)
        setId(decodedId)
    }, [searchParams]);

    const { data: tag, isFetched: isTagFetched } = useQuery({
        queryKey: ['tag', id],
        queryFn: () => fetchTagById(httpClient, id),
        staleTime: 0,
        retry: 1,
        enabled: params === 'tag' && !!id,
        throwOnError() {
            return false;
        }
    });

    const { data: word, isFetched: isWordFetched } = useQuery({
        queryKey: ['word', id],
        queryFn: () => fetchWordById(httpClient, id),
        staleTime: 0,
        retry: 1,
        enabled: params === 'word' && !!id,
        throwOnError() {
            return false;
        }
    });

    useEffect(() => {
        if (isTagFetched || isWordFetched) {
            if (params === 'tag' && tag) {
                setName(tag.body.tag);
                return;
            }

            if (params === 'word' && word) {
                setName(word.body.word);
                return;
            }

            if ((params === 'tag' && tag === undefined) || (params === 'word' && word === undefined)) {
                router.push('/dashboard');
            }
        }
    }, [isTagFetched, isWordFetched, params, tag, word, router]);

    const handleCancel = () => {
        router.push('/dashboard');
    };
    //TODO - COLOCAR IS TAG FETCHED NO MODAL 
    return {
        params,
        id,
        name,
        handleCancel
    }
}