from pathlib import Path
import re

root = Path(r"c:\Users\Administrator\Downloads\nomad\nomad\wild-african-nomad")

pages = [
    {
        "file": "itinerary-11-days-safari-trip-tanzania-zanzibar.html",
        "title": "11 Days Safari Trip Tanzania & Zanzibar",
        "duration": "11 Days / 10 Nights",
        "type": "Private safari & beach escape",
        "destinations": "Tarangire, Serengeti, Ngorongoro, Lake Manyara & Zanzibar",
        "intro": "This journey pairs Tanzania's iconic wildlife circuit with a relaxed finish on Zanzibar's white-sand beaches. It is designed for travelers who want varied scenery, excellent guiding, and a polished, comfortable pace.",
        "best_for": "Couples, first-time visitors, and travelers who want a classic safari with a beach finale.",
        "highlights": "Northern circuit game drives, a crater experience, and a slow island finale."
    },
    {
        "file": "itinerary-7-days-safari-tanzania.html",
        "title": "7 Days Safari Tanzania",
        "duration": "7 Days / 6 Nights",
        "type": "Classic northern Tanzania safari",
        "destinations": "Tarangire, Lake Manyara, Ngorongoro & Serengeti",
        "intro": "A compact yet deeply rewarding safari crafted around the highlights of northern Tanzania. Each day is paced to give you maximum wildlife time without the feeling of rushing.",
        "best_for": "Travelers with limited time who still want the signature safari experience.",
        "highlights": "Elephant-rich landscapes, crater views, and high-density wildlife sightings in the Serengeti."
    },
    {
        "file": "itinerary-12-day-honeymoon-tanzania-and-zanzibar.html",
        "title": "12 Day Honeymoon Tanzania & Zanzibar",
        "duration": "12 Days / 11 Nights",
        "type": "Romantic safari & island getaway",
        "destinations": "Tarangire, Ngorongoro, Serengeti & Zanzibar",
        "intro": "This romantic itinerary blends intimate safari moments with warm beach evenings and luxurious stays. It is crafted for couples wanting privacy, scenery, and unforgettable wildlife encounters.",
        "best_for": "Honeymooners and couples seeking an elegant, slow-paced East African escape.",
        "highlights": "Private game viewing, boutique stays, and a relaxing end on the island."
    },
    {
        "file": "itinerary-5-day-tanzania-safari-small-group-trip.html",
        "title": "5 Day Tanzania Safari Small Group Trip",
        "duration": "5 Days / 4 Nights",
        "type": "Small-group safari adventure",
        "destinations": "Tarangire, Lake Manyara, Ngorongoro & Serengeti",
        "intro": "A short, well-balanced safari for travelers who want to see the essentials without spending too much time on the road. It is lively, social, and rich in wildlife moments.",
        "best_for": "Solo travelers, couples, and small groups who want a compact safari.",
        "highlights": "A strong introduction to Tanzania's most iconic parks and wildlife habitats."
    },
    {
        "file": "itinerary-18-days-tanzania-safari-zanzibar-vacation-wildebeest-migration.html",
        "title": "18 Days Tanzania Safari & Zanzibar Vacation",
        "duration": "18 Days / 17 Nights",
        "type": "Extended wildlife & beach journey",
        "destinations": "Tarangire, Serengeti, Ngorongoro, Ruaha & Zanzibar",
        "intro": "An immersive long-form safari for travelers who want depth, flexibility, and space to absorb Tanzania's landscapes at a slower rhythm. The journey moves from classic parks to quieter regions before ending with island relaxation.",
        "best_for": "Families, photographers, and travelers looking for an all-encompassing Tanzania experience.",
        "highlights": "Migration tracking, varied ecosystems, and a calm beachfront finish."
    },
    {
        "file": "itinerary-9-days-safari-vacation-tanzania-wildebeest-migration.html",
        "title": "9 Days Safari Vacation Tanzania Wildebeest Migration",
        "duration": "9 Days / 8 Nights",
        "type": "Migration-focused safari",
        "destinations": "Tarangire, Serengeti, Ngorongoro & Central Tanzania",
        "intro": "This safari is shaped around the Great Migration, with carefully timed wildlife movements and plenty of opportunity to witness the drama of the plains. A strong choice for travelers who want action, scenery, and story-rich game drives.",
        "best_for": "Wildlife lovers and first-time safari guests chasing memorable migration sightings.",
        "highlights": "Herd movements, predator action, and classic east African scenery."
    },
    {
        "file": "itinerary-12-days-safari-and-beach-wildebeest-migration-near-the-mara-river-flight-north-serengeti-zanzibar.html",
        "title": "12 Days Safari & Beach Wildebeest Migration",
        "duration": "12 Days / 11 Nights",
        "type": "Migration safari with island finale",
        "destinations": "Serengeti, Mara River area, Ngorongoro & Zanzibar",
        "intro": "A well-paced blend of northern safari highlights and beachfront time. This trip is built for travelers who want a front-row seat to the migration while also enjoying a softer, restorative end to the holiday.",
        "best_for": "Travelers who want both remarkable wildlife and a laid-back island break.",
        "highlights": "Migration routes, river crossings, and a tropical coast at the end of the trip."
    },
    {
        "file": "itinerary-8-days-tanzania-holiday-a-very-complete-safari-wildebeest-migration.html",
        "title": "8 Days Tanzania Holiday: A Very Complete Safari",
        "duration": "8 Days / 7 Nights",
        "type": "Complete northern safari",
        "destinations": "Tarangire, Lake Manyara, Ngorongoro & Serengeti",
        "intro": "A balanced and efficient itinerary that covers the signature parks of northern Tanzania without feeling overly rushed. Every stop is chosen to give you more variety, more wildlife, and more memorable landscapes.",
        "best_for": "Travelers who want a dependable all-rounder safari with excellent value.",
        "highlights": "A strong mix of scenery, game drives, and classic safari stops."
    },
    {
        "file": "itinerary-16-days-long-safari-in-the-northern-circuit.html",
        "title": "16 Days Long Safari in the Northern Circuit",
        "duration": "16 Days / 15 Nights",
        "type": "Extended northern circuit safari",
        "destinations": "Tarangire, Lake Manyara, Serengeti, Ngorongoro & Ruaha",
        "intro": "An extended safari for travelers who want more time in the wild and more freedom to explore. This is a slower, richer journey with room for rest, discovery, and longer game drives.",
        "best_for": "Photographers and wildlife-focused travelers who want to settle into the rhythm of the parks.",
        "highlights": "Longer stays, varied landscapes, and a deeper safari experience."
    },
    {
        "file": "itinerary-5-day-tanzania-safari-extension-northern-parks.html",
        "title": "5 Day Tanzania Safari Extension Northern Parks",
        "duration": "5 Days / 4 Nights",
        "type": "Short northern parks extension",
        "destinations": "Tarangire, Lake Manyara, Ngorongoro & Serengeti",
        "intro": "A shorter extension designed for travelers who want a compact introduction to northern Tanzania before or after another trip. This page keeps the experience focused, elegant, and uncomplicated.",
        "best_for": "Short-stay visitors and those adding a safari break to a broader travel plan.",
        "highlights": "A taste of the classics with a polished, low-stress pace."
    },
]

