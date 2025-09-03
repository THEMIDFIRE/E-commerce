"use client"
import { IBrand, ICategory, IProduct } from "@/types/All.type";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { HeartIcon, ShoppingCart, Slash, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { addToCart } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { getUserToken } from "@/lib/server-utils";

export function BrandCard({ brand }: { brand: IBrand }) {
    return (
        <>
            <Link href={`/brands/${brand._id}`}>
                <Card className="p-0 rounded-2xl overflow-hidden relative shadow-md">
                    <div className="img h-52 w-full px-5 bg-accent rounded-xl">
                        <img src={brand.image} alt={brand.name} className="w-full h-full object-contain" />
                    </div>
                    <CardTitle className="absolute bottom-1 left-1/2 -translate-x-1/2 -translate-y-1/2">{brand.name}</CardTitle>
                </Card>
            </Link>
        </>
    )
}
export function CatCard({ category }: { category: ICategory }) {
    return (
        <>
            <Link href={`/categories/${category._id}`}>
                <Card className="p-5 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="img h-52 w-full px-5 bg-accent rounded-xl">
                        <img src={category.image} alt={category.name} className="w-full h-full object-contain" />
                    </div>
                    <CardTitle className="text-center">{category.name}</CardTitle>
                </Card>
            </Link>
        </>
    )
}

export function ProdCard({ product }: { product: IProduct }) {
    const { getCartData } = useCart();
    
    const handleAddToCart = async () => {
        const token = await getUserToken()
        if (token) {
            toast.promise(addToCart(product._id), {
                loading: 'Adding to cart...',
                success: 'Added to cart',
                error: 'Failed to add'
            })
            getCartData();
        }
    }

    return (
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
                    <ShoppingCart size={20} className="hover:fill-accent-foreground hover:cursor-pointer" onClick={handleAddToCart} />
                    <HeartIcon size={20} className="hover:fill-red-500 hover:stroke-red-500 hover:cursor-pointer" />
                </div>
            </div>
            <Link href={`/products/${product._id}`}>

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
            </Link >
        </Card>
    )
}

export function LoadingCard() {
    return (
        <>
            <Card className="py-4 hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gray-100 rounded-2xl relative mx-4 shadow-sm">
                    <div className="min-h-52 bg-gray-100 rounded-2xl relative mx-4 shadow-sm">
                        <Skeleton className="aspect-square h-52 rounded-2xl" />
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 flex gap-2.5">
                        <button aria-label="Add to cart">
                            <ShoppingCart size={20} />
                        </button>
                        <button aria-label="Add to wishlist">
                            <HeartIcon size={20} />
                        </button>
                    </div>
                </div>
                <CardHeader>
                    <CardTitle className="text-xl line-clamp-1">
                        <Skeleton className="w-12 h-5" />
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1.5">
                        <Skeleton className="w-7 h-5" />
                        <Skeleton className="w-5 h-5" />
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {Array(3).fill(null).map((_, index) => <Skeleton key={index} className="w-1/2 h-5" />)}
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <Skeleton className="w-1/2 h-5" />
                    <div className="flex gap-1 items-center">
                        <Skeleton className="w-5 h-5" />
                        <StarIcon
                            size={16}
                            color="#FFD700"
                        />
                        <Skeleton className="w-5 h-5" />
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}
