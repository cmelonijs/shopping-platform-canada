"use server"

import { PaymentMethod } from "@/types";
import { auth } from "@/auth";
import { paymentMethodSchema } from "../validator";
import { prisma } from "@/db/prisma";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { formatError } from "../utils";

export async function updatePaymentMethod(data: PaymentMethod) {
  try {
    const session = await auth();
    const userId = session?.user?.id as string;

    if (!userId) {
      return {
        success: false,
        message: "You must be logged in to update payment method",
      };
    }

    const { paymentMethod } = paymentMethodSchema.parse(data);

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        paymentMethod: paymentMethod,
      },
    });

    return {
      success: true,
      message: "Payment method updated successfully",
    };
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }

    return {
      success: false,
      message: formatError(err),
    };
  }
} 

export async function getPaymentMethod(): Promise<PaymentMethod | null> { 
  try {
    const session = await auth();
    const userId = session?.user?.id as string;

    if (!userId) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        paymentMethod: true,
      },
    });

   const paymentMethod = user?.paymentMethod || null;
   if (!paymentMethod) return null;

   const validatedPaymentMethod = paymentMethodSchema.parse({ paymentMethod });
   return validatedPaymentMethod;
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }

    return null;
  }
}