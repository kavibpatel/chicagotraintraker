// server.js (ES Module version)

/* RUN THESE FIRST */
//npm install
// node server.js

import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/trains', async (req, res) => {
  const apiUrl = 'https://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=1e405a900645494086dba792001874ea&rt=Red,Blue,Brn,G,Org,P,Pink,Y&outputType=JSON';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(data);
  } catch (e) {
    res.status(500).send('Failed to fetch CTA data');
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
