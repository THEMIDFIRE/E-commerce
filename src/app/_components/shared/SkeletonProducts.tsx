"use client"

import { LoadingCard } from "./AllCards"


export default function SkeletonProducts() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mx-auto mt-4">
            {Array(8).fill(null).map((_, index) => (
                <LoadingCard key={index} />
            ))}
        </div>
    )
}
