import { getSpecificBrand } from '@/lib/api'
import React from 'react'

export default async function Brand({ params }: { params: { id: string } }) {
    const id = params.id
    const brand = await getSpecificBrand(id)
    
    return (
        <section className="pt-4 pb-16">
            <div className="container max-w-4/5 mx-auto">
                <h1 className="text-2xl font-bold mb-6">{brand.name}</h1>
            </div>
        </section>
    )
}
