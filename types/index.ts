import {
  cartItemSchema,
  insertCartSchema,
  insertOrderItemSchema,
  insertOrderSchema,
  insertProductSchema,
  insertShippingAddressSchema,
  paymentMethodSchema,
  updateProfileNameSchema,
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
