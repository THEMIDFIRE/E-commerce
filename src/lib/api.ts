import { getUserToken } from "./server-utils";

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
export async function getSpecificProduct(id: string) {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/products/${id}`);
    if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
    }
    const { data } = await res.json();
    return data;
}

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

export async function getSpecificCategory(id: string) {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/categories/${id}`);
    if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
    }
    const { data } = await res.json();
    return data;
}
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

export async function getSpecificBrand(id: string) {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/brands/${id}`);
    if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
    }
    const { data } = await res.json();
    return data;
}

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
export async function addToCart(productId: string) {
    const token = await getUserToken()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart`, {
        method: "POST",
        cache: "no-store",
        headers: { token: token as string, "Content-Type": "application/json" },
        body: JSON.stringify({ productId})
    });
    if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
}

// export async function updateCartQuantity(id: string, quantity: number) {
//     const token = await getUserToken()
//     const res = await fetch(`${process.env.API_BASE_URL}/api/v1/cart/${id}`, {
//         method: "PUT",
//         headers: { token: token as string },
//         body: JSON.stringify({ quantity })
//     });
//     if (!res.ok) {
//         throw new Error(`Error: ${res.statusText}`);
//     }
//     const { data } = await res.json();
//     return data;
// }

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