import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";

/**
 * [Architecture §3/§4 fix] Reserved from the scaffold step, not deferred —
 * the contact form has a real fetch target from day one.
 *
 * Without RESEND_API_KEY + CONTACT_EMAIL_TO set (see .env.example), this
 * just validates and logs the submission — no external call, no crash.
 * Once those env vars are set, it forwards the message via Resend's REST
 * API directly (no SDK dependency needed for a single endpoint).
 */
export async function POST(request: Request) {
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
        return NextResponse.json(
            { error: "Invalid form data.", issues: result.error.flatten() },
            { status: 422 }
        );
    }

    const { name, email, message } = result.data;
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_EMAIL_TO;

    if (!apiKey || !to) {
        // Placeholder path: no email service configured yet.
        console.log("[contact] submission received (email not configured):", {
            name,
            email,
            message,
        });
        return NextResponse.json({ ok: true });
    }

    try {
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: "Portfolio Contact <onboarding@resend.dev>",
                to,
                reply_to: email,
                subject: `New message from ${name}`,
                text: message,
            }),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error("[contact] Resend API error:", errorBody);
            return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("[contact] Unexpected error:", error);
        return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
    }
}