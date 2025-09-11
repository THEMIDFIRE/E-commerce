'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface GoBackProps {
    children?: React.ReactNode;
}

export default function GoBack({ children = "Go Back" }: GoBackProps) {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <Button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
            <ArrowLeft className="w-4 h-4" />
            {children}
        </Button>
    );
}
