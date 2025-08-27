"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
    return (
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover Amazing Products</h1>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                    Shop the latest trends and find everything you need in one place
                </p>
                <Link href="/products">
                    <Button size="lg" variant="secondary">
                        Shop Now
                    </Button>
                </Link>
            </div>
        </section>
    )
}
