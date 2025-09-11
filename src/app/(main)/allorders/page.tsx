import { OrderCard, OrderCardSkeleton } from "@/app/_components/shared/AllCards";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getUserData, getUserOrders } from "@/lib/api";
import { IOrder } from "@/types/All.type";
import { Suspense } from "react";

export default async function Orders() {

    const user = await getUserData()
    const userId = user?.decoded?.id
    const orders = await getUserOrders(userId)

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
                            <Suspense fallback={<OrderCardSkeleton />}>
                                {orders.map((order: IOrder) => (
                                    <OrderCard key={order._id} order={order} />
                                ))}
                            </Suspense>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </section>
    )
}
