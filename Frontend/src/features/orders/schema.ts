import { z } from "zod";

// Matches the order shape Backend/models/orderModel.js stores in Mongo.
// Numbers are in major currency units (rupees / dollars) on the wire; the
// UI converts to cents per project convention when rendering with the
// existing PriceDisplay component.

export const orderItemSchema = z.object({
  product: z.string(),
  name: z.string(),
  quantity: z.number().int().positive(),
  price: z.number().nonnegative(),
  image: z.string().optional(),
});
export type OrderItem = z.infer<typeof orderItemSchema>;

export const shippingInfoSchema = z.object({
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  pinCode: z.string().min(1),
  phoneNo: z.string().min(1),
});
export type ShippingInfo = z.infer<typeof shippingInfoSchema>;

export const paymentInfoSchema = z.object({
  razorpay_order_id: z.string().optional(),
  razorpay_payment_id: z.string().optional(),
  razorpay_signature: z.string().optional(),
  status: z.enum(["pending", "paid", "failed", "refunded"]).default("pending"),
});

export const orderStatusEnum = z.enum([
  "pending",
  "paid",
  "confirmed",
  "packed",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
]);
export type OrderStatus = z.infer<typeof orderStatusEnum>;

export const orderSchema = z.object({
  id: z.string(),
  user: z.string().optional(),
  shippingInfo: shippingInfoSchema,
  orderItems: z.array(orderItemSchema),
  paymentInfo: paymentInfoSchema,
  itemsPrice: z.number(),
  taxPrice: z.number(),
  shippingPrice: z.number(),
  totalPrice: z.number(),
  orderStatus: orderStatusEnum,
  createdAt: z.string().optional(),
  deliveredAt: z.string().optional(),
});
export type Order = z.infer<typeof orderSchema>;

export const createOrderInputSchema = z.object({
  shippingInfo: shippingInfoSchema,
  orderItems: z.array(orderItemSchema).min(1),
  itemsPrice: z.number().nonnegative(),
  taxPrice: z.number().nonnegative(),
  shippingPrice: z.number().nonnegative(),
  totalPrice: z.number().nonnegative(),
});
export type CreateOrderInput = z.infer<typeof createOrderInputSchema>;
