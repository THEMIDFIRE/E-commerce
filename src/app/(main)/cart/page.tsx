"use client";
import CartItems from '@/app/_components/CartItems/CartItems';
import { ProductElement } from '@/types/All.type';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCart } from '@/context/CartContext';
import { Skeleton } from '@/components/ui/skeleton';
import { rmvCartItem } from '@/lib/api';
import { toast } from 'sonner';

export default function Cart() {
    const { cart, getCartData } = useCart()
    const cartProducts = cart?.data?.products;
    const totalCartPrice = cart?.data?.totalCartPrice;
    const cartTotal = cart?.numOfCartItems;

    if (cart?.error) {
        return (
            <section className='pt-4 pb-16'>
                <div className="container max-w-4/5 mx-auto">
                    <h3 className="text-2xl font-bold mb-6">Your Cart</h3>
                    <p>Error loading cart: {cart.error}</p>
                </div>
            </section>
        );
    }

    const handleRemoveAll = async () => {
        toast.promise(rmvCartItem(), {
            loading: 'Removing all items from cart...',
            success: 'Removed all items from cart',
            error: 'Failed to remove all items from cart'
        });
        getCartData()
    };

    return (
        <section className='pt-4 pb-16'>
            <div className="container max-w-4/5 mx-auto">
                <h3 className="text-2xl font-bold mb-6">Your Cart</h3>


                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="grow border rounded-[10px] overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className='bg-gray-300/80 hover:bg-gray-300'>
                                    <TableHead className='w-12'>Remove</TableHead>
                                    <TableHead className='max-w-1/12'>Product</TableHead>
                                    <TableHead className='w-1/6'>Price</TableHead>
                                    <TableHead className='w-1/6'>Quantity</TableHead>
                                    <TableHead className='w-1/6'>Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {!cartProducts ?
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
                                    </TableRow>
                                    : cartTotal === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className='text-center py-5'>
                                                Your cart is empty
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        cartProducts?.map((item: ProductElement) => (
                                            <CartItems key={item._id} {...item} />)
                                        ))}
                            </TableBody>
                        </Table>
                        {cartTotal === 0 ? '' : (
                            <Button onClick={handleRemoveAll} className='mt-5'>Clear Cart</Button>
                        )}
                    </div>
                    <div className="w-full lg:w-1/3 border rounded-[10px] overflow-hidden">
                        <Table>
                            <TableHeader className='bg-gray-300/80'>
                                <TableRow>
                                    <TableHead colSpan={2}>Cart Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {!cartProducts ? (
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
                                ) : (
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
                                    </>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={2} className='p-0'>
                                        <Button className='w-full rounded-none rounded-b-md'>Checkout</Button>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </div>
            </div>
        </section>
    )
}