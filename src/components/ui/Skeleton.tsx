import React from 'react'

export const ProductSkeleton = () => {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
            <div className="aspect-[4/5] bg-gray-200" />
            <div className="p-5 space-y-3">
                <div className="flex justify-between items-start">
                    <div className="h-3 w-16 bg-gray-200 rounded" />
                    <div className="h-3 w-8 bg-gray-200 rounded" />
                </div>
                <div className="h-5 w-3/4 bg-gray-200 rounded" />
                <div className="h-6 w-1/4 bg-gray-200 rounded mt-4" />
            </div>
        </div>
    )
}

export const FilterSkeleton = () => {
    return (
        <div className="bg-white rounded-2xl p-6 space-y-8 animate-pulse">
            {[1, 2, 3].map((i) => (
                <div key={i} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <div className="h-4 w-20 bg-gray-200 rounded mb-4" />
                    <div className="space-y-3">
                        {[1, 2, 3, 4].map((j) => (
                            <div key={j} className="h-4 w-full bg-gray-100 rounded" />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
