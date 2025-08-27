
export async function getAllProducts() {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
        cache: "force-cache"
    });
    if (!res.ok) {
        return { error: res.statusText }
    }
    const { data } = await res.json();
    return data;
}
export async function getSpecificProduct(id: string) {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    if (!res.ok) {
        return { error: res.statusText }
    }
    const { data } = await res.json();
    return data;
}
