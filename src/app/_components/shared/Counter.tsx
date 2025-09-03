"use client"

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface CounterProps {
    className?: string;
    initialValue?: number;
    onQuantityChange?: (quantity: number) => void;
}

export default function Counter({ className, initialValue = 1, onQuantityChange }: CounterProps) {
    const [quantity, setQuantity] = useState(initialValue);

    useEffect(() => {
        setQuantity(initialValue);
    }, [initialValue]);

    const increment = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onQuantityChange?.(newQuantity);
    };
    
    const decrement = () => {
        const newQuantity = Math.max(1, quantity - 1);
        setQuantity(newQuantity);
        onQuantityChange?.(newQuantity);
    };

    return (
        <div className={className}>
            <Button
                variant="ghost"
                size="sm"
                onClick={decrement}
                disabled={quantity === 1}
                className="hover:cursor-pointer"
            >
                −
            </Button>
            <span className="px-2 min-w-[50px] text-center text-sm">
                {quantity}
            </span>
            <Button
                variant="ghost"
                size="sm"
                onClick={increment}
                className="hover:cursor-pointer"
            >
                +
            </Button>
        </div>
    )
}