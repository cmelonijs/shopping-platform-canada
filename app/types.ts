import z from "zod";
import { insertProductSchema } from "@/lib/validator";


export type Product = z.infer<typeof insertProductSchema>;