"use client"
import { getUserCart, getUserWishlist, getUserAddresses } from "@/lib/api";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface Address {
    _id: string;
    name: string;
    details: string;
    phone: string;
    city: string;
}

interface IUserContext {
    getCartData: () => Promise<void>;
    cart: any;
    cartCount: number
    getWishlistData: () => Promise<void>;
    wishlist: any;
    wishlistCount: number
    getAddressesData: () => Promise<void>;
    addresses: Address[];
}

export const userContext = createContext<IUserContext | undefined>(undefined)

export default function userContextProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState(null)
    const [cartCount, setCartCount] = useState(0)
    const [wishlist, setWishlist] = useState(null)
    const [wishlistCount, setWishlistCount] = useState(0)
    const [addresses, setAddresses] = useState<Address[]>([])
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
    const getAddressesData = async () => {
        try {
            const addressesData = await getUserAddresses();
            setAddresses(addressesData?.data || []);
        } catch (error) {
            console.log('error', error);
        }
    }
    useEffect(() => {
        if (data?.user) {
            getCartData();
            getWishlistData();
            getAddressesData();
        }
    }, [data?.user])

    const value = { getCartData, cart, cartCount, getWishlistData, wishlist, wishlistCount, getAddressesData, addresses };

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
        throw new Error("Can't use Wishlist, login first.");
    }
    return wishlistContext;
}

export const useAddresses = () => {
    const addressContext = useContext(userContext);
    if (addressContext === undefined) {
        throw new Error("Can't use Addresses, login first.");
    }
    return addressContext;
}

