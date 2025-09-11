import { BrandCard } from '@/app/_components/shared/AllCards';
import { getAllBrands } from '@/lib/api';
import { IBrand } from '@/types/All.type';

export default async function AllBrands() {
    const data = await getAllBrands();
    return (
        <section>
            <div className="container py-16 max-w-4/5 mx-auto">
                <h3 className="text-2xl font-bold text-center">Our variety of Brands</h3>
                <div className="inner mt-11 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
                    {data.map((brand: IBrand) => (
                        <BrandCard key={brand._id} brand={brand} />
                    ))}
                </div>
            </div>
        </section>
    )
}
