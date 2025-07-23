"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { formatError } from "../utils";


export async function addToCart(
  prevState: unknown, 
  formData: FormData
) {
  try {
    const cookieStore = await cookies();
    const cartCookie = cookieStore.get("sessionCartId");

    if (!cartCookie) {
      return {
        success: false,
        message: "Cart not found",
      };
    }

    

  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}