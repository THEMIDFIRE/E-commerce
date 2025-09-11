import { Button } from "@/components/ui/button";
import { IProduct } from "@/types/All.type";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ProdCard } from "../shared/AllCards";


export default function Popular({ products }: { products: IProduct[] }) {
    return (
        <section>
            <div className="container py-16 max-w-4/5 mx-auto">
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold">Most Popular Products</h3>
                    <Button className="mt-5">
                        <Link href="/products" className="flex items-center gap-2">
                            View All
                            <ChevronRight />
                        </Link>
                    </Button>
                </div>
                <div className="inner mt-11 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
                    {products.map((product: IProduct) => (
                        <ProdCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}