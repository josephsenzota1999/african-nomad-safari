const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const { connectDB, getDB } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !process.env.SESSION_SECRET) {
  throw new Error('ADMIN_USERNAME, ADMIN_PASSWORD, and SESSION_SECRET must be set in .env');
}

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'african-nomad-safari', 'images')));

// Connect to MongoDB
connectDB();

// Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'african-nomad-safari', 'admin.html'));
});

// Frontend routes
app.get('/', async (req, res) => {
  try {
    const db = getDB();
    const blogs = await db.collection('blogs').find({}).sort({ createdAt: -1 }).toArray();
    res.render('index', { blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).render('error', { message: 'Failed to load blog posts' });
  }
});

app.get('/blog/:slug', async (req, res) => {
  try {
    const db = getDB();
    const blog = await db.collection('blogs').findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).render('error', { message: 'Blog post not found' });
    }
    res.render('blog-detail', { blog });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).render('error', { message: 'Failed to load blog post' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Blog server running on http://localhost:${PORT}`);
});
