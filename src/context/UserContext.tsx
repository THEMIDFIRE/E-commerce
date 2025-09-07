"use client"
import { getUserCart, getUserWishlist } from "@/lib/api";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface IUserContext {
    getCartData: () => Promise<void>;
    cart: any;
    cartCount: number
    getWishlistData: () => Promise<void>;
    wishlist: any;
    wishlistCount: number
}

export const userContext = createContext<IUserContext | undefined>(undefined)

export default function userContextProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState(null)
    const [cartCount, setCartCount] = useState(0)
    const [wishlist, setWishlist] = useState(null)
    const [wishlistCount, setWishlistCount] = useState(0)
    const { data } = useSession();
    const getCartData = async () => {
        try {
            const cart = await getUserCart();
            setCart(cart);
            setCartCount(cart?.numOfCartItems)
        } catch (error) {
            console.log('error', error);
        }
    }
    const getWishlistData = async () => {
        try {
            const wishlist = await getUserWishlist()
            setWishlist(wishlist);
            setWishlistCount(wishlist?.count)
        } catch (error) {
            console.log('error', error);
        }
    }
    useEffect(() => {
        if (data?.user) {
            getCartData();
            getWishlistData()
        }
    }, [data?.user])

    const value = { getCartData, cart, cartCount, getWishlistData, wishlist, wishlistCount };

    return (
        <userContext.Provider value={value}>{children}</userContext.Provider>
    )
}
export const useCart = () => {
    const cartContext = useContext(userContext);
    if (cartContext === undefined) {
        throw new Error("Can't use Cart, login first.");
    }
    return cartContext;
}
export const useWishlist = () => {
    const wishlistContext = useContext(userContext);
    if (wishlistContext === undefined) {
        throw new Error("Can't use Cart, login first.");
    }
    return wishlistContext;
}

