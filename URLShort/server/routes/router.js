const express = require('express');
const shortid = require('shortid');
const Register = require('../model/student');

const router = express.Router();

// POST - Create short URL
router.post('/shorten', async (req, res) => {
  try {
    const { longUrl } = req.body;
    const shortCode = shortid.generate();
    const shortUrl = `${req.protocol}://${req.get('host')}/${shortCode}`;

    const url = new Register({ longUrl, shortUrl });
    await Register.save();

    res.json({ shortUrl });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET - Redirect short URL
router.get('/:code', async (req, res) => {
  try {
    const code = `${req.protocol}://${req.get('host')}/${req.params.code}`;
    const url = await Register.findOne({ shortUrl: code });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      res.status(404).json({ error: 'URL not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
