import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Portfolio Newsletter" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // sending it to myself
    subject: `New Newsletter Subscriber!`,
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
        <div style="background: #000; padding: 28px 32px;">
          <h2 style="color: #fff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px;">Newsletter Subscription</h2>
          <p style="color: #9ca3af; margin: 4px 0 0; font-size: 13px;">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
        </div>
        <div style="padding: 32px;">
          <p style="color: #374151; font-size: 16px; font-weight: 500; margin-bottom: 24px;">
            You have a new subscriber to your newsletter!
          </p>
          <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 18px; color: #111827; font-size: 18px; font-weight: bold; text-align: center;">
            ${email}
          </div>
          <a href="mailto:${email}?subject=Welcome to my newsletter!" style="display: block; text-align: center; margin-top: 24px; background: #dc2626; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 600;">Welcome them</a>
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
