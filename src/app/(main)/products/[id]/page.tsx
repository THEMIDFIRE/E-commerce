import ProductDetails from '@/app/_components/ProductDetaails/ProductDetails'
import { getSpecificProduct } from '@/lib/products'

export default async function CustomProduct({ params }: { params: { id: string } }) {
    const id = await params.id
    const data = await getSpecificProduct(id)
    
    return <ProductDetails product={data} />
}
