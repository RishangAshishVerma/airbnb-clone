// utils/nodemailer.js
import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // app password (16 characters)
  },
});

// Verify transporter
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Mail transporter error:", error);
  } else {
    console.log("✅ Mail transporter ready to send emails");
  }
});

// sendmail function
export const sendmail = async (to, subject, text, html) => {
  try {
    console.log("📤 Sending email to:", to);
    console.log("📜 Subject:", subject);
    console.log("📧 Text:", text);

    const info = await transporter.sendMail({
      from: `"Airbnb Clone" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("✅ Email sent successfully:", info.messageId);
    console.log("🔗 Preview URL:", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("❌ Error while sending mail:", err);
  }
};

