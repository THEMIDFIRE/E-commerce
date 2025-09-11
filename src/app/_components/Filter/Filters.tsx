'use client';

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { IBrand, ICategory, ISubcategory } from "@/types/All.type";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";

interface FilterProps {
    categories: ICategory[];
    brands: IBrand[];
    subcategories: ISubcategory[];
    sortOptions: { label: string; value: string; }[];
    initialFilters?: any;
}

export function SideFilters({
    categories,
    brands,
    subcategories,
    sortOptions,
    initialFilters = {}
}: FilterProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [selectedCategories, setSelectedCategories] = useState<string[]>(
        Array.isArray(initialFilters['category[in]'])
            ? initialFilters['category[in]']
            : initialFilters['category[in]'] ? [initialFilters['category[in]']] : []
    );
    const [selectedBrands, setSelectedBrands] = useState<string[]>(
        initialFilters.brand ? [initialFilters.brand] : []
    );
    const [selectedPriceRange, setSelectedPriceRange] = useState<string[]>([]);

    // Initialize state from URL params
    useEffect(() => {
        if (initialFilters['category[in]']) {
            setSelectedCategories(
                Array.isArray(initialFilters['category[in]'])
                    ? initialFilters['category[in]']
                    : [initialFilters['category[in]']]
            );
        }

        if (initialFilters.brand) {
            setSelectedBrands([initialFilters.brand]);
        }
    }, [initialFilters]);

    const updateSearchParams = (newParams: Record<string, string | string[] | null>) => {
        const params = new URLSearchParams(searchParams.toString());

        // Remove existing filter params
        ['category[in]', 'brand', 'price[gte]', 'price[lte]', 'sort'].forEach(param => {
            params.delete(param);
        });

        // Add new params
        Object.entries(newParams).forEach(([key, value]) => {
            if (value !== null) {
                if (Array.isArray(value)) {
                    value.forEach(v => params.append(key, v));
                } else {
                    params.set(key, value);
                }
            }
        });

        router.replace(`${pathname}?${params.toString()}`);
    };

    const handleCategoryChange = (categoryId: string, checked: boolean) => {
        const newCategories = checked
            ? [...selectedCategories, categoryId]
            : selectedCategories.filter(id => id !== categoryId);

        setSelectedCategories(newCategories);
        updateSearchParams({ 'category[in]': newCategories.length > 0 ? newCategories : null });
    };

    const handleBrandChange = (brandId: string, checked: boolean) => {
        const newBrands = checked
            ? [...selectedBrands, brandId]
            : selectedBrands.filter(id => id !== brandId);

        setSelectedBrands(newBrands);
        updateSearchParams({ brand: newBrands.length > 0 ? newBrands[0] : null });
    };

    const handlePriceRangeChange = (range: string, checked: boolean) => {
        let priceFilters: Record<string, string | null> = {};

        if (checked) {
            switch (range) {
                case '0-100':
                    priceFilters = { 'price[gte]': '0', 'price[lte]': '100' };
                    break;
                case '100-200':
                    priceFilters = { 'price[gte]': '100', 'price[lte]': '200' };
                    break;
                case '200-500':
                    priceFilters = { 'price[gte]': '200', 'price[lte]': '500' };
                    break;
                case '500-1000':
                    priceFilters = { 'price[gte]': '500', 'price[lte]': '1000' };
                    break;
            }
        } else {
            priceFilters = { 'price[gte]': null, 'price[lte]': null };
        }

        updateSearchParams(priceFilters);
    };

    const handleSortChange = (sortValue: string) => {
        updateSearchParams({ sort: sortValue });
    };

    return (
        <div className="hidden md:block lg:w-1/3">
            <h4 className='text-2xl font-bold mb-5'>Filters</h4>

            {/* Sort Dropdown */}
            <div className="mb-6">
                <Label className="text-sm font-medium mb-2 block">Sort By</Label>
                <Select onValueChange={handleSortChange} defaultValue={initialFilters.sort || ''}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select sort order" />
                    </SelectTrigger>
                    <SelectContent>
                        {sortOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <ScrollArea className='w-full lg:h-[450px] shadow px-10 py-4'>
                {/* Categories */}
                <div className='border-1 px-10 py-6'>
                    <h5 className='border-l-4 border-black ps-4 font-semibold'>Categories</h5>
                    <div className='mt-4'>
                        {categories.map((category) => (
                            <div className='flex items-center gap-2 mb-4' key={category._id}>
                                <Checkbox
                                    id={`category-${category._id}`}
                                    checked={selectedCategories.includes(category._id)}
                                    onCheckedChange={(checked) =>
                                        handleCategoryChange(category._id, checked as boolean)
                                    }
                                />
                                <Label htmlFor={`category-${category._id}`}>{category.name}</Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Subcategories */}
                <div className='border-1 px-10 py-6'>
                    <h5 className='border-l-4 border-black ps-4 font-semibold'>Subcategories</h5>
                    <div className='mt-4'>
                        {subcategories.map((subcategory) => (
                            <div className='flex items-center gap-2 mb-4' key={subcategory._id}>
                                <Checkbox id={`subcategory-${subcategory._id}`} />
                                <Label htmlFor={`subcategory-${subcategory._id}`}>{subcategory.name}</Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Brands */}
                <div className='border-1 px-10 py-6 my-8'>
                    <h5 className='border-l-4 border-black ps-4 font-semibold'>Brands</h5>
                    <div className='mt-4'>
                        {brands.map((brand) => (
                            <div className='flex items-center gap-2 mb-4' key={brand._id}>
                                <Checkbox
                                    id={`brand-${brand._id}`}
                                    checked={selectedBrands.includes(brand._id)}
                                    onCheckedChange={(checked) =>
                                        handleBrandChange(brand._id, checked as boolean)
                                    }
                                />
                                <Label htmlFor={`brand-${brand._id}`}>{brand.name}</Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div className='border-1 px-10 py-6'>
                    <h5 className='border-l-4 border-black ps-4 font-semibold'>Price Range</h5>
                    <div className='mt-4'>
                        {[
                            { label: '$0 - $100', value: '0-100' },
                            { label: '$100 - $200', value: '100-200' },
                            { label: '$200 - $500', value: '200-500' },
                            { label: '$500 - $1000', value: '500-1000' }
                        ].map((range) => (
                            <div className='flex items-center gap-2 mb-4' key={range.value}>
                                <Checkbox
                                    id={`price-range-${range.value}`}
                                    onCheckedChange={(checked) =>
                                        handlePriceRangeChange(range.value, checked as boolean)
                                    }
                                />
                                <Label htmlFor={`price-range-${range.value}`}>{range.label}</Label>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}

export function MobileFilters({
    categories,
    brands,
    subcategories,
    sortOptions,
    initialFilters = {}
}: FilterProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [selectedCategories, setSelectedCategories] = useState<string[]>(
        Array.isArray(initialFilters['category[in]'])
            ? initialFilters['category[in]']
            : initialFilters['category[in]'] ? [initialFilters['category[in]']] : []
    );
    const [selectedBrands, setSelectedBrands] = useState<string[]>(
        initialFilters.brand ? [initialFilters.brand] : []
    );

    const updateSearchParams = (newParams: Record<string, string | string[] | null>) => {
        const params = new URLSearchParams(searchParams.toString());

        // Remove existing filter params
        ['category[in]', 'brand', 'price[gte]', 'price[lte]', 'sort'].forEach(param => {
            params.delete(param);
        });

        // Add new params
        Object.entries(newParams).forEach(([key, value]) => {
            if (value !== null) {
                if (Array.isArray(value)) {
                    value.forEach(v => params.append(key, v));
                } else {
                    params.set(key, value);
                }
            }
        });

        router.replace(`${pathname}?${params.toString()}`);
    };

    const handleCategoryChange = (categoryId: string, checked: boolean) => {
        const newCategories = checked
            ? [...selectedCategories, categoryId]
            : selectedCategories.filter(id => id !== categoryId);

        setSelectedCategories(newCategories);
        updateSearchParams({ 'category[in]': newCategories.length > 0 ? newCategories : null });
    };

    const handleBrandChange = (brandId: string, checked: boolean) => {
        const newBrands = checked
            ? [...selectedBrands, brandId]
            : selectedBrands.filter(id => id !== brandId);

        setSelectedBrands(newBrands);
        updateSearchParams({ brand: newBrands.length > 0 ? newBrands[0] : null });
    };

    const handleSortChange = (sortValue: string) => {
        updateSearchParams({ sort: sortValue });
    };

    return (
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger className='mt-4 border-2 rounded-md py-2 px-4'>
                    Filters
                </SheetTrigger>
                <SheetContent side='left'>
                    <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>

                    <ScrollArea className='max-h-[calc(100dvh-150px)]'>
                        {/* Sort Section */}
                        <div className='border-1 py-6 px-4 my-4'>
                            <h5 className='border-l-4 border-black ps-4 font-semibold mb-4'>Sort By</h5>
                            <Select onValueChange={handleSortChange} defaultValue={initialFilters.sort || ''}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select sort order" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sortOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Categories */}
                        <div className='border-1 py-6 px-4 my-4'>
                            <h5 className='border-l-4 border-black ps-4 font-semibold'>Categories</h5>
                            <div className='mt-4'>
                                {categories.map((category) => (
                                    <div className='flex items-center gap-2 mb-4' key={category._id}>
                                        <Checkbox
                                            id={`mobile-category-${category._id}`}
                                            checked={selectedCategories.includes(category._id)}
                                            onCheckedChange={(checked) =>
                                                handleCategoryChange(category._id, checked as boolean)
                                            }
                                        />
                                        <Label htmlFor={`mobile-category-${category._id}`}>{category.name}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Brands */}
                        <div className='border-1 py-6 px-4 my-4'>
                            <h5 className='border-l-4 border-black ps-4 font-semibold'>Brands</h5>
                            <div className='mt-4'>
                                {brands.map((brand) => (
                                    <div className='flex items-center gap-2 mb-4' key={brand._id}>
                                        <Checkbox
                                            id={`mobile-brand-${brand._id}`}
                                            checked={selectedBrands.includes(brand._id)}
                                            onCheckedChange={(checked) =>
                                                handleBrandChange(brand._id, checked as boolean)
                                            }
                                        />
                                        <Label htmlFor={`mobile-brand-${brand._id}`}>{brand.name}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>
        </div>
    );
}