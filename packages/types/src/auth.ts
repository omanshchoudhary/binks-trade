import { z } from "zod";

const emailField = z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Enter a valid email address"));

export const signupSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Enter your name")
        .max(50, "Name can be at most 50 characters"),
    username: z
        .string()
        .trim()
        .min(3, "Use at least 3 characters")
        .max(20, "Use at most 20 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Use only letters, numbers and underscores")
        .toLowerCase(),
    email: emailField,
    password: z
        .string()
        .min(8, "Use at least 8 characters")
        .max(128, "Password can be at most 128 characters"),
});

export const loginSchema = z.object({
    email: emailField,
    password: z
        .string()
        .min(1, "Enter your password")
        .max(128, "Password can be at most 128 characters"),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
