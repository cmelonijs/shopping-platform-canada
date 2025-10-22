import z from "zod";
import { formatNumberWithDecimal } from "./utils";

const currency = z
  .string()
  .refine(
    (val) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(val))),
    "Price must have exactly two decimal places.",
  );

// SCHEMA FOR INSERTING PRODUCT
export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  category: z.string().min(3, "Category must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  stock: z.coerce.number(),
  brand: z.string().min(3, "Brand must be at least 3 characters"),
  images: z.array(z.string()).min(1, "Product must have at least one image"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

// SCHEMA FOR SIGNING USER IN
export const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 chars"),
});

// SCHEMA FOR SIGNING UP USER
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 chars"),
    confirmPassword: z.string().min(6, "Password must be at least 6 chars"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// CART ITEM SCHEMA
export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  qty: z.number().int().nonnegative("Quantity must be a positive number"),
  image: z.string().min(1, "An image is required"),
  price: currency,
});

// CART SCHEMA
export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  ShippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, "Session cart ID is required"),
  userId: z.string().optional().nullable(),
});

// SHIPPING ADDRESS SCHEMA
export const insertShippingAddressSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
});

export const paymentMethodSchema = z.object({
  paymentMethod: z.enum(["payPal", "Stripe", "cashOnDelivery"]),
});

// SCHEMA FOR INSERTING ORDER
export const insertOrderSchema = z.object({
  userId: z.string().min(1, "User is required"),
  itemsPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  totalPrice: currency,
  paymentMethod: paymentMethodSchema.shape.paymentMethod,
  shippingAddress: insertShippingAddressSchema,
});

// SCHEMA FOR INSERTING ORDER ITEM
export const insertOrderItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  image: z.string(),
  name: z.string(),
  price: currency,
  qty: z.number(),
});

// SCHEMA FOR UPDATING PROFILE NAME
export const updateProfileNameSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email().optional(),
});

// SCHEMA FOR UPDATING user NAME
export const updateUsersProfileNameSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email().optional(),
  role: z.enum(["user", "admin"]),
});

// SCHEMA FOR CREATING PRODUCT
export const createProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  category: z.string().min(3, "Category must be at least 3 characters"),
  brand: z.string().min(3, "Brand must be at least 3 characters"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  stock: z.coerce.number().min(0, "Stock must be a positive number"),
  images: z.array(z.string()).min(1, "Product must have at least one image"),
  isFeatured: z.boolean(),
  description: z.string().min(3, "Description must be at least 3 characters"),
});

// SCHEMA FOR INSERT VIEWS
export const insertReviewSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  productId: z.string().min(1, "Product is required"),
  userId: z.string().min(1, "User is required"),
  rating: z.coerce
    .number()
    .int()
    .min(1, "Rating must be at least one")
    .max(5, "Rating must be at most one"),
});
