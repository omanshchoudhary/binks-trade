import { z } from "zod";

const emailField = z.string().trim().toLowerCase().pipe(z.email());

export const signupSchema = z.object({
    name: z.string().trim().min(1).max(50),
    username: z
        .string()
        .trim()
        .min(3)
        .max(20)
        .regex(/^[a-zA-Z0-9_]+$/)
        .toLowerCase(),
    email: emailField,
    password: z.string().min(8).max(128),
});

export const loginSchema = z.object({
    email: emailField,
    password: z.string().min(1).max(128),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
