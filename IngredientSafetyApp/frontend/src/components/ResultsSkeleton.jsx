import React from 'react';

const ResultsSkeleton = () => {
    return (
        <div className="max-w-4xl mx-auto w-full pb-10 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Score Card Skeleton */}
                <div className="glass-card p-8 flex flex-col items-center justify-center h-64">
                    <div className="w-48 h-48 rounded-full bg-white/10" />
                    <div className="mt-6 w-32 h-8 bg-white/10 rounded" />
                    <div className="mt-2 w-48 h-4 bg-white/10 rounded" />
                </div>

                {/* Summary Card Skeleton */}
                <div className="glass-card p-8 h-64">
                    <div className="w-40 h-6 bg-white/10 rounded mb-4" />
                    <div className="space-y-3">
                        <div className="w-full h-4 bg-white/10 rounded" />
                        <div className="w-3/4 h-4 bg-white/10 rounded" />
                        <div className="w-5/6 h-4 bg-white/10 rounded" />
                    </div>
                </div>
            </div>

            {/* List Skeleton */}
            <div className="glass-card p-6 mt-6">
                <div className="w-40 h-6 bg-white/10 rounded mb-4" />
                <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-white/10" />
                            <div className="flex-1 space-y-2">
                                <div className="w-1/3 h-5 bg-white/10 rounded" />
                                <div className="w-2/3 h-4 bg-white/10 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResultsSkeleton;
