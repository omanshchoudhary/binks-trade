import { z } from "zod";

export const orderTypes = ["BUY", "SELL"] as const;
export const orderStatuses = ["PENDING", "FILLED", "CANCELLED"] as const;

export type OrderType = (typeof orderTypes)[number];
export type OrderStatus = (typeof orderStatuses)[number];

export const placeOrderSchema = z.object({
    symbol: z.string().trim().toUpperCase().min(1).max(20),
    type: z.enum(orderTypes),
    quantity: z.number().int().positive().max(100000),
});

export type PlaceOrderInput = z.infer<typeof placeOrderSchema>;

export type Order = {
    id: string;
    shareId: string;
    symbol: string;
    name: string;
    type: OrderType;
    quantity: number;
    price: number;
    executedPrice: number | null;
    status: OrderStatus;
    createdAt: string;
    executedAt: string | null;
};
