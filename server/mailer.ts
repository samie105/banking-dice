"use server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "swiftnexusbank@gmail.com",
    pass: "mezd gmqe jlla wxwu",
  },
});

export const sendMail = async (to: string, verificationCode: string) => {
  const mailOptions = {
    from: "Swift Nexus Auth support@swiftnexusbn.us",
    to,
    subject: "Your Verification Code",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4CAF50;">Your Verification Code</h2>
        <p>Hi there,</p>
        <p>Thank you for signing up. Please use the following verification code to complete your registration:</p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="display: inline-block; padding: 10px 20px; background-color: #f2f2f2; border-radius: 4px; font-size: 1.2em; color: #333;">
            ${verificationCode}
          </span>
        </div>
        <p>If you did not request this code, please ignore this email.</p>
        <p>Best regards,</p>
        <p>Swift Nexus</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email: %s", error);
    return { success: false };
  }
};
