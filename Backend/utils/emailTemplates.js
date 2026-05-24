const getOTPTemplate = (otp, type) => {
  const titles = {
    verification: 'Verify Your Email',
    forgotPassword: 'Reset Your Password',
  };

  const messages = {
    verification: 'Thank you for joining Soliva. Please use the following OTP to verify your email address. This OTP is valid for 10 minutes.',
    forgotPassword: 'We received a request to reset your password. Please use the following OTP to proceed. This OTP is valid for 10 minutes.',
  };

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #4f46e5; margin: 0;">Soliva</h1>
      </div>
      <h2 style="color: #333;">${titles[type]}</h2>
      <p style="color: #555; line-height: 1.5;">${messages[type]}</p>
      <div style="text-align: center; margin: 30px 0;">
        <div style="display: inline-block; padding: 15px 30px; background-color: #f3f4f6; border-radius: 8px; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #111827;">
          ${otp}
        </div>
      </div>
      <p style="color: #777; font-size: 12px; text-align: center;">
        If you did not request this, please ignore this email or contact support if you have concerns.
      </p>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
      <p style="color: #999; font-size: 11px; text-align: center;">
        &copy; 2026 Soliva Guard. All rights reserved.
      </p>
    </div>
  `;
};

const getWelcomeTemplate = (name) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #4f46e5; margin: 0;">Soliva</h1>
      </div>
      <h2 style="color: #333;">Welcome to Soliva, ${name}!</h2>
      <p style="color: #555; line-height: 1.5;">
        We are thrilled to have you as part of our community. Your account is now verified and ready to use.
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.FRONTEND_URL}" style="display: inline-block; padding: 12px 24px; background-color: #4f46e5; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">
          Start Shopping
        </a>
      </div>
      <p style="color: #555; line-height: 1.5;">
        If you have any questions, feel free to reply to this email or visit our help center.
      </p>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
      <p style="color: #999; font-size: 11px; text-align: center;">
        &copy; 2026 Soliva Guard. All rights reserved.
      </p>
    </div>
  `;
};

const getPasswordChangedTemplate = (name) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #4f46e5; margin: 0;">Soliva</h1>
      </div>
      <h2 style="color: #333;">Password Changed Successfully</h2>
      <p style="color: #555; line-height: 1.5;">
        Hi ${name},<br/><br/>
        This is a confirmation that the password for your Soliva account has just been changed.
      </p>
      <p style="color: #555; line-height: 1.5;">
        If you made this change, you can safely ignore this email. If you did not make this change, please contact our support team immediately.
      </p>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
      <p style="color: #999; font-size: 11px; text-align: center;">
        &copy; 2026 Soliva Guard. All rights reserved.
      </p>
    </div>
  `;
};

module.exports = { getOTPTemplate, getWelcomeTemplate, getPasswordChangedTemplate };