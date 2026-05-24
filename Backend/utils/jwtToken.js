const sendToken = (user, statusCode, res, sessionId) => {
  const token = user.getSignedJwtToken(sessionId);

  const isProduction = process.env.NODE_ENV === 'production';
  const cookieExpireDays = parseInt(process.env.COOKIE_EXPIRE, 10) || 30;

  const options = {
    expires: new Date(
      Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: isProduction, // secure in production only
    sameSite: isProduction ? 'strict' : 'lax', // prevent CSRF, allowing local dev
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;