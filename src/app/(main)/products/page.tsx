import { MobileFilters, SideFilters } from '@/app/_components/Filter/Filters';
import { SearchInput } from '@/app/_components/Filter/SearchInput';
import { ProdCard } from '@/app/_components/shared/AllCards';
import { getAllBrands, getAllCategories, getAllProducts, getSubcategories } from '@/lib/api';
import { IProduct } from '@/types/All.type';
import { Suspense } from 'react';
import SkeletonProducts from '../../_components/shared/SkeletonProducts';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

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
    const { metadata, data } = await getAllProducts(searchParams);
    const categories = await getAllCategories();
    const brands = await getAllBrands();
    const subcategories = await getSubcategories();

    const sortOptions = [
        { label: 'Lowest Price', value: 'price' },
        { label: 'Highest Price', value: '-price' },
        { label: 'Newest', value: '-createdAt' },
        { label: 'Oldest', value: 'createdAt' },
    ];

    const currentPage = metadata.currentPage
    const nextPage = metadata.nextPage
    const prevPage = metadata.prevPage

    const createPaginationUrl = (page: number) => {
        const params = new URLSearchParams();
        
        Object.entries(searchParams).forEach(([key, value]) => {
            if (key !== 'page' && value) {
                if (Array.isArray(value)) {
                    value.forEach(v => params.append(key, v));
                } else {
                    params.set(key, value);
                }
            }
        });
        
        if (page > 1) {
            params.set('page', page.toString());
        }
        
        return params.toString() ? `?${params.toString()}` : '/products';
    };


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
                            <Suspense fallback={<SkeletonProducts />}>
                                {data.map((product: IProduct) => (
                                    <ProdCard key={product._id} product={product} />
                                ))}
                            </Suspense>
                        </div>
                    </div>
                </div>
                <Pagination className='mx-auto mt-5'>
                    <PaginationContent>
                        {prevPage && (
                            <PaginationItem>
                                <PaginationPrevious href={createPaginationUrl(prevPage)}>Previous</PaginationPrevious>
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationLink href={createPaginationUrl(currentPage)} isActive>{currentPage}</PaginationLink>
                        </PaginationItem>
                        {nextPage && (
                            <PaginationItem>
                                <PaginationNext href={createPaginationUrl(nextPage)}>Next</PaginationNext>
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>
            </div>
        </section>
    )
}