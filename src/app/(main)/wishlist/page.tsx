"use client"
import { ProdCard } from "@/app/_components/shared/AllCards";
import { useWishlist } from "@/context/UserContext";

export default function Wishlist() {
    const { wishlist } = useWishlist();
    const products = wishlist?.data ?? [];
    
    return (
        <section>
            <div className="container max-w-4/5 mx-auto my-10">
                <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
                {products.length === 0 ? (
                    <p className="text-gray-600">There is no products in your wishlist, click the heart icon to add some</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product: any) => (
                            <ProdCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
