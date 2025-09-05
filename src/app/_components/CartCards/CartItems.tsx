"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { useCart } from "@/context/CartContext";
import { rmvCartItem } from "@/lib/api";
import { ProductElement } from "@/types/All.type";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import Counter from "../shared/Counter";

export default function CartItems(item: ProductElement) {
    const { getCartData } = useCart();
    const handleRemove = async () => {
        const data = await rmvCartItem(item?.product?._id);
        getCartData()
        toast.success(data.status);
    };
    return (
        <>
            <TableRow key={item._id} className='hover:bg-gray-100'>
                <TableCell className='text-center'>
                    <Trash2 size={18} className='w-full hover:stroke-red-500 hover:cursor-pointer transition-colors' onClick={handleRemove} />
                </TableCell>
                <TableCell className="flex items-center gap-4">
                    <div className='size-14 bg-gray-400 rounded overflow-hidden'>
                        {item.product.imageCover && (
                            <Image
                                src={item.product.imageCover}
                                alt={item.product.title}
                                width={56}
                                height={56}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                    <div>
                        <h4 className="font-medium">{item.product.title}</h4>
                        <p className="text-sm text-gray-500">{item.product.brand.name}</p>
                    </div>
                </TableCell>
                <TableCell>{item.price} EGP</TableCell>
                <TableCell>
                    <div className='flex items-center justify-center'>
                        <Counter
                            className='border-2 rounded-full w-fit'
                            initialValue={item.count}
                        />
                    </div>
                </TableCell>
                <TableCell>{(item.price * item.count)} EGP</TableCell>
            </TableRow>

        </>
    )
}
