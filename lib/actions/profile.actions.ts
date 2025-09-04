"use server"

import { auth } from "@/auth";
import { updateProfileNameSchema } from "../validator";
import { prisma } from "@/db/prisma";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { formatError } from "../utils";
import { Profile } from "@/types";

export async function updateProfile(data: Profile) {
    try {
        const session = await auth();
        const userId = session?.user?.id as string;

        if (!userId) {
            return {
                success: false,
                message: "You must be logged in to update profile",
            };
        }

        const userName = updateProfileNameSchema.parse(data);

        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                name: userName.name,
            },
        });


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

export async function getName(): Promise<string | null> {
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
                name: true 
            },
        });

        return user?.name || null;
    } catch (err) {
        if (isRedirectError(err)) {
            throw err;
        }
        throw new Error(formatError(err));
    }
}
