# African Nomad Safari - Professional Blog Platform

A modern, professional news and travel blog for African safari, destination, and conservation stories. Built with Node.js, Express, MongoDB, and EJS templates.

## 🚀 Features

- **Professional Blog Interface** - Clean, modern design optimized for travel content
- **MongoDB Database** - Scalable data storage for blog posts and itineraries
- **RESTful API** - Complete API for blog post management and filtering
- **Search & Filter** - Search by title, destination, and category
- **Responsive Design** - Mobile-friendly interface that works on all devices
- **Featured Posts** - Highlight your best itineraries
- **Category Management** - Organize content by type (Safari, Honeymoon, Trekking, etc.)
- **Social Sharing** - Built-in social sharing buttons
- **SEO Optimized** - Proper meta tags and structured content
- **Newsletter Signup** - Collect email subscriptions

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn package manager

## 🔧 Installation & Setup

### 1. Install Dependencies

```bash
cd /home/mocu/Desktop/africanNomadSafari
npm install
```

### 2. Configure Environment Variables

The `.env` file already contains your MongoDB URI:

```env
MONGO_URI=mongodb+srv://joesenzota_db_user:Wild2026@cluster0.hrqnr7p.mongodb.net/?appName=Cluster0
PORT=3000
```

You can optionally add:
```env
NODE_ENV=development
```

### 3. Seed the Database

Populate MongoDB with sample news articles:

```bash
npm run seed
```

This will:
- Connect to your MongoDB instance
- Clear any existing blog posts
- Insert 4 sample editorial articles
- Create necessary database indexes

### 4. Start the Server

**Development Mode** (with auto-reload):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

The server will start on `http://localhost:3000`

## 📁 Project Structure

```
africanNomadSafari/
├── config/
│   └── db.js              # MongoDB connection configuration
├── routes/
│   └── api.js             # API routes and endpoints
├── views/
│   ├── index.ejs          # Blog home page
│   ├── blog-detail.ejs    # Individual blog post page
│   └── error.ejs          # Error page
├── public/
│   └── styles.css         # Professional styling
├── scripts/
│   └── seedDatabase.js    # Database seeding script
├── server.js              # Main Express server
├── package.json           # Project dependencies
├── .env                   # Environment variables
└── README.md              # This file
```

## 🌐 API Endpoints

### Get All Blogs
```
GET /api/blogs
```
Query parameters:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `category` - Filter by category
- `search` - Search term

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 8,
    "pages": 1
  }
}
```

### Get Single Blog
```
GET /api/blogs/:slug
```

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

### Get Categories
```
GET /api/categories/list
```

### Get Featured Blogs
```
GET /api/blogs/featured/all
```

## 🎨 Frontend Routes

| Route | Description |
|-------|-------------|
| `/` | Blog home page with all posts |
| `/blog/:slug` | Individual blog post detail page |

## 📊 Database Schema

### Blog Post Model

```javascript
{
  _id: ObjectId,
  title: String,
  slug: String (unique),
  duration: String,
  type: String,
  destinations: String,
  intro: String,
  content: String,
  best_for: String,
  highlights: String,
  category: String,
  featured: Boolean,
  image: String,
  author: String,
  readTime: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎯 How to Add New Blog Posts

### Option 1: Direct MongoDB Insertion

```javascript
db.collection('blogs').insertOne({
  title: "Your Itinerary Title",
  slug: "your-itinerary-slug",
  duration: "X Days / Y Nights",
  type: "Type of Experience",
  destinations: "Location, Location",
  intro: "Short introduction...",
  content: "Full detailed content...",
  best_for: "Who this is best for...",
  highlights: "Key highlights...",
  category: "Safari", // or "Honeymoon", "Mountain Trekking", etc.
  featured: false,
  image: "images/your-image.jpg",
  author: "African Nomad Safari",
  readTime: 8,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

### Option 2: Update Seed Script

Edit `scripts/seedArticles.js`, add your article to the `articles` array, and run:

```bash
npm run seed
```

### Option 3: Admin Editor

Set `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `SESSION_SECRET` in `.env`, run `npm start`, and open `http://localhost:3000/admin`. The protected editor supports publishing, editing, deleting posts, and uploading up to 10 images per article. Do not use the sample credentials in production.

## 🖼️ Adding Images

Place your blog post images in the `public/images/` directory and reference them in the blog data:

```
image: "images/your-image.jpg"
```

## 🚀 Deployment

### Heroku Deployment

1. Create a Heroku account and install Heroku CLI
2. Log in: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables:
   ```bash
   heroku config:set MONGO_URI="your_mongodb_uri"
   ```
5. Deploy: `git push heroku main`

### AWS/DigitalOcean/Other VPS

1. Upload files to your server
2. Install Node.js and npm
3. Run `npm install` and `npm run seed`
4. Set up a process manager (PM2, systemd, etc.)
5. Configure a reverse proxy (Nginx/Apache)
6. Set up SSL with Let's Encrypt

## 🔒 Security Best Practices

1. **Never commit `.env`** - Keep credentials secure
2. **Use environment variables** - Store sensitive data in `.env`
3. **Validate input** - Sanitize all user input
4. **Rate limiting** - Consider adding rate limiting to API endpoints
5. **HTTPS only** - Use HTTPS in production
6. **CORS configuration** - Restrict CORS if needed

## 📝 Customization

### Change Colors

Edit the CSS variables in `public/styles.css`:

```css
:root {
  --primary-color: #1a472a;    /* Main brand color */
  --secondary-color: #c9302c;  /* Accent color */
  --accent-color: #8b7355;     /* Additional accent */
  /* ... more variables ... */
}
```

### Modify Navigation

Edit the navbar in `views/index.ejs` and `views/blog-detail.ejs`

### Add Features

- Add user comments
- Implement blog post search with Elasticsearch
- Add booking system integration
- Create admin panel for content management
- Add photo gallery per blog post

## 🐛 Troubleshooting

### MongoDB Connection Error
- Verify MONGO_URI in `.env` is correct
- Check MongoDB connection string format
- Ensure IP is whitelisted in MongoDB Atlas

### Port Already in Use
- Change PORT in `.env`
- Kill process: `lsof -ti:3000 | xargs kill -9`

### Images Not Loading
- Ensure images are in `public/images/` directory
- Check image paths in blog data
- Use absolute paths from public folder

### Database Seed Fails
- Ensure MongoDB is accessible
- Check MongoDB Atlas credentials
- Clear any existing "blogs" collection first

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📄 License

This project is created for African Nomad Safari. All rights reserved.

## 📧 Support

For issues or questions, contact the development team.

---

**Happy Blogging! 🌍✈️🦁**
