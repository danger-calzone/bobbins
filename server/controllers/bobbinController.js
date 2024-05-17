const db = require('../models');
const { Bobbin } = db;

// Controller method to get all Bobbins
exports.getAllBobbins = async (req, res) => {
  try {
    console.log('BOBBIN', Bobbin);
    const bobbins = await Bobbin.findAll();
    res.json(bobbins);
  } catch (error) {
    console.log('ERROR', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller method to get a Bobbin by ID
exports.getBobbinById = async (req, res) => {
  const { id } = req.params;
  try {
    const bobbin = await Bobbin.findByPk(id);
    if (bobbin) {
      res.json(bobbin);
    } else {
      res.status(404).json({ error: 'Bobbin not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getBobbinsByOwnerId = async (req, res) => {
  const { ownerId } = req.params;
  try {
    const bobbins = await Bobbin.findAll({
      where: { ownerId },
    });
    if (!bobbins.length) {
      return res
        .status(404)
        .send({ message: 'No bobbins found for the given owner ID.' });
    }

    res.status(200).json(bobbins);
  } catch (error) {
    console.error('Error fetching bobbins:', error);
    res.status(500).send({ message: 'Failed to fetch bobbins.' });
  }
};

// Controller method to create a new Bobbin
exports.createBobbin = async (req, res) => {
  const { name } = req.body;
  try {
    const newBobbin = await Bobbin.create({
      name,
    });
    res.status(201).json(newBobbin);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller method to update a Bobbin by ID
exports.updateBobbin = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const bobbin = await Bobbin.findByPk(id);
    if (bobbin) {
      bobbin.name = name;
      await bobbin.save();
      res.json(bobbin);
    } else {
      res.status(404).json({ error: 'Bobbin not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller method to delete a Bobbin by ID
exports.deleteBobbin = async (req, res) => {
  const { id } = req.params;
  try {
    const bobbin = await Bobbin.findByPk(id);
    if (bobbin) {
      await bobbin.destroy();
      res.json(bobbin);
    } else {
      res.status(404).json({ error: 'Bobbin not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
