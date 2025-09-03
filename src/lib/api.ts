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
        headers: { token }
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
        headers: { token }
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
        headers: { token, "Content-Type": "application/json" },
        body: JSON.stringify({ productId})
    });
    if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
}

export async function updateCartQuantity(id: string, quantity: number) {
    const token = await getUserToken()
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/cart/${id}`, {
        method: "PUT",
        headers: { token },
        body: JSON.stringify({ quantity })
    });
    if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
    }
    const { data } = await res.json();
    return data;
}