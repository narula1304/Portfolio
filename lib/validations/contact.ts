import { z } from "zod";

export const contactFormSchema = z.object({
    name: z.string().min(2, "Enter your name."),
    email: z.string().email("Enter a valid email address."),
    message: z.string().min(10, "Message should be at least 10 characters."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;