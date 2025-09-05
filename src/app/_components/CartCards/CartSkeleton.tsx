import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export default function CartSkeleton() {
    return (
        <TableRow>
            <TableCell>
                <Skeleton className='w-2/3 h-5 bg-gray-300' />
            </TableCell>
            <TableCell>
                <Skeleton className='w-2/3 h-5 bg-gray-300' />
            </TableCell>
            <TableCell>
                <Skeleton className='w-2/3 h-5 bg-gray-300' />
            </TableCell>
            <TableCell>
                <Skeleton className='w-2/3 h-5 bg-gray-300' />
            </TableCell>
            <TableCell>
                <Skeleton className='w-2/3 h-5 bg-gray-300' />
            </TableCell>
        </TableRow>)
}
