'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function SearchInput() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (term) {
            params.set('keyword', term);
        } else {
            params.delete('keyword');
        }

        router.replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="relative mt-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
                type='search'
                placeholder='Search for a product'
                className='pl-10'
                defaultValue={searchParams.get('keyword')?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    );
}