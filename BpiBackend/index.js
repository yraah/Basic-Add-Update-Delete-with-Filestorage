import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure 'uploads/' directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filenames
  },
});

const upload = multer({ storage });


// Endpoint to register a new user with a photo
app.post('/api/register', upload.single('photo'), async (req, res) => {
  const { name, username, country, email, account_type } = req.body;
  const photo_url = req.file ? `/uploads/${req.file.filename}` : null;
  try {
    const query = `
      INSERT INTO user_accounts (name, username, country, email, account_type, photo)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [name, username, country, email, account_type, photo_url];
    const result = await pool.query(query, values);

    res.json({
      message: 'User added successfully!',
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding user' });
  }
});



// Endpoint to fetch all users
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM user_accounts');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.put('/api/users/:id', upload.single('photo'), async (req, res) => {
  const { id } = req.params;
  const { name, username, country, email, account_type } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;
  
  try {
    // Update query including photo if provided
    const result = await pool.query(
      `UPDATE user_accounts
       SET name = $1, username = $2, country = $3, email = $4, account_type = $5, photo = COALESCE($6, photo)
       WHERE id = $7
       RETURNING *`,
      [name, username, country, email, account_type, photo, id]
    );
  
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating user');
  }
});

// Endpoint to delete a user
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM user_accounts WHERE id = $1', [id]);
    res.json({ message: 'User deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting user' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
