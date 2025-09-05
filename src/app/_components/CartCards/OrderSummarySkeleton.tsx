import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export default function OrderSummarySkeleton() {
    return (
        <>
            <TableRow>
                <TableCell>
                    Sub total
                </TableCell>
                <TableCell className='flex items-center gap-2'>
                    <Skeleton className='w-1/4 h-5 bg-gray-300' /> EGP
                </TableCell>
            </TableRow>
            <TableRow className='hover:bg-gray-100'>
                <TableCell>
                    Discount
                </TableCell>
                <TableCell className='flex items-center gap-2'>
                    <Skeleton className='w-1/4 h-5 bg-gray-300' />
                </TableCell>
            </TableRow>
            <TableRow className='hover:bg-gray-100'>
                <TableCell>
                    Total
                </TableCell>
                <TableCell className='flex items-center gap-2'>
                    <Skeleton className='w-1/4 h-5 bg-gray-300' /> EGP
                </TableCell>
            </TableRow>
        </>
    )
}
