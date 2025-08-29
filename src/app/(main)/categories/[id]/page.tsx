import { getSpecificCategory } from '@/lib/categories'
import React from 'react'

export default async function Category({ params }: { params: { id: string } }) {
    const id = await params.id
    const data = await getSpecificCategory(id)
    return (
        <div>Category: {id}</div>
    )
}
