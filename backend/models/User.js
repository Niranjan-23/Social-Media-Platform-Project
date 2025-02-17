// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../middlewares/verifyToken');

// Update User Profile
router.put('/:id', verifyToken, async (req, res) => {
  // Allow only the owner to update their profile
  if (req.user.id === req.params.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: 'Error updating user' });
    }
  } else {
    res.status(403).json({ message: 'You can only update your own account' });
  }
});

module.exports = router;
