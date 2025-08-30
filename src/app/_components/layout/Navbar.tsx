"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

import { IBrand, ICategory } from "@/app/types/All.type";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChevronDown, Heart, Menu, ShoppingBag, ShoppingCart, UserCogIcon, UserRound } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar({ categories, brands }: { categories: ICategory[], brands: IBrand[] }) {
    const { data: session } = useSession();

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
                                        <NavigationMenuLink href="/categories">
                                            Categories
                                        </NavigationMenuLink>
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent className="grid w-[400px] gap-3 p-6 md:w-[600px] md:grid-cols-2 lg:grid-cols-3">
                                        {categories.map((category) => (
                                            <NavigationMenuLink
                                                key={category.name}
                                                href={`/categories/${category._id}`}
                                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                            >
                                                <div className="text-sm font-medium leading-none">{category.name}</div>
                                            </NavigationMenuLink>
                                        ))}
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="h-9">
                                        <NavigationMenuLink href="/brands">
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
                                            <Link href="/" className="block py-2">Home</Link>
                                            <Link href="/products" className="block py-2">Products</Link>
                                            <Accordion type="single" collapsible>
                                                <AccordionItem value="item-1" className="border-b-0 mb-4">
                                                    <AccordionTrigger className="text-[16px] p-0">
                                                        <Link href="/categories">Categories</Link>
                                                    </AccordionTrigger>
                                                    <AccordionContent className="grid grid-cols-2 gap-4 mt-2">
                                                        {categories.map((category) => (
                                                            <Link
                                                                key={category.name}
                                                                href={`/categories/${category._id}`}
                                                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                            >
                                                                <div className="text-sm font-medium leading-none">{category.name}</div>
                                                            </Link>
                                                        ))}
                                                    </AccordionContent>
                                                </AccordionItem>
                                                <AccordionItem value="item-2" className="">
                                                    <AccordionTrigger className="text-[16px] p-0 border-none">
                                                        <Link href="/brands">Brands</Link>
                                                    </AccordionTrigger>
                                                    <AccordionContent className="grid grid-cols-2 gap-4 mt-2">
                                                        {brands.map((brand) => (
                                                            <Link
                                                                key={brand.name}
                                                                href={"/brands/" + brand.name.toLowerCase()}
                                                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                            >
                                                                <div className="text-sm font-medium leading-none">{brand.name}</div>
                                                            </Link>
                                                        ))}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                            <SheetFooter className="flex flex-col gap-2 mt-6">
                                                {session ? (
                                                    <>
                                                        <Link href="/account" className="block py-2">My Account</Link>
                                                        <Link href="/orders" className="block py-2">My Orders</Link>
                                                        <Link href="/wishlist" className="block py-2">My Wishlist</Link>
                                                        <Link href="/cart" className="block py-2">My Cart</Link>
                                                        <Button onClick={() => signOut()}>
                                                            Logout
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <Link href="/login" className="block py-2">Login</Link>
                                                )}
                                            </SheetFooter>
                                        </SheetContent>
                                    </Sheet>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </div>

                        <div className="order-3 md:order-4">
                            <NavigationMenuList className="md:gap-x-2 hidden md:flex">
                                {session ? (
                                    <NavigationMenuItem>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="flex gap-1 items-center">
                                                <UserRound />
                                                <ChevronDown className="size-4" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>
                                                    <p>{session.user?.name || 'User'}</p>
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem asChild>
                                                    <NavigationMenuLink href="/account">
                                                        <UserCogIcon/> My Account
                                                    </NavigationMenuLink>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <NavigationMenuLink href="/orders">
                                                        <ShoppingBag/> My Orders
                                                    </NavigationMenuLink>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <NavigationMenuLink href="/wishlist">
                                                        <Heart/> My Wishlist
                                                    </NavigationMenuLink>
                                                </DropdownMenuItem>
                                                <NavigationMenuItem asChild>
                                                    <NavigationMenuLink href="/cart">
                                                        <ShoppingCart /> My Cart
                                                    </NavigationMenuLink>
                                                </NavigationMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Button
                                                        variant="ghost"
                                                        className="w-full justify-start p-0 h-auto font-normal"
                                                        onClick={() => signOut()}
                                                    >
                                                        Log out
                                                    </Button>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </NavigationMenuItem>
                                ) : (
                                    <NavigationMenuItem>
                                        <Link href="/login" className="flex gap-1 items-center">
                                            <UserRound />
                                            Login
                                        </Link>
                                    </NavigationMenuItem>
                                )}

                            </NavigationMenuList>
                        </div>
                    </NavigationMenu>
                </div>
            </header>
        </>
    )
}