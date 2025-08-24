"use client"
import { Input } from "@/components/ui/input";

export default function Hero() {
    return (
        <section className="min-h-svh flex flex-col justify-center items-center">
            <div className="container max-w-4/5 md:max-w-1/2">
                <div className="inner text-center">
                    <h1 className="text-4xl font-bold">Route E-Commerce Final Project</h1>
                    <p className="text-gray-400 my-9">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla nunc in molestie feugiat. Nunc auctor consectetur elit, quis pulvina. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla nunc in molestie feugiat</p>
                    <Input type="search" className="max-w-4/5 mx-auto rounded-4xl" placeholder="Search for a product" />
                </div>
            </div>
        </section>
    )
}
