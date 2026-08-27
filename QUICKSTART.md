# 🚀 Quick Start Guide - African Nomad Safari Blog

Follow these simple steps to get your professional blog up and running:

## Step 1: Install Dependencies

```bash
cd /home/mocu/Desktop/africanNomadSafari
npm install
```

This will install all required packages including:
- Express.js - Web framework
- MongoDB - Database
- EJS - Template engine
- CORS - Cross-origin support

**⏱️ Time: 2-3 minutes**

## Step 2: Seed Your Database

```bash
npm run seed
```

This will:
- ✅ Connect to your MongoDB instance
- ✅ Insert 8 sample blog posts
- ✅ Create database indexes
- ✅ Prepare your blog for launch

**✨ Your blog data is now in MongoDB!**

## Step 3: Start the Development Server

```bash
npm run dev
```

You'll see:
```
✅ Connected to MongoDB
🚀 Blog server running on http://localhost:3000
```

## Step 4: Open Your Blog

Visit: **http://localhost:3000**

You'll see:
- 🏠 Professional homepage with featured posts
- 📝 All blog posts with search functionality
- 📱 Fully responsive mobile design
- 🎨 Beautiful categories section
- 🔗 Individual post pages with full details

## 🎯 Next Steps

### View Your Blog Posts

1. Click on any blog post from the home page
2. See the full itinerary details
3. Check out the "Why Choose" section
4. Browse related experiences

### Test the API

Try these API endpoints in your browser:

- All posts: http://localhost:3000/api/blogs
- Single post: http://localhost:3000/api/blogs/7-days-safari-tanzania
- Categories: http://localhost:3000/api/categories/list
- Featured: http://localhost:3000/api/blogs/featured/all

### Search Functionality

1. Use the search box on the homepage
2. Or visit: http://localhost:3000/api/blogs?search=safari
3. Filter by category: http://localhost:3000/api/blogs?category=Honeymoon

## 📝 Add More Blog Posts

### Quick Method:

Edit `scripts/seedDatabase.js` and add a new object to the `blogs` array:

```javascript
{
  title: "Your Amazing Itinerary",
  slug: "your-slug-name",
  duration: "X Days / Y Nights",
  type: "Type of Experience",
  destinations: "Location 1, Location 2",
  intro: "Your introduction here...",
  content: "Full content here...",
  best_for: "Target audience...",
  highlights: "Key highlights...",
  category: "Safari", // or "Honeymoon", "Mountain Trekking", etc.
  featured: true,
  image: "images/your-image.jpg",
  author: "African Nomad Safari",
  readTime: 8,
  createdAt: new Date(),
  updatedAt: new Date()
}
```

Then run:
```bash
npm run seed
```

## 🎨 Customize Your Blog

### Change Colors

Edit `/public/styles.css` - look for `:root` variables:

```css
:root {
  --primary-color: #1a472a;      /* Change primary color */
  --secondary-color: #c9302c;    /* Change accent color */
  --light-bg: #f5f5f5;           /* Change background */
}
```

### Update Navigation

Edit `/views/index.ejs` - modify navbar links and footer

### Adjust Content

Edit `/views/blog-detail.ejs` - customize blog post layout

## 📦 Project Files Explained

```
🗂️ config/db.js           - MongoDB connection setup
🗂️ routes/api.js          - API endpoints (search, filter, etc.)
🗂️ views/index.ejs        - Blog homepage
🗂️ views/blog-detail.ejs  - Individual post pages
🗂️ public/styles.css      - Professional styling
🗂️ scripts/seedDatabase.js - Database population script
🗂️ server.js              - Main Express server
```

## 🚀 Deployment Options

### Option 1: Heroku (Easiest)

```bash
# Create Heroku account
# Install Heroku CLI
heroku login
heroku create your-blog-name
heroku config:set MONGO_URI="your_mongodb_uri"
git push heroku main
```

### Option 2: DigitalOcean / AWS / Linode

```bash
# Upload files to your server
npm install
npm run seed
# Set up PM2 or systemd to keep server running
pm2 start server.js
```

### Option 3: Self-hosted

```bash
# On your local machine or server
npm run dev  # For development
npm start    # For production
```

## ✅ Checklist

- [ ] Run `npm install`
- [ ] Run `npm run seed`
- [ ] Start with `npm run dev`
- [ ] Visit http://localhost:3000
- [ ] Browse blog posts
- [ ] Test search functionality
- [ ] View individual posts
- [ ] Try API endpoints
- [ ] Customize colors and branding
- [ ] Add your own blog posts
- [ ] Deploy to production

## 📞 Common Commands

```bash
# Start development server (auto-reload)
npm run dev

# Start production server
npm start

# Seed database with initial data
npm run seed

# Install new package
npm install package-name

# Check for outdated packages
npm outdated
```

## 🆘 Need Help?

### Server won't start?
```bash
# Port might be in use, kill it:
lsof -ti:3000 | xargs kill -9
npm run dev
```

### MongoDB connection error?
- Check MONGO_URI in .env file
- Verify MongoDB cluster is accessible
- Check IP whitelist in MongoDB Atlas

### Images not loading?
- Place images in `/public/images/` folder
- Update image paths in blog data
- Restart server: Ctrl+C, then `npm run dev`

---

## 🎉 You're All Set!

Your professional African Nomad Safari blog is now running.

**Happy blogging! 🌍✈️🦁**

For more details, see `README.md`
