// "use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import Image from "next/image";

import { ChevronDown, Menu, ShoppingCart, UserRound } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const categories: { name: string; }[] = [
    { name: "Music" },
    { name: "Men's Fashion" },
    { name: "Women's Fashion" },
    { name: "SuperMarket" },
    { name: "Baby & Toys" },
    { name: "Home" },
    { name: "Books" },
    { name: "Beauty & Health" },
    { name: "Mobiles" },
    { name: "Electronics" }
]

const brands: { name: string; }[] = [
    { "name": "Canon" },
    { "name": "Dell" },
    { "name": "Lenovo" },
    { "name": "SONY" },
    { "name": "Infinix" },
    { "name": "Realme" },
    { "name": "HONOR" },
    { "name": "Nokia" },
    { "name": "OPPO" },
    { "name": "Huawei" },
    { "name": "Apple" },
    { "name": "Xiaomi" },
    { "name": "Samsung" },
    { "name": "Jack & Jones" },
    { "name": "LC Waikiki" },
    { "name": "Andora" },
    { "name": "Puma" },
    { "name": "Skechers" },
    { "name": "Reserved" },
    { "name": "Reebok" },
    { "name": "Adidas" },
    { "name": "Nike" },
    { "name": "DeFacto" },
    { "name": "Beko" },
    { "name": "Kenwood" },
    { "name": "Black + Decker" },
    { "name": "Mienta" },
    { "name": "Fresh" },
    { "name": "Philips" },
    { "name": "Toshiba" },
    { "name": "Tornado" },
    { "name": "Braun" },
    { "name": "Garnier" },
    { "name": "Essence" },
    { "name": "Bourjois" },
    { "name": "Kemei" },
    { "name": "Carolina Herrera" },
    { "name": "Calvin Klein" },
    { "name": "Loreal" },
    { "name": "Maybelline" }
]

export default function Navbar() {
    return (
        <>
            <header>
                <div className="container max-w-full">
                    <NavigationMenu className="max-w-4/5 mx-auto justify-between py-10">
                        {/* Logo Section */}
                        <div>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuLink href="/" className="text-xl font-bold text-primary">
                                        Route E-Commerce
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </div>

                        {/* Main Navigation */}
                        <div>
                            <NavigationMenuList className="md:gap-x-2 lg:gap-x-6 grow hidden md:flex">
                                <NavigationMenuItem>
                                    <NavigationMenuLink href="/" className="h-9 px-4 py-2 rounded-md bg-background hover:bg-accent hover:text-accent-foreground transition-colors">
                                        Home
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink href="/products" className="h-9 px-4 py-2 rounded-md bg-background hover:bg-accent hover:text-accent-foreground transition-colors">
                                        Products
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="h-9">
                                        <NavigationMenuLink>
                                            Categories
                                        </NavigationMenuLink>
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent className="grid w-[400px] gap-3 p-6 md:w-[600px] md:grid-cols-2 lg:grid-cols-3">
                                        {categories.map((category) => (
                                            <NavigationMenuLink
                                                key={category.name}
                                                href={"/categories/" + category.name.toLowerCase()}
                                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                            >
                                                <div className="text-sm font-medium leading-none">{category.name}</div>
                                            </NavigationMenuLink>
                                        ))}
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="h-9">
                                        <NavigationMenuLink>
                                            Brands
                                        </NavigationMenuLink>
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent className="grid w-[400px] gap-3 p-6 md:w-[700px] md:grid-cols-4 lg:grid-cols-5">
                                        {brands.map((brand) => (
                                            <NavigationMenuLink
                                                key={brand.name}
                                                href={"/brands/" + brand.name.toLowerCase()}
                                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                            >
                                                <div className="text-sm font-medium leading-none">{brand.name}</div>
                                            </NavigationMenuLink>
                                        ))}
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </div>

                        {/* Mobile Navigation */}
                        <div className="order-4 md:order-3">
                            <NavigationMenuList className="md:hidden">
                                <NavigationMenuItem>
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <Button variant="outline">
                                                <Menu className="size-4" />
                                            </Button>
                                        </SheetTrigger>
                                        <SheetContent className="px-8 overflow-y-auto">
                                            <SheetHeader>
                                                <SheetTitle className="sr-only">Menu</SheetTitle>
                                            </SheetHeader>
                                            <Link href="/">Home</Link>
                                            <Link href="/products">Products</Link>
                                            <Accordion type="single" collapsible>
                                                <AccordionItem value="item-1" className="border-b-0 mb-4">
                                                    <AccordionTrigger className="text-[16px] p-0">Categories</AccordionTrigger>
                                                    <AccordionContent className="grid grid-cols-2 gap-4 mt-2">
                                                        {categories.map((category) => (
                                                            <Link
                                                                key={category.name}
                                                                href={"/categories/" + category.name.toLowerCase()}
                                                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                            >
                                                                <div className="text-sm font-medium leading-none">{category.name}</div>
                                                            </Link>
                                                        ))}
                                                    </AccordionContent>
                                                </AccordionItem>
                                                <AccordionItem value="item-2" className="">
                                                    <AccordionTrigger className="text-[16px] p-0 border-none">Brands</AccordionTrigger>
                                                    <AccordionContent className="grid grid-cols-2 gap-4 mt-2">
                                                        {brands.map((brand) => (
                                                            <NavigationMenuLink
                                                                key={brand.name}
                                                                href={"/brands/" + brand.name.toLowerCase()}
                                                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                            >
                                                                <div className="text-sm font-medium leading-none">{brand.name}</div>
                                                            </NavigationMenuLink>
                                                        ))}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                            <SheetFooter>
                                                <Link href="/account">My Account</Link>
                                                <Link href="/cart">My Cart</Link>
                                                <Link href="/orders">My Orders</Link>
                                                <Link href="/wishlist">My Wishlist</Link>
                                                <Link href="#">Log out</Link>
                                            </SheetFooter>
                                        </SheetContent>
                                    </Sheet>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </div>

                        <div className="order-3 md:order-4">
                            <NavigationMenuList className="md:gap--x-2 hidden md:flex">
                                <NavigationMenuItem>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="flex gap-1 items-center">
                                            <UserRound />
                                            <ChevronDown className="size-4" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>
                                                <p>John Doe</p>
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <NavigationMenuLink href={"/account"}>
                                                    My Account
                                                </NavigationMenuLink>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <NavigationMenuLink href={"/orders"}>
                                                    My Orders
                                                </NavigationMenuLink>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <NavigationMenuLink href={"/wishlist"}>
                                                    My Wishlist
                                                </NavigationMenuLink>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <NavigationMenuLink>
                                                    Log out
                                                </NavigationMenuLink>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink href="/cart">
                                        <ShoppingCart />
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </div>

                    </NavigationMenu>
                </div>
            </header>
        </>
    )
}
