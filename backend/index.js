
//optopn 1: saving data into a local PostgreSQL database

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

// PostgreSQL connection pool
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

app.use(cors());
app.use(express.json());

// Save form submission
app.post('/submit', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO submissions (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving submission');
  }
});

// Get all submissions
app.get('/submissions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM submissions ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching submissions');
  }
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});




// option 2: saving data into a Supabase database 

// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const { createClient } = require('@supabase/supabase-js');

// const app = express();
// const port = 5000;

// // Supabase client
// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_KEY
// );

// app.use(cors());
// app.use(express.json());

// // Save form submission
// app.post('/submit', async (req, res) => {
//   const { name, email, message } = req.body;
//   const { data, error } = await supabase
//     .from('submissions')
//     .insert([{ name, email, message }]);

//   if (error) return res.status(400).json({ error: error.message });
//   res.json({ success: true, data });
// });

// // Get all submissions
// app.get('/submissions', async (req, res) => {
//   const { data, error } = await supabase
//     .from('submissions')
//     .select('*')
//     .order('created_at', { ascending: false });

//   if (error) return res.status(400).json({ error: error.message });
//   res.json(data);
// });

// app.listen(port, () => {
//   console.log(`Backend running at http://localhost:${port}`);
// });
