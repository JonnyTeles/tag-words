"use client";
import React from 'react';
import ApiCard from './components/api-card';
import Skeleton from 'design-system/components/Skeleton';
import { useCustomDashboard } from './hooks/useCustomDashboard';

const Dashboard: React.FC = () => {
    const { tags, words, tagsLoading, wordsLoading } = useCustomDashboard()

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

export default Dashboard;
