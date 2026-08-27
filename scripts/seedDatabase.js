const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

const blogs = [
  {
    title: "11 Days Safari Trip Tanzania & Zanzibar",
    slug: "11-days-safari-trip-tanzania-zanzibar",
    duration: "11 Days / 10 Nights",
    type: "Private safari & beach escape",
    destinations: "Tarangire, Serengeti, Ngorongoro, Lake Manyara & Zanzibar",
    intro: "This journey pairs Tanzania's iconic wildlife circuit with a relaxed finish on Zanzibar's white-sand beaches. It is designed for travelers who want varied scenery, excellent guiding, and a polished, comfortable pace.",
    content: "Experience the best of Tanzania and Zanzibar on this comprehensive 11-day journey. Start with thrilling game drives through the Northern Circuit's most iconic parks, then unwind on Zanzibar's stunning beaches.",
    best_for: "Couples, first-time visitors, and travelers who want a classic safari with a beach finale.",
    highlights: "Northern circuit game drives, a crater experience, and a slow island finale.",
    category: "Safari & Beach",
    featured: true,
    image: "images/zanzibar-safari.jpg",
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    author: "African Nomad Safari",
    readTime: 8
  },
  {
    title: "7 Days Safari Tanzania",
    slug: "7-days-safari-tanzania",
    duration: "7 Days / 6 Nights",
    type: "Classic northern Tanzania safari",
    destinations: "Tarangire, Lake Manyara, Ngorongoro & Serengeti",
    intro: "A compact yet deeply rewarding safari crafted around the highlights of northern Tanzania. Each day is paced to give you maximum wildlife time without the feeling of rushing.",
    content: "Discover the wonders of Tanzania's Northern Circuit in just 7 days. This itinerary covers Tarangire, Lake Manyara, Ngorongoro Crater, and the Serengeti.",
    best_for: "Travelers with limited time who still want the signature safari experience.",
    highlights: "Elephant-rich landscapes, crater views, and high-density wildlife sightings in the Serengeti.",
    category: "Safari",
    featured: true,
    image: "images/serengeti-wildlife.jpg",
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    author: "African Nomad Safari",
    readTime: 6
  },
  {
    title: "12 Day Honeymoon Tanzania & Zanzibar",
    slug: "12-day-honeymoon-tanzania-zanzibar",
    duration: "12 Days / 11 Nights",
    type: "Romantic safari & island getaway",
    destinations: "Tarangire, Ngorongoro, Serengeti & Zanzibar",
    intro: "This romantic itinerary blends intimate safari moments with warm beach evenings and luxurious stays. It is crafted for couples wanting privacy, scenery, and unforgettable wildlife encounters.",
    content: "Create unforgettable memories on your honeymoon with this 12-day romantic escape. Combining the thrill of a private safari with the romance of Zanzibar's pristine beaches.",
    best_for: "Honeymooners and couples seeking an elegant, slow-paced East African escape.",
    highlights: "Private game viewing, boutique stays, and a relaxing end on the island.",
    category: "Honeymoon",
    featured: true,
    image: "images/honeymoon-beach.jpg",
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    author: "African Nomad Safari",
    readTime: 9
  },
  {
    title: "5 Day Tanzania Safari Small Group Trip",
    slug: "5-day-tanzania-safari-small-group",
    duration: "5 Days / 4 Nights",
    type: "Small-group safari adventure",
    destinations: "Tarangire, Lake Manyara, Ngorongoro & Serengeti",
    intro: "A short, well-balanced safari for travelers who want to see the essentials without spending too much time on the road. It is lively, social, and rich in wildlife moments.",
    content: "Perfect for those with limited time, this 5-day group safari hits all the major highlights of Tanzania's Northern Circuit.",
    best_for: "Solo travelers, couples, and small groups who want a compact safari.",
    highlights: "A strong introduction to Tanzania's most iconic parks and wildlife habitats.",
    category: "Safari",
    featured: false,
    image: "images/safari-group.jpg",
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    author: "African Nomad Safari",
    readTime: 5
  },
  {
    title: "18 Days Tanzania Safari & Zanzibar Vacation",
    slug: "18-days-tanzania-safari-zanzibar-vacation",
    duration: "18 Days / 17 Nights",
    type: "Extended wildlife & beach journey",
    destinations: "Tarangire, Serengeti, Ngorongoro, Ruaha & Zanzibar",
    intro: "An immersive long-form safari for travelers who want depth, flexibility, and space to absorb Tanzania's landscapes at a slower rhythm.",
    content: "This extended 18-day journey allows you to experience Tanzania's diverse ecosystems at a leisurely pace, with plenty of time for relaxation and exploration.",
    best_for: "Families, photographers, and travelers looking for an all-encompassing Tanzania experience.",
    highlights: "Migration tracking, varied ecosystems, and a calm beachfront finish.",
    category: "Extended Safari",
    featured: true,
    image: "images/extended-safari.jpg",
    createdAt: new Date('2023-12-28'),
    updatedAt: new Date('2023-12-28'),
    author: "African Nomad Safari",
    readTime: 12
  },
  {
    title: "9 Days Safari Vacation Tanzania Wildebeest Migration",
    slug: "9-days-safari-migration-tanzania",
    duration: "9 Days / 8 Nights",
    type: "Migration-focused safari",
    destinations: "Tarangire, Serengeti, Ngorongoro & Central Tanzania",
    intro: "This safari is shaped around the Great Migration, with carefully timed wildlife movements and plenty of opportunity to witness the drama of the plains.",
    content: "Witness one of nature's greatest spectacles - the Great Wildebeest Migration. This 9-day adventure is timed to catch the most dramatic wildlife moments.",
    best_for: "Wildlife lovers and first-time safari guests chasing memorable migration sightings.",
    highlights: "Herd movements, predator action, and classic east African scenery.",
    category: "Migration Safari",
    featured: false,
    image: "images/migration.jpg",
    createdAt: new Date('2023-12-25'),
    updatedAt: new Date('2023-12-25'),
    author: "African Nomad Safari",
    readTime: 7
  },
  {
    title: "6 Days Kilimanjaro Machame Route",
    slug: "6-days-kilimanjaro-machame",
    duration: "6 Days / 5 Nights",
    type: "Mountain trekking adventure",
    destinations: "Kilimanjaro - Machame Route",
    intro: "Challenge yourself with the popular Machame Route, known for its scenic beauty and high summit success rates. Perfect for moderate to experienced hikers.",
    content: "Climb Africa's highest peak via the stunning Machame Route. This 6-day trek offers excellent acclimatization and breathtaking views.",
    best_for: "Fit hikers and mountain enthusiasts seeking a rewarding Kilimanjaro experience.",
    highlights: "Diverse vegetation zones, stunning alpine views, and high success rate.",
    category: "Mountain Trekking",
    featured: false,
    image: "images/kilimanjaro.jpg",
    createdAt: new Date('2023-12-20'),
    updatedAt: new Date('2023-12-20'),
    author: "African Nomad Safari",
    readTime: 6
  },
  {
    title: "8 Days Tanzania Holiday: Complete Safari Experience",
    slug: "8-days-tanzania-complete-safari",
    duration: "8 Days / 7 Nights",
    type: "Complete northern safari",
    destinations: "Tarangire, Lake Manyara, Ngorongoro & Serengeti",
    intro: "A balanced and efficient itinerary that covers the signature parks of northern Tanzania without feeling overly rushed. Every stop is chosen for maximum variety and wildlife.",
    content: "Experience Tanzania's complete Northern Circuit in 8 carefully planned days. Visit all major parks and maximize your wildlife sightings.",
    best_for: "Travelers who want a dependable all-rounder safari with excellent value.",
    highlights: "A strong mix of scenery, game drives, and classic safari stops.",
    category: "Safari",
    featured: true,
    image: "images/complete-safari.jpg",
    createdAt: new Date('2023-12-15'),
    updatedAt: new Date('2023-12-15'),
    author: "African Nomad Safari",
    readTime: 8
  }
];

async function seedDatabase() {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db('african_nomad_safari');
    
    // Clear existing blogs
    const result = await db.collection('blogs').deleteMany({});
    console.log(`🗑️  Cleared ${result.deletedCount} existing blogs`);

    // Insert new blogs
    const insertResult = await db.collection('blogs').insertMany(blogs);
    console.log(`✅ Inserted ${insertResult.insertedCount} blog posts`);

    // Create indexes
    await db.collection('blogs').createIndex({ slug: 1 }, { unique: true });
    await db.collection('blogs').createIndex({ createdAt: -1 });
    await db.collection('blogs').createIndex({ category: 1 });
    console.log('✅ Created database indexes');

    console.log('\n🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedDatabase();
