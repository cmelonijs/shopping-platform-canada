"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { insertShippingAddressSchema } from "../validator";
import { prisma } from "@/db/prisma";
import { auth } from "@/auth";
import { ShippingAddress } from "@/types";
import { formatError } from "../utils";


export async function updateAddress(data: ShippingAddress) {
    try {
        const session = await auth();
        const userId = session?.user?.id as string;

        if (!userId) {
            return {
                success: false,
                message: "You must be logged in to update address",
            };
        }

        const userAddress = insertShippingAddressSchema.parse(data);

        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                address: userAddress,
            },
        });

        return {
            success: true,
            message: "Address updated successfully",
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

export async function getAddress(): Promise<ShippingAddress | null> {
    try {
        const session = await auth();
        const userId = session?.user?.id as string;

        if (!userId) {
            return null;
        }

        const user = await prisma.user.findUnique({
            where: { 
                id: userId 
            },
            select: { 
                address: true 
            },
        });

        const address = user?.address;
        if (!address) return null;
        
        const validatedAddress = insertShippingAddressSchema.safeParse(address);
        return validatedAddress.success ? validatedAddress.data : null;
    } catch (err) {
        if (isRedirectError(err)) {
            throw err;
        }
        throw new Error(formatError(err));
    }
}