
const jwt = require('jsonwebtoken');
const Employee = require('../Models/employee.js');

// Middleware to authenticate JWT token
const authenticateToken = async(req, res, next) => {
  const authHeader = req.header('Authorization');
  const token=authHeader.split(' ')[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'key');
    const employee = await Employee.findById(decoded.id);
    if (!employee) {
      return res.status(401).json({ error: 'Invalid token.' });
    }
    req.user = employee;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Invalid token.' });
  }
};

// Middleware to check if the user is an organizer
const authorizeOrganizer = (req, res, next) => {
  if (req.user.role !== 'organizer') {
    return res.status(403).json({ error: 'Forbidden. Access allowed only for organizers.' });
  }
  next();
};

module.exports = {
  authenticateToken,
  authorizeOrganizer,
};
