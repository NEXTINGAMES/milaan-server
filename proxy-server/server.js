const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Optional, if you want to allow cross-origin requests to your proxy
const app = express();

// Enable CORS for your frontend
app.use(cors());

// Proxy endpoint
app.get('/api/universities', async (req, res) => {
  try {
    // Make the request to the Hipolabs API
    const response = await axios.get('http://universities.hipolabs.com/search', {
      params: { country: req.query.country || 'United States' },
    });

    // Send the response back to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching universities:', error.message);
    res.status(500).json({ error: 'Failed to fetch universities' });
  }
});

// Start the proxy server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
