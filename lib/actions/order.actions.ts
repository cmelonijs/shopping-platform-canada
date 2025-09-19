"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { formatError, convertToPlainObject } from "../utils";
import { auth } from "@/auth";
import { getMyCart } from "./cart.actions";
import { prisma } from "@/db/prisma";
import { CartItem } from "@/types";
import { getUserById } from "./auth.actions";
import { insertOrderSchema, insertShippingAddressSchema } from "../validator";



// create order and create the order items
export async function createOrder() {
  try {
    const session = await auth();
    if (!session) throw new Error("User is not authenticated");

    const cart = await getMyCart();

    const userId = session?.user?.id;
    if (!userId) throw new Error("User not found");

    const user = await getUserById(userId);

    if (!cart || cart.items.length === 0) {
      return {
        success: false,
        message: "Your cart is empty",
        redirectTo: "/cart",
      };
    }

    if (!user.paymentMethod) {
      return {
        success: false,
        message: "No payment method",
        redirectTo: "/payment-method",
      };
    }

    if (!user.address) {
      return {
        success: false,
        message: "No shipping address",
        redirectTo: "/shipping-address",
      };
    }

    // create order object
    const order = insertOrderSchema.parse({
      userId: user.id,
      paymentMethod: user.paymentMethod,
      shippingAddress: user.address,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.ShippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    });

    // create a transaction to create order and order items in database
    const insertedOrderId = await prisma.$transaction(async (tx) => {
      //create order
      const insertedOrder = await tx.order.create({ data: order });

      // create order items from the cart items
      for (const item of cart.items as CartItem[]) {
        await tx.orderItem.create({
          data: {
            ...item,
            price: item.price,
            orderId: insertedOrder.id,
          },
        });
      }

      // clear cart
      await tx.cart.update({
        where: { id: cart.id },
        data: {
          items: [],
          totalPrice: 0,
          taxPrice: 0,
          ShippingPrice: 0,
          itemsPrice: 0,
        },
      });

      return insertedOrder.id;
    });

    if (!insertedOrderId) throw new Error("Order not created");

    return {
      success: true,
      message: "Order created",
      redirectTo: `/order/${insertedOrderId}`,
    };
  } catch (err) {
    if (isRedirectError(err)) throw err;
    return { success: false, message: formatError(err) };
  }
}

export async function getOrderById(orderId: string) {
  try {
    const session = await auth();
    if (!session) throw new Error("User is not authenticated");

    const order = await prisma.order.findUnique({
      where: { 
        id: orderId, 
      },
      include: { 
        orderItems: {
          include: {
            product: true
          }
        },
        user: true
      },
    });

    if (!order) throw new Error("Order not found");

    const userAddress = insertShippingAddressSchema.parse(
      typeof order.shippingAddress === "string" 
        ? JSON.parse(order.shippingAddress) 
        : order.shippingAddress
    );

    return {
      success: true,
      order,
      userAddress,
    };
  } catch (err) {
    return { 
      success: false, 
      message: formatError(err) 
    };
  }
}

export async function getAllMyOrders()  {
  try {
    const session = await auth();
    const userId = session?.user?.id as string;

    if (!userId) {
      return null;
    }

    const orders = await prisma.order.findMany({
      where: { 
        userId: userId 
      },
      orderBy: { 
        createdAt: "desc" 
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    return convertToPlainObject(orders);
    
  } catch (err) {
      if (isRedirectError(err)) {
        throw err;
      }
      throw new Error(formatError(err));
  }
}



