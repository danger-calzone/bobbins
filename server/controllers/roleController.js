const db = require('../models');
const { Role } = db;

// Controller method to retrieve all roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    console.log('ERROR', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
