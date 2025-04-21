
/**
 * Generates an HTML email content for email verification.
 * 
 * @param verifyUrl - The URL for verifying the user's email address.
 * @returns A string containing the HTML content for the email.
 */
export const htmlContent = (verifyUrl: string) => {
  return `
<div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;color:#333;">
  <h2 style="text-align:center;">Welcome to Our App!</h2>
  <p>Hi there,</p>
  <p>Thanks for signing up. Please verify your email address by clicking the button below:</p>
  <div style="text-align:center;margin:30px 0;">
    <a
      href="${verifyUrl}"
      style="
        background-color:#1a73e8;
        color:#fff;
        padding:12px 24px;
        text-decoration:none;
        border-radius:4px;
        font-weight:bold;
      "
      target="_blank"
    >Verify Your Email</a>
  </div>
  <p>If the button doesn’t work, copy and paste this link into your browser:</p>
  <p style="word-break:break-all;"><a href="${verifyUrl}">${verifyUrl}</a></p>
  <hr style="border:none;border-top:1px solid #eee;margin:40px 0;">
  <p style="font-size:12px;color:#888;text-align:center;">
    If you didn’t create an account, you can ignore this email.
  </p>
</div>
`;
};
