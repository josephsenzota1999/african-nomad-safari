const express = require('express');
const crypto = require('crypto');
const path = require('path');
const multer = require('multer');
const router = express.Router();
const { getDB } = require('../config/db');

const imageDirectory = path.join(__dirname, '..', 'african-nomad-safari', 'images');
const upload = multer({
  storage: multer.diskStorage({
    destination: imageDirectory,
    filename: (req, file, callback) => {
      const extension = path.extname(file.originalname).toLowerCase();
      const baseName = path.basename(file.originalname, extension).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'article-image';
      callback(null, `${Date.now()}-${baseName}${extension}`);
    }
  }),
  limits: { files: 10, fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.mimetype)) {
      return callback(new Error('Only JPG, PNG, WEBP, and GIF images are allowed'));
    }
    callback(null, true);
  }
});

const SESSION_COOKIE = 'admin_session';
const SESSION_MAX_AGE = 8 * 60 * 60 * 1000;

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(left || '');
  const rightBuffer = Buffer.from(right || '');
  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function signSession(username, timestamp) {
  const payload = `${username}.${timestamp}`;
  const signature = crypto.createHmac('sha256', process.env.SESSION_SECRET).update(payload).digest('hex');
  return `${payload}.${signature}`;
}

function parseCookies(header) {
  return (header || '').split(';').reduce((cookies, pair) => {
    const separator = pair.indexOf('=');
    if (separator > -1) cookies[pair.slice(0, separator).trim()] = decodeURIComponent(pair.slice(separator + 1).trim());
    return cookies;
  }, {});
}

function requireAdmin(req, res, next) {
  const token = parseCookies(req.headers.cookie)[SESSION_COOKIE];
  const [username, timestamp, signature] = (token || '').split('.');
  const validTimestamp = Number(timestamp) && Date.now() - Number(timestamp) < SESSION_MAX_AGE;
  const expectedSignature = username && timestamp ? signSession(username, timestamp).split('.').pop() : '';

  if (!username || !validTimestamp || !safeEqual(signature, expectedSignature) || !safeEqual(username, process.env.ADMIN_USERNAME)) {
    return res.status(401).json({ success: false, error: 'Authentication required' });
  }
  next();
}

function slugify(value) {
  return String(value || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function getBlogFields(body) {
  const images = Array.isArray(body.images)
    ? body.images.map(image => String(image).trim()).filter(Boolean)
    : String(body.images || body.image || '').split(/\r?\n|,/).map(image => image.trim()).filter(Boolean);

  return {
    title: String(body.title || '').trim(),
    slug: slugify(body.slug || body.title),
    duration: String(body.duration || '').trim(),
    type: String(body.type || '').trim(),
    destinations: String(body.destinations || '').trim(),
    intro: String(body.intro || '').trim(),
    content: String(body.content || '').trim(),
    best_for: String(body.best_for || '').trim(),
    highlights: String(body.highlights || '').trim(),
    category: String(body.category || 'Safari').trim(),
    featured: Boolean(body.featured),
    image: images[0] || '',
    images,
    author: String(body.author || process.env.ADMIN_USERNAME || 'African Nomad Safari').trim(),
    readTime: Number(body.readTime) || 5
  };
}

router.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!safeEqual(username, process.env.ADMIN_USERNAME) || !safeEqual(password, process.env.ADMIN_PASSWORD)) {
    return res.status(401).json({ success: false, error: 'Invalid username or password' });
  }

  const token = signSession(username, Date.now());
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${SESSION_COOKIE}=${encodeURIComponent(token)}; HttpOnly; SameSite=Strict; Max-Age=${SESSION_MAX_AGE / 1000}; Path=/${secure}`);
  res.json({ success: true });
});

router.post('/auth/logout', (req, res) => {
  res.setHeader('Set-Cookie', `${SESSION_COOKIE}=; HttpOnly; SameSite=Strict; Max-Age=0; Path=/`);
  res.json({ success: true });
});

router.get('/auth/session', requireAdmin, (req, res) => {
  res.json({ success: true, username: process.env.ADMIN_USERNAME });
});

router.post('/uploads', requireAdmin, (req, res, next) => {
  upload.array('images', 10)(req, res, error => {
    if (error) return res.status(400).json({ success: false, error: error.message });
    next();
  });
}, (req, res) => {
  res.status(201).json({
    success: true,
    images: req.files.map(file => `images/${file.filename}`)
  });
});

// Get all blogs with pagination and filtering
router.get('/blogs', async (req, res) => {
  try {
    const db = getDB();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;
    const search = req.query.search;

    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { intro: { $regex: search, $options: 'i' } },
        { destinations: { $regex: search, $options: 'i' } }
      ];
    }

    const total = await db.collection('blogs').countDocuments(query);
    const blogs = await db.collection('blogs')
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    res.json({
      success: true,
      data: blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single blog by slug
router.get('/blogs/:slug', async (req, res) => {
  try {
    const db = getDB();
    const blog = await db.collection('blogs').findOne({ slug: req.params.slug });
    
    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }

    res.json({ success: true, data: blog });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get blog categories
router.get('/categories/list', async (req, res) => {
  try {
    const db = getDB();
    const categories = await db.collection('blogs').distinct('category');
    res.json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get featured blogs
router.get('/blogs/featured/all', async (req, res) => {
  try {
    const db = getDB();
    const featured = await db.collection('blogs')
      .find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .toArray();
    
    res.json({ success: true, data: featured });
  } catch (error) {
    console.error('Error fetching featured blogs:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/blogs', requireAdmin, async (req, res) => {
  try {
    const blog = getBlogFields(req.body);
    if (!blog.title || !blog.slug || !blog.intro || !blog.content) {
      return res.status(400).json({ success: false, error: 'Title, intro, and content are required' });
    }

    const now = new Date();
    const result = await getDB().collection('blogs').insertOne({ ...blog, createdAt: now, updatedAt: now });
    res.status(201).json({ success: true, data: { ...blog, _id: result.insertedId, createdAt: now, updatedAt: now } });
  } catch (error) {
    const status = error.code === 11000 ? 409 : 500;
    res.status(status).json({ success: false, error: status === 409 ? 'A post with this slug already exists' : error.message });
  }
});

router.put('/blogs/:slug', requireAdmin, async (req, res) => {
  try {
    const blog = getBlogFields(req.body);
    if (!blog.title || !blog.slug || !blog.intro || !blog.content) {
      return res.status(400).json({ success: false, error: 'Title, intro, and content are required' });
    }

    const result = await getDB().collection('blogs').findOneAndUpdate(
      { slug: req.params.slug },
      { $set: { ...blog, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
    if (!result) return res.status(404).json({ success: false, error: 'Blog not found' });
    res.json({ success: true, data: result });
  } catch (error) {
    const status = error.code === 11000 ? 409 : 500;
    res.status(status).json({ success: false, error: status === 409 ? 'A post with this slug already exists' : error.message });
  }
});

router.delete('/blogs/:slug', requireAdmin, async (req, res) => {
  try {
    const result = await getDB().collection('blogs').deleteOne({ slug: req.params.slug });
    if (!result.deletedCount) return res.status(404).json({ success: false, error: 'Blog not found' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
