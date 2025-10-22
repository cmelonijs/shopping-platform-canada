"use server";

import { prisma } from "@/db/prisma";
import { convertToPlainObject, formatError } from "../utils";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { CreateProduct, UsersProfile } from "@/types";
import { updateUsersProfileNameSchema } from "../validator";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

// get sales
export async function getDashboardValue() {
  const [orders, users, products] = await Promise.all([
    prisma.order.findMany({
      select: {
        createdAt: true,
        totalPrice: true,
      },
      orderBy: { createdAt: "asc" },
    }),
    prisma.user.findMany({ select: { id: true } }),
    prisma.product.findMany({ select: { id: true } }),
  ]);

  const totalSales = orders.length;
  const totalCustomers = users.length;
  const totalProducts = products.length;
  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.totalPrice),
    0,
  );
  const monthlyMap: Record<string, number> = {};
  for (const order of orders) {
    const key = order.createdAt.toLocaleString("en", {
      month: "short",
    });
    monthlyMap[key] = (monthlyMap[key] ?? 0) + Number(order.totalPrice);
  }
  const monthlyRevenue = Object.entries(monthlyMap).map(([month, total]) => ({
    month,
    total,
  }));

  return {
    monthlyRevenue,
    totalSales,
    totalRevenue,
    totalCustomers,
    totalProducts,
  };
}

//get all users
export async function getAllUsers(q?: string) {
  const where: Prisma.UserWhereInput | undefined = q
    ? {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { email: { contains: q, mode: "insensitive" } },
        ],
      }
    : undefined;

  const users = await prisma.user.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  return convertToPlainObject(users);
}

// get all products
export async function getAllProducts(q?: string) {
  const where: Prisma.ProductWhereInput | undefined = q
    ? {
        OR: [{ name: { contains: q, mode: "insensitive" } }],
      }
    : undefined;

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  return convertToPlainObject(products);
}

// get all orders
export async function getAllOrders(q?: string) {
  const where: Prisma.OrderWhereInput | undefined = q
    ? {
        OR: [{ user: { name: { contains: q, mode: "insensitive" } } }],
      }
    : undefined;
  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { user: true },
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
        id: productId,
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

export async function deleteOrdertById(formData: FormData) {
  try {
    const session = await auth();
    const userId = session?.user?.id as string;

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const orderId = formData.get("orderId") as string;

    await prisma.order.delete({
      where: {
        id: orderId,
      },
    });

    revalidatePath("/admin/orders");
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }
    throw new Error(formatError(err));
  }
}

export async function deleteUserById(formData: FormData) {
  try {
    const session = await auth();
    const userId = session?.user?.id as string;

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const userIdToDelete = formData.get("userId") as string;

    await prisma.user.delete({
      where: {
        id: userIdToDelete,
      },
    });

    revalidatePath("/admin/users");
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }
    throw new Error(formatError(err));
  }
}

export async function updateUserRole(data: UsersProfile) {
  const parsed = updateUsersProfileNameSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid data. Please check your input.",
      redirectTo: "/admin/users",
    };
  }

  await prisma.user.update({
    where: { id: parsed.data.id },
    data: {
      name: parsed.data.name,
      role: parsed.data.role,
    },
  });

  revalidatePath("/admin/users");

  return { success: true, message: "User update", redirectTo: "/admin/users" };
}

export async function createProduct(data: CreateProduct) {
  try {
    const session = await auth();
    const userId = session?.user?.id as string;

    if (!userId) {
      throw new Error("Unauthorized");
    }

    await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        category: data.category,
        images: data.images,
        brand: data.brand,
        description: data.description,
        stock: data.stock,
        price: data.price,
        isFeatured: data.isFeatured,
      },
    });

    revalidatePath("/admin/products/create");

    return {
      success: true,
      message: "Product created successfully",
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
