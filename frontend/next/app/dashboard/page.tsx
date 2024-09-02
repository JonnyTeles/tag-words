"use client";
import React from 'react';
import ApiCard from './components/api-card';
import Skeleton from 'design-system/components/Skeleton';
import { useCustomDashboardHooks } from './hooks/useCustomDashboard';

const UserPage: React.FC = () => {
    const { tags, words, tagsLoading, wordsLoading } = useCustomDashboardHooks()

    if (wordsLoading || tagsLoading) {
        return <Skeleton active />;
    }

    return (
        <div className='p-2 mt-2'>
            <ApiCard
                words={words?.body}
                tags={tags?.body}
                loading={wordsLoading}
            />
        </div>
    );
};

export default UserPage;
