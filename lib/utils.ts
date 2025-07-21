import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { clsx, type ClassValue } from "clsx";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// CONVERT PRISMA OBJECT INTO REGULAR JS OBJECT
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// FORMAT NUMBERS WITH DECIMAL PLACES
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");

  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}

export function formatError(error: unknown): { success: false; message: string } {
  // Handle redirect errors
  if (isRedirectError(error)) {
    throw error;
  }

  // Zod error handling
  if (error instanceof ZodError) {
    return {
      success: false,
      message: error.errors.map((err) => err.message).join(", "),
    }
  }

  // Prisma error handling
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      // Check which field caused the unique constraint violation
      const target = error.meta?.target as string[] | undefined;
      
      if (target?.includes("email")) {
        return {
          success: false,
          message: "Email already exists",
        };
      }
      
      if (target?.includes("username")) {
        return {
          success: false,
          message: "Username already taken",
        };
      }

      // Generic error handling for other unique constraints
      return {
        success: false,
        message: "This value already exists",
      };
    }
    
    if (error.code === "P2025") {
      return {
        success: false,
        message: "Record not found",
      };
    }

    return {
      success: false,
      message: "A database error occurred",
    };
  }
  
  // Generic error handling
  return {
    success: false,
    message: "Something went wrong",
  };
}