"use server";

import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCT_LIMIT } from "../constants";
import { prisma } from "@/db/prisma";

// get latest products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCT_LIMIT,
    orderBy: {
      createdAt: "desc",
    },
  });

  return convertToPlainObject(data);
}

export async function getProductBySlug(slug: string) {
  const data = await prisma.product.findUnique({
    where: {
      slug,
    },
  });

  if (!data) {
    throw new Error("Product not found");
  }

  return convertToPlainObject(data);
}

export async function getAllCategoriesWithCount() {
  const categories = await prisma.product.groupBy({
    by: ["category"],
    _count: {
      category: true,
    },
  });

  return categories.map(cat => ({
    category: cat.category,
    count: cat._count.category,
  }));
}