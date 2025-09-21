import { getUserToken } from "./server-utils";
// Get User Data
export async function getUserData() {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/auth/verifyToken`, {
        cache: "no-store",
        headers: { token: await getUserToken() as string }
    });
    const data = await res.json();
    return data;
}
// Get All Products
export async function getAllProducts(params?: Record<string, string | string[]>) {
    let queryString = '';
    if (params) {
        const searchParams = new URLSearchParams();
        
        Object.entries(params).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(v => searchParams.append(key, v));
            } else if (value) {
                searchParams.append(key, value);
            }
        });
        
        queryString = `&${searchParams.toString()}`;
    }
    
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/products?limit=12${queryString}`, {
        cache: "force-cache"
    });
    const products = await res.json();
    return products;
}
// Get specific product details
export async function getSpecificProduct(id: string) {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/products/${id}`);
    const { data } = await res.json();
    return data;
}
// Get all categories
export async function getAllCategories() {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/categories`, {
        cache: "force-cache"
    });
    const { data } = await res.json();
    return data;
}
// Get specific category
export async function getSpecificCategory(id: string) {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/categories/${id}`);
    const { data } = await res.json();
    return data;
}
// Get subcategories for a specific category
export async function getSubCategoriesForCategory(id: string) {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/categories/${id}/subcategories`);
    const { data } = await res.json();
    return data;
}
// Get Subcategories data
export async function getSubcategories(id?: string) {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/subcategories/${id ? id : ""}`);
    const { data } = await res.json();
    return data;
}
// Get all brands
export async function getAllBrands() {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/brands`, {
        cache: "force-cache"
    });
    const { data } = await res.json();
    return data;
}
// Get specific brand
export async function getSpecificBrand(id: string) {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/brands/${id}`);
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
    const data = await res.json();
    return data;
}
// Forget Password
export async function forgetPassword(userEmail: any) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/forgotPasswords`, {
        method: 'POST',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userEmail)
    });
    const data = await res.json();
    return data
}
// Reset Code 
export async function resetCode(ResetCodeForm: any) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/verifyResetCode`, {
        method: 'POST',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ResetCodeForm)
    });
    const data = await res.json();
    return data
}
// Add new password
export async function newPassword(NewPasswordForm: any) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/resetPassword`, {
        method: 'PUT',
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(NewPasswordForm)
    })
    const data = await res.json();
    return data
}
// Update profile
export async function updateProfile(profileInfo: any) {
    const token = await getUserToken()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/updateMe`, {
        method: 'PUT',
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json', token: token as string },
        body: JSON.stringify(profileInfo)
    })
    const data = await res.json();
    return data
}
// Change password
export async function changePassword(passwordForm: any) {
    const token = await getUserToken()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/changeMyPassword`, {
        method: 'PUT',
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json', token: token as string },
        body: JSON.stringify(passwordForm)
    })
    const data = await res.json();
    return data
}
// Add User Addresses
export async function AddUserAddress(addressInfo: any) {
    const token = await getUserToken()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/addresses`, {
        method: 'POST',
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json', token: token as string },
        body: JSON.stringify(addressInfo)
    })
    const data = await res.json();
    return data
}
// Get User Addresses
export async function getUserAddresses() {
    const token = await getUserToken()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/addresses`, {
        cache: "no-store",
        headers: { token: token as string }
    });
    const data = await res.json();
    return data
}
// Remove User Address
export async function removeUserAddress(id: string) {
    const token = await getUserToken()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/addresses/${id}`, {
        method: 'DELETE',
        cache: 'no-store',
        headers: { token: token as string }
    })
    const data = await res.json();
    return data
}