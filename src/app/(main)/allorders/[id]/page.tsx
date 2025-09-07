"use client"

import CartItems from "@/app/_components/CartCards/CartItems";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IOrder } from "@/types/All.type";
import { getUserOrders } from "@/lib/api";
import { getUserToken } from "@/lib/server-utils";

export default function OrderDetails() {
    const params = useParams();
    const [order, setOrder] = useState<IOrder | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchOrder() {
            try {
                setLoading(true);
                const decoded = await getUserToken(true);
                
                if (decoded && typeof decoded === 'object' && 'user' in decoded) {
                    const userData = {
                        ...(decoded.user as any),
                        id: decoded.id
                    };
                    
                    const orders = await getUserOrders(userData.id);
                    // Find the specific order by _id
                    const specificOrder = orders.find((order: IOrder) => order._id === params.id);
                    
                    if (specificOrder) {
                        setOrder(specificOrder);
                    } else {
                        setError('Order not found');
                    }
                }
            } catch (error) {
                console.error('Error fetching order:', error);
                setError('Failed to fetch order details');
            } finally {
                setLoading(false);
            }
        }

        if (params.id) {
            fetchOrder();
        }
    }, [params.id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <section>
            <div className="container max-w-4/5 mx-auto my-10">
                <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                <div className="mb-6 p-4 bg-gray-100 shadow rounded-lg flex items-center justify-evenly">
                    <p><strong>Order ID:</strong> #{order?.id}</p>
                    <p><strong>Payment Method:</strong> {order?.paymentMethodType}</p>
                    <p><strong>Status:</strong> {order?.isPaid ? 'Paid' : 'Pending'}</p>
                    <p><strong>Total:</strong> {order?.totalOrderPrice} EGP</p>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-200 hover:bg-gray-100">
                            <TableCell>Product</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {order && order.cartItems && order.cartItems.length > 0 ? (
                            order.cartItems.map((item: any) => (
                                <TableRow key={item._id} className="hover:bg-gray-100">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <img 
                                                src={item.product?.imageCover} 
                                                alt={item.product?.title}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                            <div>
                                                <p className="font-medium">{item.product?.title}</p>
                                                <p className="text-sm text-gray-500">{item.product?.brand?.name}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{item.price} EGP</TableCell>
                                    <TableCell>{item.count}</TableCell>
                                    <TableCell>{item.price * item.count} EGP</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    No items found in this order.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}
