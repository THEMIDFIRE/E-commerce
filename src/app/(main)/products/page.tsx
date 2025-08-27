import Filters from '@/app/_components/Filter/Filters';
import ProdCard from '@/app/_components/shared/ProdCard';
import { IProduct } from '@/app/types/product.type';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';


export default async function Products() {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/products");
    const { data } = await res.json();
    console.log('res', res)
    console.log('data', data)

    return (
        <section>
            <div className="container max-w-4/5 mx-auto py-16">
                <div className="flex gap-8">
                    <Filters/>
                    <div className='grow'>
                        <h2 className='text-4xl font-bold'>Our Products</h2>
                        <Input type='search' placeholder='Search for a product' className='mt-8' />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mx-auto mt-4">
                            {data.map((product: IProduct) => (
                                <ProdCard key={product._id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div >
        </section >
    )
}