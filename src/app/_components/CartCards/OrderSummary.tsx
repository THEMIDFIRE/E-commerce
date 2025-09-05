import { TableCell, TableRow } from "@/components/ui/table";
import { useCart } from "@/context/CartContext";

export default function OrderSummary() {
    const { cart } = useCart()
    const totalCartPrice = cart?.data?.totalCartPrice;


    return (
        <>
            <TableRow className='hover:bg-gray-100'>
                <TableCell>
                    Sub total
                </TableCell>
                <TableCell>
                    {totalCartPrice} EGP
                </TableCell>
            </TableRow>
            <TableRow className='hover:bg-gray-100'>
                <TableCell>
                    Discount
                </TableCell>
                <TableCell>
                    ---
                </TableCell>
            </TableRow>
            <TableRow className='hover:bg-gray-100'>
                <TableCell>
                    Total
                </TableCell>
                <TableCell>
                    {totalCartPrice} EGP
                </TableCell>
            </TableRow>
        </>)
}
