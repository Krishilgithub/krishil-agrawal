import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, purpose, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `[Portfolio] ${purpose || "New Message"} from ${name}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
        <div style="background: #000; padding: 28px 32px;">
          <h2 style="color: #fff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px;">New Portfolio Message</h2>
          <p style="color: #9ca3af; margin: 4px 0 0; font-size: 13px;">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
        </div>
        <div style="padding: 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #6b7280; font-size: 13px; font-weight: 600; width: 120px;">FROM</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #111827; font-size: 14px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #6b7280; font-size: 13px; font-weight: 600;">EMAIL</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><a href="mailto:${email}" style="color: #dc2626; text-decoration: none; font-size: 14px;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #6b7280; font-size: 13px; font-weight: 600;">PURPOSE</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #111827; font-size: 14px;">${purpose || "Not specified"}</td>
            </tr>
          </table>
          <div style="margin-top: 24px;">
            <p style="color: #6b7280; font-size: 13px; font-weight: 600; margin: 0 0 10px;">MESSAGE</p>
            <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 18px; color: #374151; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</div>
          </div>
          <a href="mailto:${email}?subject=Re: ${purpose || "Your message"} - Krishil Agrawal" style="display: inline-block; margin-top: 24px; background: #000; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 600;">Reply to ${name}</a>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Nodemailer error:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
