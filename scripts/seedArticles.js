const { MongoClient } = require('mongodb');
require('dotenv').config();

const articles = [
  {
    title: 'Why the Serengeti Still Feels Wild',
    slug: 'why-the-serengeti-still-feels-wild',
    destinations: 'Serengeti, Tanzania',
    intro: 'Beyond the famous migration, the Serengeti offers a quieter kind of wonder: open horizons, ancient rhythms, and wildlife encounters that feel completely unscripted.',
    content: 'The Serengeti is often introduced through photographs of crossing herds, but its real character reveals itself between those headline moments. Dawn arrives over a sea of grass, a lone acacia holds the horizon, and every turn of the track offers a new question.\n\nTraveling with a local guide changes the experience. You learn to read alarm calls, fresh tracks, and the movement of birds before the animals appear. That patience is what makes a safari feel less like sightseeing and more like listening to a living landscape.',
    best_for: 'Readers planning their first Tanzania safari and travelers who want a deeper connection with the landscape.',
    highlights: 'Wildlife beyond the migration, local guiding knowledge, quiet dawn and dusk experiences.',
    category: 'Safari News',
    featured: true,
    image: 'images/serengeti_wildlife.png',
    images: ['images/serengeti_wildlife.png', 'images/safari_guides_team.png', 'images/hero_safari.png'],
    author: 'African Nomad Safari',
    readTime: 5,
    createdAt: new Date('2026-08-10'),
    updatedAt: new Date('2026-08-10')
  },
  {
    title: 'The Best Time to Visit Tanzania in 2026',
    slug: 'best-time-to-visit-tanzania-2026',
    destinations: 'Tanzania',
    intro: 'There is no single best month for every traveler. Here is how weather, wildlife, landscapes, and visitor numbers shape the year.',
    content: 'Tanzania rewards travelers in every season. The dry months make wildlife easier to spot around water, while the green season brings dramatic skies, fresh landscapes, and fewer vehicles. The right choice depends on what you want to photograph and how you like to travel.\n\nFor migration viewing, timing matters because the herds move with the rain. For a first safari, a shoulder-season journey can offer a beautiful balance of comfortable weather, excellent sightings, and a more relaxed atmosphere.',
    best_for: 'Travelers comparing dates, budgets, and wildlife priorities before booking.',
    highlights: 'Season-by-season planning, migration timing, weather guidance.',
    category: 'Travel Guide',
    featured: true,
    image: 'images/hero_safari.png',
    images: ['images/hero_safari.png', 'images/serengeti_wildlife.png', 'images/zanzibar_beach.png'],
    author: 'African Nomad Safari',
    readTime: 7,
    createdAt: new Date('2026-08-05'),
    updatedAt: new Date('2026-08-05')
  },
  {
    title: 'Conservation on the Ground: Protecting Tanzania’s Wildlife',
    slug: 'conservation-on-the-ground-tanzania',
    destinations: 'Northern Tanzania',
    intro: 'A safari is more meaningful when the places and communities you visit can thrive long after your journey ends.',
    content: 'Conservation is not only about protecting charismatic animals. It is also about supporting the people who share these landscapes and creating reasons for future generations to value them. Across northern Tanzania, community partnerships, habitat protection, and responsible tourism work together.\n\nWhen travelers choose local guides, respect park rules, and stay with operators who invest responsibly, their visit becomes part of that wider effort. Small choices, repeated across thousands of journeys, can help keep wild places intact.',
    best_for: 'Responsible travelers who want to understand the impact of their safari choices.',
    highlights: 'Community partnerships, responsible tourism, habitat protection.',
    category: 'Conservation',
    featured: false,
    image: 'images/safari_guides_team.png',
    images: ['images/safari_guides_team.png', 'images/serengeti_wildlife.png', 'images/kilimanjaro_trek.png'],
    author: 'African Nomad Safari',
    readTime: 6,
    createdAt: new Date('2026-07-28'),
    updatedAt: new Date('2026-07-28')
  },
  {
    title: 'Stone Town After Sunset: A Different Side of Zanzibar',
    slug: 'stone-town-after-sunset-zanzibar',
    destinations: 'Stone Town, Zanzibar',
    intro: 'The island’s history becomes especially vivid after the heat of the day fades and Stone Town’s streets begin to fill with life.',
    content: 'Zanzibar is often described through its beaches, but Stone Town deserves time of its own. As evening arrives, carved doors glow in the last light, the waterfront fills with food stalls, and the old lanes become a meeting place for generations of island life.\n\nA thoughtful visit leaves room for both the landmarks and the unplanned moments. Take a guided walk, taste local dishes, and let the rhythm of the town set the pace.',
    best_for: 'Travelers combining a safari with culture, food, and island history.',
    highlights: 'Heritage walks, local food, waterfront evenings.',
    category: 'Destination',
    featured: false,
    image: 'images/zanzibar_beach.png',
    images: ['images/zanzibar_beach.png', 'images/safari_couple.png', 'images/hero_safari.png'],
    author: 'African Nomad Safari',
    readTime: 4,
    createdAt: new Date('2026-07-20'),
    updatedAt: new Date('2026-07-20')
  }
];

async function seedArticles() {
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    await client.connect();
    const db = client.db('african_nomad_safari');
    await db.collection('blogs').deleteMany({});
    await db.collection('blogs').insertMany(articles);
    await db.collection('blogs').createIndex({ slug: 1 }, { unique: true });
    await db.collection('blogs').createIndex({ createdAt: -1 });
    await db.collection('blogs').createIndex({ category: 1 });
    console.log(`Inserted ${articles.length} news articles.`);
  } finally {
    await client.close();
  }
}

seedArticles().catch(error => {
  console.error('Article seeding failed:', error);
  process.exit(1);
});
