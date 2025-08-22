"use client"

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import Link from "next/link";

{/* <NavigationMenu>
    <NavigationMenuList>
        <NavigationMenuItem>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
            <NavigationMenuContent>
                <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
        </NavigationMenuItem>
    </NavigationMenuList>
</NavigationMenu> */}

// Categories
// Brands
//Products

const categories: { name: string; href: string }[] = [
    {
        "name": "Music",
        "href": "#"
    },
    {
        "name": "Men's Fashion",
        "href": "#"
    },
    {
        "name": "Women's Fashion",
        "href": "#"
    },
    {
        "name": "SuperMarket",
        "href": "#"
    },
    {
        "name": "Baby & Toys",
        "href": "#"
    },
    {
        "name": "Home",
        "href": "#"
    },
    {
        "name": "Books",
        "href": "#"
    },
    {
        "name": "Beauty & Health",
        "href": "#"
    },
    {
        "name": "Mobiles",
        "href": "#"
    },
    {
        "name": "Electronics",
        "href": "#"
    }
]
const brands: { name: string; href: string }[] = [
    {
        "name": "Canon",
        "href": "#"
    },
    {
        "name": "Dell",
        "href": "#"
    },
    {
        "name": "Lenovo",
        "href": "#"
    },
    {
        "name": "SONY",
        "href": "#"
    },
    {
        "name": "Infinix",
        "href": "#"
    },
    {
        "name": "Realme",
        "href": "#"
    },
    {
        "name": "HONOR",
        "href": "#"
    },
    {
        "name": "Nokia",
        "href": "#"
    },
    {
        "name": "OPPO",
        "href": "#"
    },
    {
        "name": "Huawei",
        "href": "#"
    },
    {
        "name": "Apple",
        "href": "#"
    },
    {
        "name": "Xiaomi",
        "href": "#"
    },
    {
        "name": "Samsung",
        "href": "#"
    },
    {
        "name": "Jack & Jones",
        "href": "#"
    },
    {
        "name": "LC Waikiki",
        "href": "#"
    },
    {
        "name": "Andora",
        "href": "#"
    },
    {
        "name": "Puma",
        "href": "#"
    },
    {
        "name": "Skechers",
        "href": "#"
    },
    {
        "name": "Reserved",
        "href": "#"
    },
    {
        "name": "Reebok",
        "href": "#"
    },
    {
        "name": "Adidas",
        "href": "#"
    },
    {
        "name": "Nike",
        "href": "#"
    },
    {
        "name": "DeFacto",
        "href": "#"
    },
    {
        "name": "Beko",
        "href": "#"
    },
    {
        "name": "Kenwood",
        "href": "#"
    },
    {
        "name": "Black + Decker",
        "href": "#"
    },
    {
        "name": "Mienta",
        "href": "#"
    },
    {
        "name": "Fresh",
        "href": "#"
    },
    {
        "name": "Philips",
        "href": "#"
    },
    {
        "name": "Toshiba",
        "href": "#"
    },
    {
        "name": "Tornado",
        "href": "#"
    },
    {
        "name": "Braun",
        "href": "#"
    },
    {
        "name": "Garnier",
        "href": "#"
    },
    {
        "name": "Essence",
        "href": "#"
    },
    {
        "name": "Bourjois",
        "href": "#"
    },
    {
        "name": "Kemei",
        "href": "#"
    },
    {
        "name": "Carolina Herrera",
        "href": "#"
    },
    {
        "name": "Calvin Klein",
        "href": "#"
    },
    {
        "name": "Loreal",
        "href": "#"
    },
    {
        "name": "Maybelline",
        "href": "#"
    }
]

export default function Navbar() {
    return (
        <>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="/">Home</Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/products">Products</Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Brands</NavigationMenuTrigger>
                        <NavigationMenuContent className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-4">
                            {brands.map((brand) => (
                                <NavigationMenuLink key={brand.name} href={brand.href}>{brand.name}</NavigationMenuLink>
                            ))}
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                        <NavigationMenuContent className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-2">
                            {categories.map((category) => (
                                <NavigationMenuLink key={category.name} href={category.href}>{category.name}</NavigationMenuLink>
                            ))}
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </>
    )
}
