"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { insertShippingAddressSchema } from "../validator";
import { prisma } from "@/db/prisma";
import { auth } from "@/auth";
import { ShippingAddress } from "@/types";


export async function updateAddress(data: ShippingAddress
) {
    try {
        // check if the user is authenticated
        const session = await auth();
        const userId = session?.user?.id ? (session.user.id as string) : undefined;

        if (!userId) {
            return {
                success: false,
                message: "You must be logged in to update address",
            };
        }

        // validate the form data
        const userAddress = insertShippingAddressSchema.parse(data);

        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                address: {
                    update: userAddress,
                },
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
            message: "Failed to update address",
        };
    }
}