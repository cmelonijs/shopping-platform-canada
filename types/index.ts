import {
  cartItemSchema,
  createProductSchema,
  insertCartSchema,
  insertOrderItemSchema,
  insertOrderSchema,
  insertProductSchema,
  insertReviewSchema,
  insertShippingAddressSchema,
  paymentMethodSchema,
  updateProfileNameSchema,
  updateUsersProfileNameSchema,
} from "@/lib/validator";
import { z } from "zod";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  numReviews: number;
  createdAt: Date;
};

export type CartItem = z.infer<typeof cartItemSchema>;

export type Cart = z.infer<typeof insertCartSchema>;

export type ShippingAddress = z.infer<typeof insertShippingAddressSchema>;

export type PaymentMethod = z.infer<typeof paymentMethodSchema>;

export type Order = z.infer<typeof insertOrderSchema> & {
  id: string;
  createdAt: Date;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  delivedereAt: Date | null;
  orderItems: OrderItem[];
  user: {
    name: string;
    email: string;
  };
};

export type OrderItem = z.infer<typeof insertOrderItemSchema>;

export type Profile = z.infer<typeof updateProfileNameSchema>;

export type UsersProfile = z.infer<typeof updateUsersProfileNameSchema>;

export type CreateProduct = z.infer<typeof createProductSchema>;

export type Review = z.infer<typeof insertReviewSchema> & {
  id: string;
  createdAt: Date;
  user?: {
    name: string;
  };
};
