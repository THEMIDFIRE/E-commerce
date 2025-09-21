import { getSubcategories } from "@/lib/api"

export default async function SubCategory({ params }: { params: { id: string, subcategory: string } }) {
    const subcategoryId = params.subcategory
    const subcategory = await getSubcategories(subcategoryId)
    
    return (
        <section className="pt-4 pb-16">
            <div className="container max-w-4/5 mx-auto">
                <h1 className="text-2xl font-bold mb-6">{subcategory.name}</h1>
            </div>
        </section>
    )
}
