import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTag, createWord, deleteTag, deleteWord, fetchTags, fetchWords } from "../utils/api";
import { useRouter } from "next/navigation";
import { AxiosHttpClientAdapter } from "@/app/adapters/axios-adapter";
import { useState } from "react";
import { Tag } from "@/app/types/tag";
import { Word } from "@/app/types/word";
import { handleNotification } from "@/app/functions/notification-handler";

const httpClient = new AxiosHttpClientAdapter();

export const useCustomDashboardHooks = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [error, setError] = useState(false);

    const tagMutation = useMutation({
        mutationFn: (data: { tag: string }) => createTag(data, httpClient),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tags'] });
            handleNotification('success', 'Feito', 'Tag criada com sucesso!')
            router.push('/dashboard');
        },
        onError: (error: any) => {
            if (error.message.includes('cadastrada')) setError(true)
            handleNotification('error', 'Erro ao criar tag', error.message)
        }
    });

    const wordMutation = useMutation({
        mutationFn: (data: { word: string }) => createWord(data, httpClient),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['words'] });
            handleNotification('success', 'Feito', 'Palavra criada com sucesso!')
            router.push('/dashboard');
        },
        onError: (error: any) => {
            if (error.message.includes('cadastrada')) setError(true)
            handleNotification('error', 'Erro ao criar palavra', error.message)
        }
    });

    const deleteTagMutation = useMutation({
        mutationFn: (tagId: string) => deleteTag(tagId, httpClient)
    });

    const deleteWordMutation = useMutation({
        mutationFn: (wordId: string) => deleteWord(wordId, httpClient),
    });

    const handleDeleteWord = (wordId: string) => {
        deleteWordMutation.mutate(wordId, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['words'] });
                queryClient.setQueryData(['words'], (oldData: any) => {
                    const updatedWords = oldData.body.filter((word: any) => word.id !== wordId);
                    return { ...oldData, body: updatedWords };
                });
                handleNotification('success', 'Feito', 'Palavra deletada com sucesso!')
                router.push('/dashboard');
            },
            onError: (error: any) => {
                handleNotification('error', "Erro ao deletar palavra", error.message)
            }
        });
    };

    const handleDeleteTag = (tagId: string) => {
        deleteTagMutation.mutate(tagId, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['tags'] });
                queryClient.setQueryData(['tags'], (oldData: any) => {
                    const updatedTags = oldData.body.filter((tag: any) => tag.id !== tagId);
                    return { ...oldData, body: updatedTags };
                });
                handleNotification('success', 'Feito', 'Tag deletada com sucesso!')
                router.push('/dashboard');
            },
            onError: (error: any) => {
                handleNotification('error', "Erro ao deletar tag", error.message)
            }
        });
    };

    const { data: words, isLoading: wordsLoading } = useQuery({
        queryKey: ['words'],
        queryFn: () => fetchWords(httpClient),
        staleTime: 0,
        retry: 1,
        throwOnError() {
            return false
        }
    });

    const { data: tags, isLoading: tagsLoading } = useQuery({
        queryKey: ['tags'],
        queryFn: () => fetchTags(httpClient),
        staleTime: 0,
        retry: 1,
        throwOnError() {
            return false
        }
    });

    const handleAddWord = () => {
        router.push('?add=word&modal=true')
    }

    const handleAddTag = () => {
        router.push('?add=tag&modal=true')
    }

    const openDelete = (id: string, name: Word | Tag) => {
        const type = 'word' in name ? 'word' : 'tag';
        router.push(`?delete=${type}&id=${encodeURIComponent(id)}&modal=true`);
    };

    return {
        error,
        tagMutation,
        wordMutation,
        handleDeleteWord,
        handleDeleteTag,
        handleAddWord,
        handleAddTag,
        openDelete,
        words,
        wordsLoading,
        tags,
        tagsLoading
    }
}