import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

// FORMAT ERRORS
export function formatError(error: any) {
  if (error.name === "ZodError") {
    // handle zod error
    const fieldErrors = Object.keys(error.errors).map(
      (field) => error.errors[field].message
    );

    return fieldErrors.join(". ");
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    // handle prisma error
    const field = error.meta?.target ? error.meta.target[0] : "Field";

    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`;
  } else if (error.type === "CredentialsSignin" || error.name === "CredentialsSignin") {
    // handle nextauth credentials signin error
    return "Invalid email or password. Please try again.";
    
  } else {
    // handle other error

    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
}

// ROUND NUMBERS TO 2 DECIMAL PLACES
export function round2(value: number | string) {
  if (typeof value === "number") {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else if (typeof value === "string") {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error("value is not a number or a string");
  }
}

// FORMAT CURRENCY IN CAD
const CURRENCY_FORMATTER = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
});

export function formatCurrency(amount: number | string | null) {
  let formatted = "";

  if (typeof amount === "number") {
    formatted = CURRENCY_FORMATTER.format(amount);
  } else if (typeof amount === "string") {
    formatted = CURRENCY_FORMATTER.format(Number(amount));
  } else {
    return "NaN";
  }
  // It inserts a space after the currency symbol.
  return formatted.replace(/^(\D+)/, "$1 ");
}

// FORMAT DATE
export function formatDate(date: string | Date) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
return new Date(date).toLocaleDateString("it-IT", options);}

// FORMAT ORDER ID
export function formatId(id: string, visibleChars = 6) {
  return "..." + id.slice(-visibleChars)
}