styles = """
    .detail-hero { background-size: cover; background-position: center; padding: 8rem 0 5rem 0; color: var(--color-white); position: relative; }
    .detail-hero::before { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(37,37,37,0.35) 0%, rgba(37,37,37,0.8) 100%); z-index: 1; }
    .detail-hero .container { position: relative; z-index: 2; }
    .detail-meta { display: flex; gap: 1.1rem; flex-wrap: wrap; margin-top: 1rem; font-size: 0.95rem; font-weight: 700; }
    .detail-title { font-size: 2.6rem; font-weight: 900; line-height: 1.1; text-transform: uppercase; }
    .detail-intro-copy { max-width: 760px; font-size: 1rem; line-height: 1.75; margin-top: 1rem; color: rgba(255,255,255,0.92); }
    .detail-overview { margin-top: -2rem; position: relative; z-index: 3; margin-bottom: 2.5rem; }
    .overview-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }
    .overview-card { background: var(--color-white); border: 1px solid rgba(110,118,103,0.16); border-radius: 8px; padding: 1.2rem 1.3rem; box-shadow: var(--shadow-md); }
    .overview-card h3 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--logo-sage); margin-bottom: 0.45rem; }
    .overview-card p { font-size: 0.95rem; color: var(--color-charcoal); line-height: 1.7; }
    .detail-grid { display: grid; grid-template-columns: 1.8fr 1.2fr; gap: 3rem; padding: 0 0 4rem 0; }
    .itinerary-section h2 { font-size: 1.7rem; font-weight: 800; color: var(--logo-dark-green); margin-bottom: 1.25rem; border-bottom: 2px solid var(--color-sand); padding-bottom: 0.5rem; }
    .day-card { background: var(--color-sand-light); border: 1px solid rgba(110,118,103,0.14); border-radius: 8px; padding: 1.1rem 1.2rem; margin-bottom: 1rem; }
    .day-title { font-size: 1.04rem; font-weight: 800; color: var(--logo-dark-green); margin-bottom: 0.45rem; }
    .day-title span { color: var(--color-red); margin-right: 0.3rem; }
    .day-content { font-size: 0.95rem; color: var(--color-charcoal); opacity: 0.92; }
    .inc-exc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-top: 2rem; background-color: var(--color-sand-light); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(110,118,103,0.12); }
    .inc-exc-col h3 { font-size: 1rem; font-weight: 800; text-transform: uppercase; color: var(--logo-dark-green); margin-bottom: 0.8rem; }
    .inc-list li, .exc-list li { position: relative; padding-left: 1.2rem; font-size: 0.9rem; margin-bottom: 0.55rem; font-weight: 600; }
    .inc-list li::before { content: '✓'; position: absolute; left: 0; color: var(--logo-sage); font-weight: 900; }
    .exc-list li::before { content: '✗'; position: absolute; left: 0; color: var(--color-red); font-weight: 900; }
    .sidebar-card { background-color: var(--color-sand-light); border: 1px solid rgba(110,118,103,0.15); border-radius: 8px; padding: 1.4rem; position: sticky; top: 100px; box-shadow: var(--shadow-md); }
    .sidebar-price .price-amount { font-size: 1.9rem; font-weight: 900; color: var(--logo-dark-green); margin-bottom: 1rem; }
    .sidebar-btn { background-color: var(--color-red); color: var(--color-white); font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; padding: 1rem; border-radius: 4px; cursor: pointer; width: 100%; margin-top: 1rem; }
    .detail-notes { padding-bottom: 4rem; }
    .notes-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 1.25rem; }
    .notes-card { background: var(--color-white); border: 1px solid rgba(110,118,103,0.14); border-radius: 8px; padding: 1.35rem 1.4rem; box-shadow: var(--shadow-sm); }
    .notes-card h3 { font-size: 1.05rem; font-weight: 800; color: var(--logo-dark-green); margin-bottom: 0.7rem; }
    .notes-card p, .notes-card li { font-size: 0.95rem; color: var(--color-charcoal); line-height: 1.75; }
    .feature-list li { position: relative; padding-left: 1rem; margin-bottom: 0.45rem; }
    .feature-list li::before { content: '•'; color: var(--color-red); position: absolute; left: 0; }
    @media (max-width: 1023px) { .detail-grid, .notes-grid { grid-template-columns: 1fr; } .overview-grid { grid-template-columns: 1fr; } .sidebar-card { position: static; } }
"""

