import { getOrder } from "@/lib/actions/order.actions";
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Table, TableBody, TableCell, TableRow, TableHead, TableHeader } from "@/components/ui/table";
import Image from "next/image";

export default async function OrderPage({ params }: { params: { slug: string } }) {
    const orderData = await getOrder(params.slug);
    
    if (!orderData.success || !orderData.order) {
        return (
            <div>
                <h1>Error: {orderData.message || "Order not found"}</h1>
            </div>
        );
    }

    const { order } = orderData;
    
    const shippingAddress = typeof order.shippingAddress === 'string' 
        ? JSON.parse(order.shippingAddress) 
        : order.shippingAddress;

    return (
        <>  
            <div className="flex flex-col min-h-screen">
                <div className="flex-grow">

                    <div className="flex flex-col">
                        <div className='w-full max-w-max mx-auto p-6 min-h-screen'>
                            <h1 className="text-3xl font-bold mb-6">Your Order</h1>
                            <div className="grid grid-1 md:grid-cols-3 gap-5 ">
                                <div className="col-span-1 md:col-span-2 overflow-x-auto space-y-4">
                                    <Card className="p-6 mt-3">
                                        <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
                                        <CardContent className="space-y-4 grid grid-cols-2 gap-x-4 ">
                                            <CardTitle >Name:</CardTitle>
                                            <CardDescription > {shippingAddress.fullName}</CardDescription >
                                            <CardTitle >Address: </CardTitle>
                                            <CardDescription >{shippingAddress.address}</CardDescription >
                                            <CardTitle >City: </CardTitle>
                                            <CardDescription >{shippingAddress.city}</CardDescription >
                                            <CardTitle >Postal:</CardTitle>
                                            <CardDescription >{shippingAddress.postalCode}</CardDescription >
                                            <CardTitle >Country:</CardTitle>
                                            <CardDescription >{shippingAddress.country}</CardDescription >

                                            <CardTitle>Delivery Status:</CardTitle>
                                            <CardDescription>
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                    order.isDelivered 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {order.isDelivered ? 'Delivered' : 'Not Delivered'}
                                                </span>
                                            </CardDescription>
                                        </CardContent>
                                    </Card>
                                    <Card className="p-6 mt-4">
                                        <h2 className="text-2xl font-semibold mb-4">Payment method</h2>
                                        <CardContent className="space-y-4 grid grid-cols-2 gap-x-4">
                                            <CardTitle>Payment Method:</CardTitle>
                                            <CardDescription>{order.paymentMethod}</CardDescription>
                                            <CardTitle>Payment Status:</CardTitle>
                                            <CardDescription>
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                    order.isPaid 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {order.isPaid ? 'Paid' : 'Not Paid'}
                                                </span>
                                            </CardDescription>
                                        </CardContent>
                                    </Card>
                                    <Table className="col-span-1 md:col-span-2 overflows-x-auto p-4 ">
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Product</TableHead>
                                                <TableHead>Quantity</TableHead>
                                                <TableHead>Price</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody >
                                            {order.orderItems.map((item) => (
                                                <TableRow key={item.productId}>
                                                    <TableCell className="flex items-center gap-2">
                                                        <Link href={`/product/${item.slug}`}>
                                                            <Image
                                                                src={item.image}
                                                                alt={item.name}
                                                                width={100}
                                                                height={100}
                                                                className="h-full w-full object-cover md:w-32 cursor-pointer hover:opacity-95 transition-opacity"
                                                            />
                                                        </Link>{item.name}</TableCell>
                                                    <TableCell>{item.qty}</TableCell>
                                                    <TableCell>${item.price}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                <div>
                                <Card className="p-6 mt-4 h-auto">
                                    <h2 className="text-2xl font-semibold mb-4">My cart</h2>
                                    <CardContent className="space-y-4 grid grid-cols-2 gap-x-4">
                                        <CardTitle >Items:</CardTitle>
                                                <CardDescription > {order.itemsPrice}</CardDescription >
                                                <CardTitle >Tax price: </CardTitle>
                                                <CardDescription >{order.taxPrice}</CardDescription >
                                                <CardTitle >Shipping: </CardTitle>
                                                <CardDescription >{order.shippingPrice}</CardDescription >
                                                <CardTitle >Total price:</CardTitle>
                                                <CardDescription >{order.totalPrice}</CardDescription >
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div >

        </>
    );
}