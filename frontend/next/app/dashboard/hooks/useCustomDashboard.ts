import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTag, createWord, deleteTag, deleteWord, fetchTags, fetchWords } from "../utils/api";
import { useRouter } from "next/navigation";
import { AxiosHttpClientAdapter } from "@/app/adapters/axios-adapter";
import Notification from "design-system/components/Notification";
import { useState } from "react";
import { usePagination } from "./usePagination";
import { Tag } from "@/app/types/tag";
import { Word } from "@/app/types/word";

const httpClient = new AxiosHttpClientAdapter();

export const useCustomDashboardHooks = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [error, setError] = useState(false);
    const { handleDeleteTagPagination, handleDeleteWordPagination } = usePagination()

    const tagMutation = useMutation({
        mutationFn: (data: { tag: string }) => createTag(data, httpClient),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tags'], refetchType: 'all' });
            Notification.success({ message: "Feito", description: "Tag criada com sucesso!", duration: 5, showProgress: true });
            router.push('/dashboard');
        },
        onError: (error: any) => {
            if (error.message.includes('cadastrada')) setError(true)
            Notification.error({ message: "Erro ao criar tag", description: error.message, duration: 5, showProgress: true });
        }
    });

    const wordMutation = useMutation({
        mutationFn: (data: { word: string }) => createWord(data, httpClient),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['words'], refetchType: 'all' });
            Notification.success({ message: "Feito", description: "Palavra criada com sucesso!", duration: 5, showProgress: true });
            router.push('/dashboard');
        },
        onError: (error: any) => {
            if (error.message.includes('cadastrada')) setError(true)
            Notification.error({ message: "Erro ao criar palavra", description: error.message, duration: 5, showProgress: true });
        }
    });

    const deleteTagMutation = useMutation({
        mutationFn: (tagId: string) => deleteTag(tagId, httpClient)
    });

    const deleteWordMutation = useMutation({
        mutationFn: (wordId: string) => deleteWord(wordId, httpClient),
    });

    /*OLD
        const handleDeleteWord = (wordId: string) => {
            deleteWordMutation.mutate(wordId, {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['words'] });
                    queryClient.setQueryData(['words'], (oldData: any) => {
                        const updatedWords = oldData.body.filter((word: any) => word.id !== wordId);
                        return { ...oldData, body: updatedWords };
                    });
                    handleDeleteWordPagination()
                    Notification.success({ message: "Feito", description: "Palavra deletada com sucesso!", duration: 5, showProgress: true });
                    router.push('/dashboard');
                },
                onError: (error: any) => {
                    Notification.error({ message: "Erro ao deletar palavra", description: error.message, duration: 5, showProgress: true });
                }
            });
        };
    */

    const handleDeleteWord = (wordId: string) => {
        deleteWordMutation.mutate(wordId, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['words'], refetchType: 'all' })
                handleDeleteWordPagination()
                Notification.success({ message: "Feito", description: "Palavra deletada com sucesso!", duration: 5, showProgress: true });
                router.push('/dashboard');
            },
            onError: (error: any) => {
                Notification.error({ message: "Erro ao deletar palavra", description: error.message, duration: 5, showProgress: true });
            }
        });
    };

    const handleDeleteTag = (tagId: string) => {
        deleteTagMutation.mutate(tagId, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['tags'], refetchType: 'all' });
                handleDeleteTagPagination()
                Notification.success({ message: "Feito", description: "Tag deletada com sucesso!", duration: 5, showProgress: true });
                router.push('/dashboard');
            },
            onError: (error: any) => {
                Notification.error({ message: "Erro ao deletar tag", description: error.message, duration: 5, showProgress: true });
            }
        });
    };

    const { data: words, isLoading: wordsLoading } = useQuery({
        queryKey: ['words'],
        queryFn: () => fetchWords(httpClient),
        staleTime: 60000,
        retry: 1,
        throwOnError() {
            return false
        },
        enabled: true
    });

    const { data: tags, isLoading: tagsLoading } = useQuery({
        queryKey: ['tags'],
        queryFn: () => fetchTags(httpClient),
        staleTime: 60000,
        retry: 1,
        throwOnError() {
            return false
        },
        enabled: true
    });

    const handleAddWord = () => {
        router.push('?add=word&modal=true')
    }

    const handleAddTag = () => {
        router.push('?add=tag&modal=true')
    }

    const openDelete = (id: string, name: Word | Tag) => {
        const objName = 'word' in name ? name.word : name.tag;
        const type = 'word' in name ? 'word' : 'tag';
        router.push(`?delete=${type}&name=${encodeURIComponent(objName)}&id=${encodeURIComponent(id)}&modal=true`);
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