"use client"
import { ProdCard } from "@/app/_components/shared/AllCards";
import { useWishlist } from "@/context/UserContext";

export default function Wishlist() {
    const { wishlist } = useWishlist();
    
    return (
        <section>
            <div className="container max-w-4/5 mx-auto my-10">
                <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {wishlist?.data?.map((product: any) => (
                        <ProdCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}
