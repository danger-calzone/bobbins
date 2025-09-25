// Custom middleware for authorization
// eslint-disable-next-line consistent-return
module.exports = function checkAuthorization(req, res, next) {
  const secretKey = process.env.REGISTRATION_SECRET_KEY;

  // Check if the provided secret key matches the predefined key
  const providedKey = req.headers['x-secret-key'];
  if (providedKey !== secretKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // If the key matches, allow the request to proceed
  next();
};
