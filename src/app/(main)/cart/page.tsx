"use client";
import { ProductElement } from '@/types/All.type';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCart } from '@/context/UserContext';
import { Skeleton } from '@/components/ui/skeleton';
import { rmvCartItem } from '@/lib/api';
import { toast } from 'sonner';
import Link from 'next/link';
import CartItems from '@/app/_components/CartCards/CartItems';
import CartSkeleton from '@/app/_components/CartCards/CartSkeleton';
import OrderSummarySkeleton from '@/app/_components/CartCards/OrderSummarySkeleton';
import OrderSummary from '@/app/_components/CartCards/OrderSummary';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function Cart() {
    const { cart, getCartData } = useCart()
    const cartProducts = cart?.data?.products;
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
                                    <CartSkeleton />
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
                                    <OrderSummarySkeleton />
                                ) : (
                                    <OrderSummary />
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell>Select Payment Method:</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <RadioGroup defaultValue="cod" className='flex justify-between my-4'>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="cod" id="cod" />
                                                <Label htmlFor="cod">Cash on Delivery</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="card" id="card" />
                                                <Label htmlFor="card">Card Payment</Label>
                                            </div>
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell colSpan={2} className='p-0'>
                                        <Link href="/checkout">
                                            <Button className='w-full rounded-none rounded-b-md'>
                                                Proceed to Checkout
                                            </Button>
                                        </Link>
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