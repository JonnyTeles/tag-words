"use client";
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ApiCard from './components/api-card';
import { AxiosHttpClientAdapter } from '@/app/adapters/axios-adapter';
import { useRouter } from 'next/navigation';
import Notification from 'design-system/components/Notification';
import Skeleton from 'design-system/components/Skeleton';
import { createTag, createWord, deleteTag, deleteWord, fetchTags, fetchWords } from './utils/api';
import TagForm from './components/tag-form';
import WordForm from './components/word-form';
import UserActions from './components/user-actions';

const httpClient = new AxiosHttpClientAdapter();

const UserPage: React.FC = () => {
    const queryClient = useQueryClient();
    const [tagForm, setTagForm] = useState(false);
    const [wordForm, setWordForm] = useState(false);

    const { data: words, isLoading: wordsLoading } = useQuery({
        queryKey: ['words'],
        queryFn: () => fetchWords(httpClient),
        staleTime: 60000,
        retry: false
    });

    const { data: tags, isLoading: tagsLoading } = useQuery({
        queryKey: ['tags'],
        queryFn: () => fetchTags(httpClient),
        staleTime: 60000,
        retry: false
    });

    const tagMutation = useMutation({
        mutationFn: (data: { tag: string }) => createTag(data, httpClient),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tags'] });
            Notification.success("Feito", "Tag criada com sucesso!");
        },
        onError: (error: any) => {
            Notification.error("Erro ao criar Tag", error.message);
        }
    });

    const wordMutation = useMutation({
        mutationFn: (data: { word: string }) => createWord(data, httpClient),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['words'] });
            Notification.success("Feito", "Palavra criada com sucesso!");
        },
        onError: (error: any) => {
            Notification.error("Erro ao criar Palavra", error.message);
        }
    });

    const deleteTagMutation = useMutation({
        mutationFn: (tagId: string) => deleteTag(tagId, httpClient)
    });

    const deleteWordMutation = useMutation({
        mutationFn: (wordId: string) => deleteWord(wordId, httpClient),
    });

    const handleTagSubmit = (values: { tag: string }) => {
        tagMutation.mutate(values);
        setTagForm(false);
    };

    const handleWordSubmit = (values: { word: string }) => {
        wordMutation.mutate(values);
        setWordForm(false);
    };

    const handleDeleteWord = (wordId: string) => {
        deleteWordMutation.mutate(wordId, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['words'] });
                queryClient.setQueryData(['words'], (oldData: any) => {
                    const updatedWords = oldData.body.filter((word: any) => word.id !== wordId);
                    return { ...oldData, body: updatedWords };
                });
                Notification.success("Feito", "Palavra deletada com sucesso!");
            },
            onError: (error: any) => {
                Notification.error("Erro ao deletar palavra", error.message);
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
                Notification.success("Feito", "Tag deletada com sucesso!");
            },
            onError: (error: any) => {
                Notification.error("Erro ao deletar Tag", error.message);
            }
        });
    };

    if (wordsLoading || tagsLoading ) {
        return <Skeleton active />;
    }

    return (
        <div className='p-2 mt-2'>
            <div className='flex items-center gap-2 m-2'>
                {tagForm &&
                    <TagForm onSubmit={handleTagSubmit} onCancel={() => setTagForm(false)} />
                }
                {wordForm &&
                    <WordForm onSubmit={handleWordSubmit} onCancel={() => setWordForm(false)} />
                }
            </div>
            <UserActions
                onAddWord={() => setWordForm(!wordForm)}
                onAddTag={() => setTagForm(!tagForm)}
            />
            <ApiCard
                words={words?.body}
                tags={tags?.body}
                loading={wordsLoading}
                delete={{ deleteTags: handleDeleteTag, deleteWords: handleDeleteWord }}
            />
        </div>
    );
};

export default UserPage;
