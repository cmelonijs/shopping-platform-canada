"use server";

import { CreateReview } from "@/types";
import { prisma } from "@/db/prisma";
import { auth } from "@/auth";
import { formatError } from "../utils";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { revalidatePath } from "next/cache";

export async function createReview(data: CreateReview) {
    try {
        const session = await auth();
        const userId = session?.user?.id as string;

        if (!userId) {
            return {
                success: false,
                message: "You must be logged in to update review",
            };
        }

        // Check if user already has a review for this product
        const existingReview = await prisma.review.findFirst({
            where: {
                userId: userId,
                productId: data.productId,
            },
        });

        if (existingReview) {
            // Update existing review
            await prisma.review.update({
                where: {
                    id: existingReview.id,
                },
                data: {
                    rating: data.rating,
                    title: data.title,
                    description: data.description,
                },
            });

            return {
                success: true,
                message: "Review updated successfully",
            };
        } else {
            // Create new review
            await prisma.review.create({
                data: {
                    rating: data.rating,
                    title: data.title,
                    description: data.description,
                    productId: data.productId,
                    userId: userId,
                },
            });

            return {
                success: true,
                message: "Review created successfully",
            };
        }
    } catch (error) {
        return {
            success: false,
            message: formatError(error),
        };
    }
}

export async function getReview(productId: string): Promise<CreateReview | null> {
    try {
        const session = await auth();
        const userId = session?.user?.id as string;

        if (!userId) {
            return null;
        }

        const review = await prisma.review.findFirst({
            where: {
                userId: userId,
                productId: productId,
            },
        });

        if (!review) {
            return null;
        }

        return {
            productId: review.productId,
            rating: review.rating,
            title: review.title,
            description: review.description,
        };
    } catch (err) {
        if (isRedirectError(err)) {
            throw err;
        }
        throw new Error(formatError(err));
    }
}

export async function getAllReviews(productId: string) {
    try {
        const reviews = await prisma.review.findMany({
            where: {
                productId: productId,
            },
            include: {
                user: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return reviews;
    } catch (err) {
        if (isRedirectError(err)) {
            throw err;
        }
        throw new Error(formatError(err));
    }
}