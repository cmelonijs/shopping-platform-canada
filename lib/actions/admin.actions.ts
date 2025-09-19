"use server";

import { prisma } from "@/db/prisma";
import { convertToPlainObject, formatError } from "../utils";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";


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


export async function deleteProductById(formData: FormData) {
  
  try {
    const session = await auth();
    const userId = session?.user?.id as string;

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const productId = formData.get("productId") as string;
    
    await prisma.product.delete({
      where: { 
        id: productId 
      },
    });

    revalidatePath("/admin/products");

    } catch (err) {
      if (isRedirectError(err)) {
        throw err;
      }
      throw new Error(formatError(err));
  }
}