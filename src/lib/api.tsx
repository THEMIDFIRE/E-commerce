
export async function getAllProducts() {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/products`, {
        cache: "force-cache"
    });
    if (!res.ok) {
        return { error: res.statusText }
    }
    const { data } = await res.json();
    return data;
}
export async function getSpecificProduct(id: string) {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/products/${id}`);
    if (!res.ok) {
        return { error: res.statusText }
    }
    const { data } = await res.json();
    return data;
}

export async function getAllCategories() {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/categories`, {
        cache: "force-cache"
    });
    if (!res.ok) {
        return { error: res.statusText }
    }
    const { data } = await res.json();
    return data;
}

export async function getSpecificCategory(id: string) {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/categories/${id}`);
    if (!res.ok) {
        return { error: res.statusText }
    }
    const { data } = await res.json();
    return data;
}
export async function getAllBrands() {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/brands`, {
        cache: "force-cache"
    });
    if (!res.ok) {
        return { error: res.statusText }
    }
    const { data } = await res.json();
    return data;
}

export async function getSpecificBrand(id: string) {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/brands/${id}`);
    if (!res.ok) {
        return { error: res.statusText }
    }
    const { data } = await res.json();
    return data;
}
