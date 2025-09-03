import { ICategory } from "@/types/All.type";
import { CatCard } from "../shared/AllCards";

export default function Categories({ category }: { category: ICategory[] }) {
    return (
        <section>
            <div className="container py-16 max-w-4/5 mx-auto">
                <h3 className="text-2xl font-bold text-center">Our variety of categories</h3>
                <div className="inner mt-11 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
                    {category.map((category: ICategory) => (
                        <CatCard key={category._id} category={category} />
                    ))}
                </div>
            </div>
        </section>
    )
}
