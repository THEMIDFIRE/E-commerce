import { MobileFilters, SideFilters } from '@/app/_components/Filter/Filters';
import { IProduct } from '@/types/All.type';
import { getAllBrands, getAllCategories, getAllProducts, getSubcategories } from '@/lib/api';
import { Suspense } from 'react';
import SkeletonProducts from '../../_components/shared/SkeletonProducts';
import { ProdCard } from '@/app/_components/shared/AllCards';
import { SearchInput } from '@/app/_components/Filter/SearchInput';

interface ProductsPageProps {
  searchParams: {
    keyword?: string;
    sort?: string;
    brand?: string;
    'category[in]'?: string | string[];
    'price[gte]'?: string;
    'price[lte]'?: string;
  };
}

export default async function Products({ searchParams }: ProductsPageProps) {
    const data = await getAllProducts(searchParams);
    const categories = await getAllCategories();
    const brands = await getAllBrands();
    const subcategories = await getSubcategories();
    
    const sortOptions = [
        { label: 'Lowest Price', value: 'price' },
        { label: 'Highest Price', value: '-price' },
        { label: 'Newest', value: '-createdAt' },
        { label: 'Oldest', value: 'createdAt' },
    ];

    return (
        <section>
            <div className="container max-w-4/5 mx-auto py-16">
                <div className="flex gap-8">
                    <SideFilters 
                        categories={categories} 
                        brands={brands} 
                        sortOptions={sortOptions} 
                        subcategories={subcategories} 
                        initialFilters={searchParams}
                    />
                    <div className='grow'>
                        <h2 className='text-4xl font-bold'>Our Products</h2>
                        
                        <SearchInput />
                        
                        <MobileFilters 
                            categories={categories} 
                            brands={brands} 
                            sortOptions={sortOptions} 
                            subcategories={subcategories} 
                            initialFilters={searchParams}
                        />
                        
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