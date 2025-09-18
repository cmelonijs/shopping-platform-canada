import { prisma } from "@/db/prisma";
import { convertToPlainObject, formatError } from "../utils";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { auth } from "@/auth";


// get all users
export async function getAllUsers(){
  const users = await prisma.user.findMany({
    orderBy: { 
        createdAt: 'desc' 
    },
  });
  return convertToPlainObject(users)
}

// get all products
export async function getAllProducts() {
  const product = await prisma.product.findMany({
    orderBy: { 
      createdAt: 'desc' 
    },
  });
  return convertToPlainObject(product)
}

// get all orders
export async function getAllOrders() {
  const orders = await prisma.order.findMany({
    orderBy: { 
      createdAt: 'desc' 
    },
    include: {
      user: true,
      orderItems: {
          include: {
            product: true
          }
        }
    },
  });

  return convertToPlainObject(orders);
}

//delete-orders
export async function deleteOrderById(orderId: string) {
  try {
    const session = await auth();
    const userId = session?.user?.id as string;

    if (!userId) {
      return null;
    }
    const order = await prisma.order.delete({
      where: { id: orderId },
    });
    return order;

    } catch (err) {
      if (isRedirectError(err)) {
        throw err;
      }
      throw new Error(formatError(err));
  }
}