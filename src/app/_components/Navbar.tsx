"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import Image from "next/image";

import { ChevronDown } from "lucide-react";
import cartIcon from "../../assets/icons/cart.svg";
import userIcon from "../../assets/icons/user.svg";

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
            <NavigationMenu className="max-w-4/5 mx-auto justify-between py-10">
                {/* Logo Section */}
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/" className="text-xl font-bold text-primary">
                            Route E-Commerce
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>

                {/* Main Navigation */}
                <NavigationMenuList className=" gap-6 grow">
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

                <NavigationMenuList className="flex gap-2">
                    <NavigationMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex gap-1 items-center">
                                <Image src={userIcon} alt="User Icon" width={20} height={20} />
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
                                    <NavigationMenuLink>
                                        Log out
                                    </NavigationMenuLink>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink href="/cart">
                            <Image src={cartIcon} alt="Cart Icon" width={20} height={20} />
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </>
    )
}
