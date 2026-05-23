import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await req.json();
    const { name, email, phone, service, vehicle, message } = body;

    // Server-side validation
    if (!name || !email || !service || !vehicle) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const toEmail = process.env.QUOTE_TO_EMAIL;
    if (!toEmail) {
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Ghost Flow LLC <onboarding@resend.dev>",
      to: toEmail,
      replyTo: email,
      subject: `New Quote Request — ${name} — ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #e8e8e8; padding: 32px; border: 1px solid #333;">
          <div style="border-bottom: 2px solid #CC0000; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="color: #CC0000; font-size: 22px; margin: 0; letter-spacing: 0.1em; text-transform: uppercase;">Ghost Flow LLC</h1>
            <p style="color: #888; font-size: 13px; margin: 4px 0 0;">New Quote Request</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 160px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #e8e8e8; font-size: 14px;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #e8e8e8; font-size: 14px;">${escapeHtml(email)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #e8e8e8; font-size: 14px;">${escapeHtml(phone || "—")}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Service</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #CC0000; font-size: 14px; font-weight: bold;">${escapeHtml(service)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Vehicle / Engine</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #e8e8e8; font-size: 14px;">${escapeHtml(vehicle)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; color: #e8e8e8; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message || "—")}</td>
            </tr>
          </table>

          <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #333;">
            <p style="color: #555; font-size: 11px; margin: 0;">
              Reply directly to this email to respond to ${escapeHtml(name)} at ${escapeHtml(email)}.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("API route error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
