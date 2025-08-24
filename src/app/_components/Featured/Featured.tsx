import ProdCard from "../shared/ProdCard";

export default function Featured() {
    return (
        <section>
            <div className="container py-16 max-w-4/5 mx-auto">
                <h3 className="text-2xl font-bold">Featured Products</h3>
                <div className="inner mt-11 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
                    {new Array(4).fill(null).map((_, index) => (
                        <ProdCard key={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
