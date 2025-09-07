import { getUserToken } from "./server-utils";

// Get All Products
export async function getAllProducts() {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/products`, {
        cache: "force-cache"
    });
    if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
    }
    const { data } = await res.json();
    return data;
}
// Get specific product details
export async function getSpecificProduct(id: string) {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/products/${id}`);
    if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
    }
    const { data } = await res.json();
    return data;
}
// Get all categories
export async function getAllCategories() {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/categories`, {
        cache: "force-cache"
    });
    if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
    }
    const { data } = await res.json();
    return data;
}
// Get specific category
export async function getSpecificCategory(id: string) {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/categories/${id}`);
    if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
    }
    const { data } = await res.json();
    return data;
}
// Get subcategories for a specific category
export async function getSubCategoriesForCategory(id: string) {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/categories/${id}/subcategories`);
    if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
    }
    const { data } = await res.json();
    return data;
}
// Get Subcategories data
export async function getSpecificSubcategory(id: string) {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/subcategories/${id}`);
    if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
    }
    const { data } = await res.json();
    return data;
}
// Get all brands
export async function getAllBrands() {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/brands`, {
        cache: "force-cache"
    });
    if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
    }
    const { data } = await res.json();
    return data;
}
// Get specific brand
export async function getSpecificBrand(id: string) {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/brands/${id}`);
    if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
    }
    const { data } = await res.json();
    return data;
}
// Get user cart
export async function getUserCart() {
    const token = await getUserToken()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart`, {
        cache: "no-store",
        headers: { token: token as string }
    });
    if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
}
// Add product to Cart
export async function addToCart(productId: string) {
    const token = await getUserToken()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart`, {
        method: "POST",
        cache: "no-store",
        headers: { token: token as string, "Content-Type": "application/json" },
        body: JSON.stringify({ productId })
    });
    if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
}
// Update product quantity
export async function updateCartQuantity(productId: string, count: number) {
    const token = await getUserToken()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart/${productId}`, {
        method: "PUT",
        cache: "no-store",
        headers: {
            token: token as string,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ count: count.toString() })
    });
    if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
}
// Remove product from Cart
export async function rmvCartItem(id?: string) {
    const token = await getUserToken()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart/${id ? id : ""}`, {
        method: "DELETE",
        cache: "no-store",
        headers: { token: token as string }
    });
    if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
}
// Get user Wishlist
export async function getUserWishlist() {
    const token = await getUserToken()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/wishlist`, {
        cache: "no-store",
        headers: { token: token as string }
    });
    if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
}
// Add product to Wishlist
export async function addToWishlist(productId: string) {
    const token = await getUserToken()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/wishlist`, {
        method: "POST",
        cache: "no-store",
        headers: { token: token as string, "Content-Type": "application/json" },
        body: JSON.stringify({ productId })
    });
    if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
}
// Remove product from Wishlist
export async function rmvFromWishlist(productId: string) {
    const token = await getUserToken()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/wishlist/${productId}`, {
        method: "DELETE",
        cache: "no-store",
        headers: { token: token as string }
    });
    if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
}
// Checkout using Cash on Delivery payment method
export async function checkoutCOD(cartId: string, formData: any) {
    const token = await getUserToken()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/${cartId}`, {
        method: "POST",
        cache: "no-store",
        headers: { token: token as string, "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    });
    if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
    }
    const result = await res.json();
    return result;
}
// Get user's order history
export async function getUserOrders(userId: string) {
    const token = await getUserToken()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/user/${userId}`, {
        cache: "no-store",
        headers: { token: token as string }
    });
    if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
}

// Create online card checkout session and return redirect URL
export async function createCardCheckoutSession(cartId: string, returnUrl: string) {
    const token = await getUserToken()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(returnUrl)}`, {
        method: "POST",
        cache: "no-store",
        headers: { token: token as string }
    });
    if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
}