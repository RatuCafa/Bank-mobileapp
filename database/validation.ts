// lib/schemas.ts

import { z } from "zod";

/* =========================
   User
========================= */

export const userSchema = z.object({
  id: z.string().uuid(),
  nama: z.string().min(1),
  balance: z.coerce.number(),
  created_at: z.string().datetime(),
});

export const createUserSchema = z.object({
  nama: z.string().min(1).max(100),
  balance: z.coerce.number().nonnegative(),
});

/* =========================
   Transaction
========================= */

export const transactionSchema = z.object({
  id: z.string().uuid(),
  sender_id: z.string().uuid(),
  receiver_id: z.string().uuid(),
  amount: z.coerce.number().positive(),
  created_at: z.string().datetime(),
  description: z.string().nullable(),
  metadata: z.string().nullable(),
});

export const createTransactionSchema = z.object({
  sender_id: z.string().uuid(),
  receiver_id: z.string().uuid(),
  amount: z.coerce.number().positive(),
  description: z.string().max(500).optional(),
  metadata: z.string().optional(),
});

/* =========================
   Types
========================= */

export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;

export type Transaction = z.infer<typeof transactionSchema>;
export type CreateTransaction = z.infer<
  typeof createTransactionSchema
>;
