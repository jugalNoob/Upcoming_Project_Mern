
const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const Register = require('../model/student');

// POST - Create short URL
router.post('/shorten', async (req, res) => {
  try {
    const { longUrl, nameUrl, nameShortUrl } = req.body;

    // ✅ Validate required fields
    if (!longUrl || !nameUrl || !nameShortUrl) {
      return res.status(400).json({ 
        error: 'longUrl, nameUrl, and nameShortUrl are required' 
      });
    }

    // ✅ Generate unique short code + short URL
    const shortCode = shortid.generate();
    const shortUrl = `${req.protocol}://${req.get('host')}/${shortCode}`;

    // ✅ Build the document using array fields
    const newUrl = new Register({
      longUrls: [
        {
          longUrl,
          nameUrl
        }
      ],
      shortUrls: [
        {
          shortUrl,
          nameShortUrl
        }
      ],
      shortCode
    });

    // ✅ Save to MongoDB
    const savedData = await newUrl.save();
    console.log('✅ Saved Data:', savedData);

    res.json({
      message: 'Short URL created successfully',
      shortUrl: shortUrl,
      shortCode: shortCode,
      nameShortUrl: nameShortUrl
    });

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

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
