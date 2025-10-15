import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Check environment variables
console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_PASS:", process.env.SMTP_PASS ? "Loaded ✅" : "❌ Missing");

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER, // your Gmail
    pass: process.env.SMTP_PASS, // 16-char App Password
  },
});

// Verify transporter
transporter.verify((error, success) => {
  if (error) console.log("❌ Transporter error:", error);
  else console.log("✅ Server is ready to take messages");
});

// Send a test email
const sendTestMail = async () => {
  try {
    const info = await transporter.sendMail({
      from: `"Airbnb Clone Test" <${process.env.SMTP_USER}>`,
      to: "rishangvermav15pro@gmail.com", // your email
      subject: "✅ Test Email from Node.js",
      text: "This is a test email sent using Nodemailer and Gmail.",
      html: "<b>This is a test email sent using Nodemailer and Gmail.</b>",
    });

    console.log("📨 Message sent:", info.messageId);
  } catch (err) {
    console.error("❌ Error while sending mail:", err);
  }
};

// Call the test function
sendTestMail();
