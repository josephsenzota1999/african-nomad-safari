from pathlib import Path
import re

root = Path(__file__).resolve().parent
files = [root / 'index.html', root / 'about.html', root / 'contact.html', root / 'destinations.html', root / 'tours.html', root / 'tour_detail.html']
files += sorted((root / 'day-trip').glob('*.html'))
files += sorted([p for p in root.glob('itinerary-*.html') if p.is_file()])

for path in files:
    if not path.exists():
        continue
    text = path.read_text(encoding='utf-8')
    if '<nav class="nav-menu" id="nav-menu">' not in text:
        continue
    prefix = '' if path.parent == root else '../'
    new_nav = f'''<nav class="nav-menu" id="nav-menu">
        <div class="nav-item">
          <a href="{prefix}tours.html" class="nav-link">Safari Tours</a>
        </div>
        <div class="nav-item">
          <a href="{prefix}destinations.html" class="nav-link">Destinations</a>
        </div>
        <div class="nav-item">
          <a href="{prefix}blog.html" class="nav-link">Blog</a>
        </div>
        <div class="nav-item">
          <a href="{prefix}about.html" class="nav-link">About Us</a>
        </div>
        <div class="nav-item">
          <a href="{prefix}contact.html" class="nav-link">Contact Us</a>
        </div>
        <div class="nav-cta">
          <a href="{prefix}contact.html" class="btn btn-red">Enquire Now</a>
        </div>
      </nav>'''
    pattern = re.compile(r'<nav class="nav-menu" id="nav-menu">.*?</nav>', re.S)
    new_text, count = pattern.subn(new_nav, text, count=1)
    if count:
        path.write_text(new_text, encoding='utf-8')
        print(f'updated {path.relative_to(root)}')
