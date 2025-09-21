"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useCart, useWishlist } from "@/context/UserContext";
import { addToCart, addToWishlist, rmvFromWishlist } from "@/lib/api";
import { getUserToken } from "@/lib/server-utils";
import { IBrand, ICategory, IOrder, IProduct } from "@/types/All.type";
import { HeartIcon, ShoppingCart, Slash, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import GoBack from "./GoBack";

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

export function SubCatCard({ subcategory, categoryId }: { subcategory: IBrand, categoryId: string }) {
    return (
        <>
            <Link href={`/categories/${categoryId}/${subcategory._id}`}>
                <Card className="p-5 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="img h-52 w-full px-5 bg-accent rounded-xl">
                        {subcategory.image ? (
                            <img src={subcategory.image} alt={subcategory.name} className="w-full h-full object-contain" />
                        ) : (
                            <div className="h-full flex justify-center items-center">No Image</div>
                        )}
                    </div>
                    <CardTitle className="text-center">{subcategory.name}</CardTitle>
                </Card>
            </Link>
        </>
    )
}

export function ProdCard({ product }: { product: IProduct }) {
    const { getCartData } = useCart();
    const { getWishlistData, wishlist } = useWishlist()

    const isInWishlist = wishlist?.data?.some((item: any) => item._id === product._id)

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
    const handleWishlistToggle = async () => {
        const token = await getUserToken()
        if (token) {
            if (isInWishlist) {
                toast.promise(rmvFromWishlist(product._id), {
                    loading: 'Removing from Wishlist...',
                    success: 'Removed from Wishlist',
                    error: 'Failed to remove'
                })
            } else {
                toast.promise(addToWishlist(product._id), {
                    loading: 'Adding to Wishlist...',
                    success: 'Added to Wishlist',
                    error: 'Failed to add'
                })
            }
            getWishlistData();
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
                <div className="absolute bottom-2.5 right-2.5 flex gap-2.5 dark:bg-black">
                    <ShoppingCart size={20} className="hover:fill-accent-foreground hover:cursor-pointer" onClick={handleAddToCart} />
                    <HeartIcon
                        size={20}
                        className={`hover:cursor-pointer ${isInWishlist
                            ? "fill-red-500 stroke-red-500"
                            : "hover:fill-red-500 hover:stroke-red-500"
                            }`}
                        onClick={handleWishlistToggle}
                    />
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

export function OrderCard({ order }: { order: IOrder }) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getDeliveryStatus = (isDelivered: boolean) => {
        return isDelivered ? 'Delivered' : 'Processing';
    };

    const getPaymentStatus = (isPaid: boolean) => {
        return isPaid ? 'Paid' : 'Pending';
    };

    return (
        <TableRow className="hover:bg-gray-100 text-center">
            <TableCell className="font-medium">#{order.id}</TableCell>
            <TableCell>{formatDate(order.createdAt)}</TableCell>
            <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${order.isDelivered
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {getDeliveryStatus(order.isDelivered)}
                </span>
            </TableCell>
            <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${order.isPaid
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                    }`}>
                    {getPaymentStatus(order.isPaid)}
                </span>
            </TableCell>
            <TableCell className="font-semibold">{order.totalOrderPrice} EGP</TableCell>
            <TableCell>
                <Link
                    href={`allorders/${order._id}`}
                    className="text-blue-600 hover:text-blue-800 underline"
                >
                    View Order Details
                </Link>
            </TableCell>
        </TableRow>
    )
}
export function OrderCardSkeleton() {

    return (
        <TableRow className="hover:bg-gray-100">
            <TableCell>
                <Skeleton className="h-3 w-1/2 bg-gray-300" />
            </TableCell>
            <TableCell>
                <Skeleton className="h-3 w-1/2 bg-gray-300" />
            </TableCell>
            <TableCell>
                <Skeleton className="h-3 w-1/2 bg-gray-300" />
            </TableCell>
            <TableCell>
                <Skeleton className="h-3 w-1/2 bg-gray-300" />
            </TableCell>
            <TableCell className="flex gap-2 items-center">
                <Skeleton className="h-3 w-1/2 bg-gray-300" />EGP</TableCell>
            <TableCell>
                <Skeleton className="h-3 w-1/2 bg-gray-300" />
            </TableCell>
        </TableRow>
    )
}

export function OrderDetailsSkeleton() {
    return (
        <section>
            <div className="container max-w-4/5 mx-auto my-10">
            <GoBack/>
                <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                <div className="mb-6 p-4 bg-gray-100 shadow rounded-lg flex items-center justify-evenly">
                    <p className="flex items-center gap-2"><span className="font-semibold">Order ID:</span> # <Skeleton className="h-3 w-10 bg-gray-300" /></p>
                    <p className="flex items-center gap-2"><span className="font-semibold">Payment Method:</span> <Skeleton className="h-3 w-10 bg-gray-300" /></p>
                    <p className="flex items-center gap-2"><span className="font-semibold">Status:</span> <Skeleton className="h-3 w-10 bg-gray-300" /></p>
                    <p className="flex items-center gap-2"><span className="font-semibold">Total:</span>  EGP <Skeleton className="h-3 w-10 bg-gray-300" /></p>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-200 hover:bg-gray-100">
                            <TableCell>Product</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="hover:bg-gray-100">
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <div className="img">
                                        <Skeleton className="size-10 bg-gray-300" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-medium"><Skeleton className="h-3 w-10 bg-gray-300" /></p>
                                        <p className="text-sm text-gray-500"><Skeleton className="h-3 w-10 bg-gray-300" /></p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="flex items-center gap-2"><Skeleton className="h-3 w-10 bg-gray-300" /> EGP</TableCell>
                            <TableCell><Skeleton className="h-3 w-10 bg-gray-300" /></TableCell>
                            <TableCell className="flex items-center gap-2"><Skeleton className="h-3 w-10 bg-gray-300" /> EGP</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}