for item in pages:
    path = root / item['file']
    text = path.read_text(encoding='utf-8')
    if '</style>' not in text:
        continue
    if styles.strip() not in text:
        text = text.replace('</style>', styles + '\n  </style>', 1)
    start = text.find('<section class="detail-hero"')
    end = text.find('<footer class="main-footer">')
    if start == -1 or end == -1:
        continue
    hero_image = "images/serengeti_wildlife.png"
    if 'zanzibar' in item['file'].lower() or 'honeymoon' in item['file'].lower():
        hero_image = "images/zanzibar_beach.png"
    elif 'small-group' in item['file'].lower() or 'extension' in item['file'].lower() or '8-days' in item['file'].lower() or '7-days' in item['file'].lower():
        hero_image = "images/hero_safari.png"

    content = f'''<section class="detail-hero" style="background-image: url('{hero_image}');">
    <div class="container">
      <h1 class="detail-title">{item['title']}</h1>
      <div class="detail-meta">
        <span><strong>Duration:</strong> {item['duration']}</span>
        <span><strong>Type:</strong> {item['type']}</span>
        <span><strong>Destinations:</strong> {item['destinations']}</span>
      </div>
      <p class="detail-intro-copy">{item['intro']}</p>
    </div>
  </section>

  <section class="detail-overview container">
    <div class="overview-grid">
      <div class="overview-card">
        <h3>Best for</h3>
        <p>{item['best_for']}</p>
      </div>
      <div class="overview-card">
        <h3>Highlights</h3>
        <p>{item['highlights']}</p>
      </div>
      <div class="overview-card">
        <h3>Trip pace</h3>
        <p>Comfortable and well-paced, with a balance of game drives, rest, and meaningful cultural or scenic moments.</p>
      </div>
    </div>
  </section>

  <section class="container">
    <div class="detail-grid">
      <div>
        <div class="itinerary-section">
          <h2>Day-by-Day Journey</h2>
          <div class="day-card">
            <div class="day-title"><span>Day 1:</span> Arrival &amp; Welcome in Arusha</div>
            <div class="day-content">Arrive in Tanzania and settle into a comfortable start before the safari begins. Depending on your arrival time, enjoy a relaxed evening and a short briefing with your guide.</div>
          </div>
          <div class="day-card">
            <div class="day-title"><span>Day 2:</span> Wildlife-rich transfer into the parks</div>
            <div class="day-content">Travel into the reserve landscape and settle into your first full game drive. Expect open grasslands, classic acacia scenery, and strong chances of seeing elephants, giraffes, and predators.</div>
          </div>
          <div class="day-card">
            <div class="day-title"><span>Day 3:</span> Full-day exploration</div>
            <div class="day-content">Spend the day moving with the rhythms of the park, following fresh tracks and wildlife activity. This is the core of the safari experience, with plenty of time for photography and observation.</div>
          </div>
          <div class="day-card">
            <div class="day-title"><span>Day 4:</span> Scenic change of scenery</div>
            <div class="day-content">Continue to another ecological zone and enjoy a new vista of plains, wetlands, or volcanic landscapes. The changing habitats bring new species and more variety.</div>
          </div>
          <div class="day-card">
            <div class="day-title"><span>Day 5:</span> Signature safari highlights</div>
            <div class="day-content">Dedicate the day to the most rewarding wildlife areas of the route. Expect high-impact sightings and plenty of opportunities for memorable moments in the field.</div>
          </div>
          <div class="day-card">
            <div class="day-title"><span>Day 6:</span> Slow and scenic travel</div>
            <div class="day-content">Enjoy a more reflective day with comfortable progress between camps or lodges. This allows time for rest, bush breakfasts, and a deeper connection to the landscape.</div>
          </div>
          <div class="day-card">
            <div class="day-title"><span>Day 7:</span> Final safari moments</div>
            <div class="day-content">Use the final day to revisit favorite areas or search for that last special sighting before your onward transfer or island finale.</div>
          </div>
        </div>

        <div class="inc-exc-grid">
          <div class="inc-exc-col">
            <h3>What's Included</h3>
            <ul class="inc-list">
              <li>Airport transfers and private transport throughout the trip</li>
              <li>Accommodation in selected safari lodges or camps</li>
              <li>Park entry fees, guiding, and daily meals as listed</li>
              <li>Support from our Tanzania travel team before and during the journey</li>
            </ul>
          </div>
          <div class="inc-exc-col">
            <h3>What's Excluded</h3>
            <ul class="exc-list">
              <li>International flights and visa costs</li>
              <li>Travel insurance and personal expenses</li>
              <li>Optional activities, drinks, and gratuities</li>
            </ul>
          </div>
        </div>
      </div>

      <aside>
        <div class="sidebar-card">
          <div class="sidebar-price">
            <h4>Tour Price</h4>
            <div class="price-amount">From $2,850 <small>/ person</small></div>
          </div>
          <form action="contact.html" method="GET">
            <input type="hidden" name="itinerary" value="{item['title']}">
            <div>
              <label class="sidebar-label" for="name">Full Name</label>
              <input type="text" id="name" class="sidebar-input" required>
            </div>
            <div>
              <label class="sidebar-label" for="email">E-mail Address</label>
              <input type="email" id="email" class="sidebar-input" required>
            </div>
            <div>
              <label class="sidebar-label" for="date">Travel Month</label>
              <input type="month" id="date" class="sidebar-input" required>
            </div>
            <button type="submit" class="sidebar-btn">Request Proposal</button>
          </form>
        </div>
      </aside>
    </div>
  </section>

  <section class="container detail-notes">
    <div class="notes-grid">
      <div class="notes-card">
        <h3>Why this trip stands out</h3>
        <ul class="feature-list">
          <li>Strong focus on wildlife and quality guiding</li>
          <li>Comfortable pacing with time for rest and photography</li>
          <li>Thoughtfully selected stays and reliable logistics</li>
        </ul>
      </div>
      <div class="notes-card">
        <h3>Travel notes</h3>
        <p>Best suited to travelers who want a polished safari experience with memorable scenery, easy planning, and support from a specialist team from start to finish.</p>
      </div>
    </div>
  </section>

'''
    text = text[:start] + content + text[end:]
    path.write_text(text, encoding='utf-8')

print('updated')
