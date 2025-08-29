"use client"
import { ICategory } from "@/app/types/category.type";
import { Card, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function ItemCard() {
    return (
        <>
            <Card className="p-0 rounded-2xl overflow-hidden relative shadow-md">
                <div className="img h-52 w-full px-5 bg-gray-400/50"></div>
                <CardTitle className="absolute bottom-1 left-1/2 -translate-x-1/2 -translate-y-1/2">Category</CardTitle>
            </Card>
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
