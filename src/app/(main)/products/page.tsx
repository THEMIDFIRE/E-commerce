import Filters from '@/app/_components/Filter/Filters';
import { IProduct } from '@/app/types/All.type';
import { Input } from '@/components/ui/input';
import { getAllProducts } from '@/lib/api';
import { Suspense } from 'react';
import SkeletonProducts from '../../_components/shared/SkeletonProducts';
import { ProdCard } from '@/app/_components/shared/AllCards';


export default async function Products() {
    const data = await getAllProducts();

    return (
        <section>
            <div className="container max-w-4/5 mx-auto py-16">
                <div className="flex gap-8">
                    <Filters/>
                    <div className='grow'>
                        <h2 className='text-4xl font-bold'>Our Products</h2>
                        <Input type='search' placeholder='Search for a product' className='mt-8' />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mx-auto mt-4">
                            <Suspense fallback={<SkeletonProducts/>}>
                                {data.map((product: IProduct) => (
                                    <ProdCard key={product._id} product={product} />
                                ))}
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    )
}