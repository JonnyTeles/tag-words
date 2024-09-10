import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRelation, deleteRelation, fetchTags, fetchWordById } from "../../utils/api";
import { AxiosHttpClientAdapter } from "@/app/adapters/axios-adapter";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { handleNotification } from "@/app/functions/notification-handler";

const httpClient = new AxiosHttpClientAdapter();

export const useCustomWord = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const params = useParams();
    const pathName = usePathname();
    const id = params.wordId as string;
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(false)

    const { data: word, isLoading: isWordLoading, isFetched: isWordFetched, isError: isWordError } = useQuery({
        queryKey: ['word', id],
        queryFn: () => fetchWordById(httpClient, id),
        staleTime: 0,
        retry: 1,
        enabled: pathName.includes('word') && !!id,
        throwOnError: false
    });

    const { data: tags, } = useQuery({
        queryKey: ['tags'],
        queryFn: () => fetchTags(httpClient),
        staleTime: 0,
        retry: 1,
        enabled: pathName.includes('word') && !!id,
        throwOnError: false
    });

    const deleteTagMutation = useMutation({
        mutationFn: (relationId: string) => deleteRelation(relationId, httpClient)
    });

    const handleDeleteTag = (relationId: string) => {
        deleteTagMutation.mutate(relationId, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['word', id] });
                queryClient.invalidateQueries({ queryKey: ['tags'] });

                handleNotification('success', 'Feito', 'Relação excluída da palavra com sucesso!');
            },
            onError: (error: any) => {
                handleNotification('error', "Erro ao deletar relação", error.message);
            }
        });
    };

    const relationMutation = useMutation({
        mutationFn: (data: { wordId: string, tagIds: string[] }) => createRelation(data.wordId, data.tagIds, httpClient),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['word', id] });
            queryClient.invalidateQueries({ queryKey: ['tags'] });
            handleNotification('success', 'Feito', 'Relação criada com sucesso!')
            setOpen(!open)
            setError(false)
        },
        onError: (error: any) => {
            console.error(error);
            setError(true)
            handleNotification('error', 'Erro ao criar relação', error.message);
        }
    });

    useEffect(() => {
        if (isWordError || (!isWordLoading && (!word || !word.body))) {
            router.push('/dashboard');
        }
    }, [isWordError, isWordLoading, word, router]);

    const handleBackDashboard = () => {
        router.push('/dashboard')
    }

    return {
        word,
        tags,
        isWordLoading,
        isWordFetched,
        isWordError,
        handleDeleteTag,
        handleBackDashboard,
        relationMutation,
        open,
        setOpen,
        setError,
        error
    };
};