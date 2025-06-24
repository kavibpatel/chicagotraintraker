// server.js (ES Module version)

import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

// Serve your HTML, CSS, JS, and assets from the current directory
app.use(express.static('.'));

// Proxy CTA API to bypass CORS
app.get('/api/trains', async (req, res) => {
  const apiUrl = 'https://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=1e405a900645494086dba792001874ea&rt=Red,Blue,Brn,G,Org,P,Pink,Y&outputType=JSON';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(data);
  } catch (e) {
    console.error("CTA fetch error:", e);
    res.status(500).send('Failed to fetch CTA data');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy server running at http://localhost:${PORT}`);
});
