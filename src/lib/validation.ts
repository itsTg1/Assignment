import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  position: z.string().optional(),
  description: z.string().optional(),
});

export type FormSchema = z.infer<typeof formSchema>;
