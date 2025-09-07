"use client"

import { OrderCard, OrderCardSkeleton } from "@/app/_components/shared/AllCards";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getUserOrders } from "@/lib/api";
import { getUserToken } from "@/lib/server-utils";
import { IOrder } from "@/types/All.type";
import { useEffect, useState } from "react";

interface User {
    id: string;
}

export default function Orders() {
    const [userData, setUserData] = useState<User | null>(null)
    const [orders, setOrders] = useState<IOrder[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function extractTokenData() {
            try {
                const decoded = await getUserToken(true)

                if (decoded && typeof decoded === 'object' && 'user' in decoded) {
                    const userData = {
                        ...(decoded.user as any),
                        id: decoded.id
                    } as User
                    setUserData(userData)
                }
            } catch (error) {
                console.error('Error extracting token data:', error)
            }
        }

        extractTokenData()
    }, [])

    const userId = userData?.id as string
    useEffect(() => {
        async function getOrderHistory() {
            if (!userId) return;

            try {
                setLoading(true)
                setError(null)
                const response = await getUserOrders(userId)
                setOrders(response || [])
            } catch (error) {
                console.error('Error fetching orders:', error)
                setError('Failed to fetch orders')
            } finally {
                setLoading(false)
            }
        }

        getOrderHistory()
    }, [userId])


    return (
        <section>
            <div className="container max-w-4/5 mx-auto my-12">
                <h3 className="text-2xl font-bold">Your Orders</h3>
                <div className="border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-300/80 hover:bg-gray-300">
                            <TableRow>
                                <TableHead className="text-center">Order no.</TableHead>
                                <TableHead className="text-center">Order Date</TableHead>
                                <TableHead className="text-center">Delivery Status</TableHead>
                                <TableHead className="text-center">Payment Status</TableHead>
                                <TableHead className="text-center">Total Price</TableHead>
                                <TableHead className="text-center">Order Details</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? 
                            Array.from({ length: 3 }).map((_, idx) => (
                                <OrderCardSkeleton key={idx} />
                            )) :
                            orders.map((order) => (
                                <OrderCard key={order._id} order={order} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </section>
    )
}
