import ItemCard from "@/app/_components/shared/ItemCard";

export default function AllCategories() {
    return (
        <section>
            <div className="container py-16 max-w-4/5 mx-auto">
                <h3 className="text-2xl font-bold text-center">Our variety of Categories</h3>
                <div className="inner mt-11 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
                    {new Array(8).fill(null).map((_, index) => (
                        <ItemCard key={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
