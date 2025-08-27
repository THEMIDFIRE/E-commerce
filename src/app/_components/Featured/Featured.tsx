import { Button } from "@/components/ui/button";
import ProdCard from "../shared/ProdCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { IProduct } from "@/app/types/product.type";

interface FeaturedProps {
    products: IProduct[];
}

export default function Featured({ products }: FeaturedProps) {
    return (
        <section className="bg-gray-50">
            <div className="container py-16 max-w-4/5 mx-auto">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                        <p className="text-gray-600 mt-2">Discover our newest and most exciting products</p>
                    </div>
                    <Button variant="outline" className="mt-5">
                        <Link href="/products" className="flex items-center gap-2">
                            View All
                            <ChevronRight size={16} />
                        </Link>
                    </Button>
                </div>

                {products.length > 0 ? (
                    <div className="inner mt-11 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
                        {products.map((product: IProduct) => (
                            <div key={product._id} className="relative">
                                <ProdCard product={product} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mt-11 text-center py-12">
                        <p className="text-gray-500 text-lg">No featured products available at the moment.</p>
                        <Button className="mt-4">
                            <Link href="/products">
                                Browse All Products
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}