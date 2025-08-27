"use client"

import Filters from "@/app/_components/Filter/Filters"
import LoadingCard from "@/app/_components/shared/LoadingCard"
import { Input } from "@/components/ui/input"

export default function loading() {
    return (
        <section>
            <div className="container max-w-4/5 mx-auto py-16">
                <div className="flex gap-8">
                    <Filters />
                    <div className='grow'>
                        <h2 className='text-4xl font-bold'>Our Products</h2>
                        <Input type='search' placeholder='Search for a product' className='mt-8' />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mx-auto mt-4">
                            {Array(8).fill(null).map((_, index) => (
                                <LoadingCard/>
                            ))}
                        </div>
                    </div>
                </div>
            </div >
        </section >
    )
}
