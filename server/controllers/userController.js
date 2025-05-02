const bcrypt = require('bcryptjs');

const db = require('../models');
const { User } = db;

// Controller method to get all Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (error) {
    console.log('SERVER ERROR', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller method to get a User by ID
// exports.getUserById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const bobbin = await Bobbin.findByPk(id, {
//       include: [
//         {
//           model: User,
//           as: 'artists', // Alias used in associations
//         },
//         {
//           model: Clothing,
//           as: 'clothing', // Example for another association
//         },
//         {
//           model: Expression,
//           as: 'expressions', // Alias used in associations
//         },
//         {
//           model: Mutation,
//           as: 'mutations',
//         },
//         {
//           model: Bobbin,
//           as: 'offspringDetails',
//         },
//         {
//           model: Bobbin,
//           as: 'parentDetails',
//         },
//       ],
//     });
//     if (bobbin) {
//       res.json(bobbin);
//     } else {
//       res.status(404).json({ error: 'Bobbin not found' });
//     }
//   } catch (error) {
//     console.log('ERROR', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// Controller method to create a new User
exports.createUser = async (req, res) => {
  try {
    const { password, role, username } = req.body;
    // auth on route correct permissions
    // sanitize input
    // hash password
    const salt = bcrypt.genSaltSync();
    const newUser = await User.create({
      passwordHash: bcrypt.hashSync(password, salt),
      role,
      username,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller method to update a User by ID
// exports.updateUser = async (req, res) => {
//   const { id } = req.params;
//   const { name } = req.body;
//   try {
//     const bobbin = await Bobbin.findByPk(id);
//     if (bobbin) {
//       bobbin.name = name;
//       await bobbin.save();
//       res.json(bobbin);
//     } else {
//       res.status(404).json({ error: 'Bobbin not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// Controller method to delete a User by ID
// exports.deleteUser = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const bobbin = await Bobbin.findByPk(id);
//     if (bobbin) {
//       await bobbin.destroy();
//       res.json(bobbin);
//     } else {
//       res.status(404).json({ error: 'Bobbin not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
