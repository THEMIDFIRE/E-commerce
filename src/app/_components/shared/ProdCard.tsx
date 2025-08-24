import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartIcon, ShoppingCart, StarIcon } from "lucide-react";

export default function ProdCard() {
    return (
        <Card>
            <div className="img h-52 w-full px-5">
                <div className="h-full bg-gray-400/50 rounded-2xl"></div>
            </div>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
                <CardAction className="flex gap-2">
                    <ShoppingCart/>
                    <HeartIcon color="#000" fill="#000"/>
                </CardAction>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
                <div className="flex gap-1">
                    <p className="line-through text-gray-400">230 EGP</p>
                    <p className="salePrice">150 EGP</p>
                </div>
                <div className="flex gap-1">
                    <p>4.8</p>
                    <StarIcon color="#FFD700" fill="#FFD700"/>
                </div>
            </CardContent>
        </Card>
    )
}
