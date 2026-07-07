import { describe, expect, it } from "vitest";
import { contactFormSchema } from "@/lib/validations/contact";

describe("contactFormSchema", () => {
    it("accepts a valid submission", () => {
        const result = contactFormSchema.safeParse({
            name: "Jane Doe",
            email: "jane@example.com",
            message: "Hi, I'd like to talk about an opportunity.",
        });
        expect(result.success).toBe(true);
    });

    it("rejects an invalid email", () => {
        const result = contactFormSchema.safeParse({
            name: "Jane Doe",
            email: "not-an-email",
            message: "Hi, I'd like to talk about an opportunity.",
        });
        expect(result.success).toBe(false);
    });

    it("rejects a message that's too short", () => {
        const result = contactFormSchema.safeParse({
            name: "Jane Doe",
            email: "jane@example.com",
            message: "Hi",
        });
        expect(result.success).toBe(false);
    });
});