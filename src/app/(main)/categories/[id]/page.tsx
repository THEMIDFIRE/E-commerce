import { getSpecificCategory, getSubCategoriesForCategory } from '@/lib/api'
import { SubCatCard } from '@/app/_components/shared/AllCards'
import React from 'react'

export default async function Category({ params }: { params: { id: string } }) {
    const id = await params.id
    const [categoryData, subcategoriesData] = await Promise.all([
        getSpecificCategory(id),
        getSubCategoriesForCategory(id).catch(() => []) // Fallback to empty array if subcategories don't exist
    ])
    
    return (
        <section className='pt-4 pb-16'>
            <div className="container max-w-4/5 mx-auto">
                <h1 className="text-2xl font-bold mb-6">{categoryData?.name || 'Category'}</h1>
                
                {subcategoriesData && subcategoriesData.length > 0 ? (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Subcategories</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {subcategoriesData.map((subcategory: any) => (
                                <SubCatCard 
                                    key={subcategory._id} 
                                    subcategory={subcategory} 
                                    categoryId={id}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="text-gray-600">No subcategories available for this category.</p>
                )}
            </div>
        </section>
    )
}
