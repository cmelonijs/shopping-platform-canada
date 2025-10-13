"use server";

import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCT_LIMIT } from "../constants";
import { prisma } from "@/db/prisma";
import { Prisma } from "@prisma/client";

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

export async function getFilteredProducts({ category, price, rating, sort, page }: {
  category?: string;
  price?: string;
  rating?: string;
  sort?: string;
  page?: string;
}) {
  const query: any = {};

  if (category && category !== "all") query.category = category;

  if (price && price !== "all") {
    const [min, max] = price.split("-").map(Number);
    query.price = { gte: min, lte: max };
  }

  if (rating && rating !== "all") {
    query.rating = { gte: Number(rating) };
  }

const sortOption: Prisma.ProductOrderByWithRelationInput | undefined =
    sort === "newest"
      ? { createdAt: "desc" as Prisma.SortOrder }
      : sort === "price-low"
      ? { price: "asc" as Prisma.SortOrder }
      : sort === "price-high"
      ? { price: "desc" as Prisma.SortOrder }
      : undefined;

  const pageNumber = Number(page) || 1;
  const pageSize = 12;
  const skip = (pageNumber - 1) * pageSize;

  return await prisma.product.findMany({
  where: query,
  orderBy: sortOption,
  skip,
  take: pageSize,
});
}

export async function getAllCategories() {
  const categories = await prisma.product.groupBy({
    by: ['category'],
  });

  return categories;
}