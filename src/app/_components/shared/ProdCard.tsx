"use client"
import { IProduct } from "@/app/types/product.type";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartIcon, ShoppingCart, Slash, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function ProdCard({ product }: { product: IProduct }) {

    return (
        <Link href={`/products/${product._id}`}>
            <Card className="py-4 hover:shadow-lg transition-shadow duration-300">
                <div className="min-h-52 bg-gray-100 rounded-2xl relative mx-4 shadow-sm">
                    {product.imageCover ? (
                        <Image
                            src={product.imageCover}
                            alt={product.title}
                            fill
                            className="object-contain w-full"
                        />
                    ) : (
                        <div className="h-full bg-gray-300 flex items-center justify-center text-gray-500">
                            No Image
                        </div>
                    )}
                    <div className="absolute top-2.5 left-2.5 flex gap-2 items-center">
                        {product.quantity > 0 ? (
                            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                                In Stock ({product.quantity})
                            </span>
                        ) : (
                            <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">
                                Out of Stock
                            </span>
                        )}
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 flex gap-2.5">
                        <button aria-label="Add to cart">
                            <ShoppingCart size={20} className="hover:fill-accent-foreground" />
                        </button>
                        <button aria-label="Add to wishlist">
                            <HeartIcon size={20} className="hover:fill-red-500 hover:stroke-red-500" />
                        </button>
                    </div>
                </div>
                <CardHeader>
                    <CardTitle className="text-xl line-clamp-1">
                        {product.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1.5">
                        {product.category.name}
                        <Slash size={15} />
                        {product.brand.name}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm line-clamp-2">
                        {product.description || "No description available"}
                    </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <p className="font-semibold text-lg">
                        {product.price} EGP
                    </p>
                    <div className="flex gap-1 items-center">
                        <p className="text-sm font-medium">
                            {product.ratingsAverage?.toFixed(1) || "0.0"}
                        </p>
                        <StarIcon
                            size={16}
                            color="#FFD700"
                            fill={product.ratingsAverage > 0 ? "#FFD700" : "none"}
                        />
                        <span className="text-xs text-gray-500 ml-1">
                            ({product.ratingsQuantity})
                        </span>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}