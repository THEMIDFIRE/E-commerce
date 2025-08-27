"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { HeartIcon, ShoppingCart, StarIcon } from "lucide-react"

export default function LoadingCard() {
    return (
        <>
            <Card className="py-4 hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gray-100 rounded-2xl relative mx-4 shadow-sm">
                    <div className="shadow-sm">
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
                        <Skeleton className="w-1/2 h-5" />
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1.5">
                        <Skeleton className="w-5 h-5" />
                        <Skeleton className="w-5 h-5" />
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {Array(3).fill(null).map((_, index) => <Skeleton className="w-1/2 h-5" />)}
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
