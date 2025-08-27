
export async function getAllCategories() {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
        cache: "force-cache"
    });
    if (!res.ok) {
        return { error: res.statusText }
    }
    const { data } = await res.json();
    return data;
}
export async function getSpecificCategory(id: string) {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
    if (!res.ok) {
        return { error: res.statusText }
    }
    const { data } = await res.json();
    return data;
}
