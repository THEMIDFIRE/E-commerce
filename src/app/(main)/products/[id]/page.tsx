import ProductDetails from '@/app/_components/ProductDetails/ProductDetails'
import { getSpecificProduct } from '@/lib/api'

export default async function CustomProduct({ params }: { params: { id: string } }) {
    const id = await params.id
    const data = await getSpecificProduct(id)
    
    return <ProductDetails product={data} />
}
