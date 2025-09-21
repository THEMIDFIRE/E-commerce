"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAddresses } from '@/context/UserContext'
import { removeUserAddress } from '@/lib/api'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export default function Addresses() {
    const { addresses, getAddressesData } = useAddresses()

    const handleRemove = (id: string) => {
        toast.promise(removeUserAddress(id), {
            loading: 'Removing address...',
            success: 'Address removed successfully',
            error: 'Failed to remove address'
        })
        getAddressesData()
    }
    return (
        <Table>
            <TableHeader>
                <TableRow className='bg-gray-300/80 hover:bg-gray-300'>
                    <TableHead className='w-1/12'>Remove</TableHead>
                    <TableHead className='w-1/6'>Name</TableHead>
                    <TableHead className='w-1/6'>Details</TableHead>
                    <TableHead className='w-1/6'>Phone</TableHead>
                    <TableHead className='w-1/6'>City</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {addresses?.map((address: any) => (
                    <TableRow className='hover:bg-gray-100' key={address._id}>
                        <TableCell className='text-center'>
                            <Trash2 size={18} className='w-full hover:stroke-red-500 hover:cursor-pointer transition-colors' onClick={() => handleRemove(address._id)} />
                        </TableCell>
                        <TableCell>{address.name}</TableCell>
                        <TableCell>{address.details}</TableCell>
                        <TableCell>{address.phone}</TableCell>
                        <TableCell>{address.city}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
