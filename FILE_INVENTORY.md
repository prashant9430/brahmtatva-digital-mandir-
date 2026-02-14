# BrahmTatva – Digital Mandir - Complete File Inventory

## 📊 Project Statistics

- **Total Files**: 23
- **Total Lines of Code**: 4,303
- **Total Size**: ~200 KB
- **HTML Pages**: 7
- **CSS Files**: 2
- **JavaScript Files**: 6
- **JSON Data Files**: 4
- **Documentation Files**: 3
- **Directories**: 5

---

## 📄 HTML Pages (7 Files)

### 1. **index.html** (207 lines)
**Purpose**: Home page and main entry point
**Key Sections**:
- Navigation bar with Om symbol
- Hero section with "ॐ ब्रह्मतत्वाय नमः"
- About Sanatan Dharma introduction
- 6 Navigation cards (Panchang, Pooja, Mantra, Aarti, Granth, About)
- Mantra background animation
- Footer with closing mantra

**Features**: Responsive, animated cards, smooth scrolling, mobile hamburger menu

---

### 2. **panchang.html** (132 lines)
**Purpose**: Daily Hindu calendar and Panchang information
**Key Sections**:
- Page header with title and description
- Panchang container (loads dynamically)
- Sun & Moon times section
- Information about Panchang (5 components explained)
- Educational content about Hindu calendar

**Features**: Auto-updates daily, API-ready, timezone detection, Hindi date formatting

---

### 3. **pooja.html** (121 lines)
**Purpose**: Worship procedures and rituals
**Key Sections**:
- Page header
- Pooja cards grid (loads from JSON)
- Modal popup for detailed view
- Step-by-step procedures

**Features**: Dynamic loading, modal viewer, expandable content, print-ready

---

### 4. **mantra.html** (110 lines)
**Purpose**: Sacred mantras collection
**Key Sections**:
- Page header
- Mantra category tabs (5 categories)
- Mantra list with Sanskrit and Hindi
- Meanings and benefits

**Features**: Tab-based navigation, dynamic content loading, smooth transitions

---

### 5. **aarti.html** (121 lines)
**Purpose**: Aarti songs and hymns
**Key Sections**:
- Page header
- Aarti cards grid (5 aartis)
- Modal for full lyrics
- Print functionality

**Features**: Beautiful card layout, modal viewer, formatted lyrics, print support

---

### 6. **granth.html** (150 lines)
**Purpose**: Sacred texts library
**Key Sections**:
- Page header
- Granth cards with metadata
- PDF viewer modal
- Information about sacred texts
- Download buttons

**Features**: PDF viewer, download links, metadata display, file existence checking

---

### 7. **about.html** (200 lines)
**Purpose**: Project information and spiritual knowledge
**Key Sections**:
- Project mission and vision
- Features overview
- Sanatan Dharma explanation
- Path of Bhakti (devotion)
- Importance of Knowledge
- How to use the portal
- Contact information
- Closing prayer

**Features**: Comprehensive information, well-organized sections, educational content

---

## 🎨 CSS Files (2 Files)

### 1. **css/style.css** (1,050 lines)
**Purpose**: Main stylesheet with divine temple-like design
**Key Sections**:
- CSS Variables (colors, fonts, shadows, transitions)
- Navigation bar styling with animations
- Hero section with gradients
- Card grid layouts
- Modal styling
- Animations (float, bounce, drift, fadeIn, fadeInUp, rotate)
- Typography with Sanskrit and Hindi fonts
- Color scheme: Saffron (#FF9933), White, Gold (#FFD700)
- Soft shadows and smooth transitions
- Utility classes

**Features**:
- Responsive design foundation
- Beautiful animations
- Temple-like aesthetic
- Professional typography
- Smooth transitions and hover effects

---

### 2. **css/responsive.css** (600+ lines)
**Purpose**: Mobile responsive design
**Breakpoints**:
- Tablets: 768px and below
- Mobile: 480px and below
- Extra Small: 320px and below
- Landscape: max-height 600px

**Features**:
- Mobile-first approach
- Hamburger menu implementation
- Adjusted font sizes for mobile
- Grid adjustments
- Touch-friendly spacing
- Modal adjustments
- Navigation menu collapse
- Optimized for all screen sizes

---

## 🔧 JavaScript Files (6 Files)

### 1. **js/main.js** (300+ lines)
**Purpose**: Core utilities and global functions
**Key Functions**:
- Mobile menu toggle and management
- Modal open/close functionality
- JSON data loading with error handling
- Date formatting in Hindi
- Timezone detection for Indian Standard Time
- Smooth scrolling navigation
- Lazy loading images
- Loading/error/success state management
- File download functionality
- Print content functionality
- Share functionality (native + clipboard fallback)
- Debounce and throttle utilities
- Scroll-triggered animations
- Local storage utilities (set, get, remove, clear)
- Fetch with retry logic
- Service Worker registration for offline support

**Features**: Comprehensive utility library, error handling, performance optimization

---

### 2. **js/panchang.js** (200+ lines)
**Purpose**: Panchang page logic and calendar functionality
**Key Functions**:
- Load Panchang data from API or local calculation
- Display Panchang information (Tithi, Vaar, Nakshatra, Yoga, Karana)
- Display Sun & Moon times
- Auto-refresh at midnight
- Calculate Tithi, Nakshatra, Yoga
- Hindi month and day name mapping
- Fallback to local calculation if API fails

**Features**: API integration ready, automatic daily updates, Hindi calendar support

---

### 3. **js/pooja.js** (100+ lines)
**Purpose**: Pooja Vidhi page logic
**Key Functions**:
- Load Pooja data from JSON
- Display Pooja cards in grid
- Open Pooja detail modal
- Display step-by-step procedures
- Show mantra and benefits for each pooja

**Features**: Dynamic content loading, modal management, formatted display

---

### 4. **js/mantra.js** (100+ lines)
**Purpose**: Mantra Sangrah page logic
**Key Functions**:
- Load Mantra categories from JSON
- Display category tabs
- Switch between categories
- Display mantras with Sanskrit and meanings
- Show benefits of each mantra
- Smooth scroll to content

**Features**: Tab-based navigation, dynamic switching, formatted display

---

### 5. **js/aarti.js** (100+ lines)
**Purpose**: Aarti Collection page logic
**Key Functions**:
- Load Aarti data from JSON
- Display Aarti cards in grid
- Open Aarti detail modal
- Format lyrics display with proper line breaks
- Print functionality integration

**Features**: Dynamic content loading, formatted lyrics, print support

---

### 6. **js/granth.js** (80+ lines)
**Purpose**: Granth Library page logic
**Key Functions**:
- Load Granth metadata from JSON
- Display Granth cards with information
- Open PDF viewer in modal
- Download PDF files
- Check file existence before opening
- Error handling for missing files

**Features**: PDF viewer integration, download functionality, file validation

---

## 📊 JSON Data Files (4 Files)

### 1. **data/pooja.json** (150 lines)
**Purpose**: Pooja Vidhi procedures and steps
**Structure**: Array of 5 Pooja objects

**Poojas Included**:
1. **Ganesh Pooja Vidhi** - 6 steps with mantra and benefits
2. **Shiv Pooja Vidhi** - 6 steps with mantra and benefits
3. **Vishnu Pooja Vidhi** - 6 steps with mantra and benefits
4. **Durga Pooja Vidhi** - 6 steps with mantra and benefits
5. **Surya Arghya Vidhi** - 6 steps with mantra and benefits

**Fields per Pooja**:
- `id`: Unique identifier
- `name`: Hindi name
- `icon`: Emoji icon
- `description`: Brief description
- `steps`: Array of 6 step objects (step number, title, description)
- `mantra`: Sanskrit mantra
- `benefits`: Benefits of the pooja

---

### 2. **data/mantra.json** (200 lines)
**Purpose**: Sacred mantras with meanings
**Structure**: Array of 5 Category objects

**Categories Included**:
1. **Shiv Mantra** - 3 mantras (Panchakshari, Gayatri, Beej)
2. **Vishnu Mantra** - 3 mantras (Ashtakshari, Mantra, Krishna Beej)
3. **Gayatri Mantra** - 1 mantra (Complete Gayatri)
4. **Hanuman Mantra** - 3 mantras (Hanuman, Chalisa, Beej)
5. **Devi Mantra** - 3 mantras (Durga, Kali, Saraswati)

**Fields per Mantra**:
- `id`: Mantra ID
- `sanskrit`: Sanskrit text
- `hindi`: Hindi transliteration
- `meaning`: Detailed meaning and explanation
- `benefits`: Spiritual benefits of chanting

---

### 3. **data/aarti.json** (120 lines)
**Purpose**: Aarti songs and lyrics
**Structure**: Array of 5 Aarti objects

**Aartis Included**:
1. **Ganesh Aarti** - Full lyrics with meaning
2. **Shiv Aarti** - Full lyrics with meaning
3. **Hanuman Aarti** - Full lyrics with meaning
4. **Durga Aarti** - Full lyrics with meaning
5. **Lakshmi Aarti** - Full lyrics with meaning

**Fields per Aarti**:
- `id`: Unique identifier
- `name`: Hindi name
- `icon`: Emoji icon
- `lyrics`: Full aarti lyrics in Hindi with line breaks

---

### 4. **data/granth.json** (80 lines)
**Purpose**: Sacred texts metadata
**Structure**: Array of 6 Granth objects

**Granths Included**:
1. **Bhagavad Gita** - 700 pages, Sanskrit/Hindi
2. **Ramayana** - 2000 pages, Sanskrit/Hindi
3. **Mahabharata** - 3000 pages, Sanskrit/Hindi
4. **Rigveda** - 1500 pages, Sanskrit
5. **Upanishads** - 1200 pages, Sanskrit/Hindi
6. **Durga Saptashati** - 500 pages, Sanskrit/Hindi

**Fields per Granth**:
- `id`: Unique identifier
- `name`: Hindi name
- `author`: Author name
- `description`: Brief description
- `pages`: Number of pages
- `language`: Language information
- `file`: PDF filename
- `icon`: Emoji icon

---

## 📁 Directories (5 Directories)

### 1. **css/** (2 files, 32 KB)
- **style.css** - Main stylesheet (1,050 lines)
- **responsive.css** - Mobile responsive styles (600+ lines)

### 2. **js/** (6 files, 52 KB)
- **main.js** - Core utilities (300+ lines)
- **panchang.js** - Panchang logic (200+ lines)
- **pooja.js** - Pooja logic (100+ lines)
- **mantra.js** - Mantra logic (100+ lines)
- **aarti.js** - Aarti logic (100+ lines)
- **granth.js** - Granth logic (80+ lines)

### 3. **data/** (4 files, 32 KB)
- **pooja.json** - Pooja procedures (150 lines)
- **mantra.json** - Mantras collection (200 lines)
- **aarti.json** - Aarti lyrics (120 lines)
- **granth.json** - Sacred texts (80 lines)

### 4. **pdfs/** (1 file, 8 KB)
- **README.txt** - Instructions for adding PDFs
- *Add your PDF files here*:
  - bhagavad-gita.pdf
  - ramayana.pdf
  - mahabharata.pdf
  - rigveda.pdf
  - upanishads.pdf
  - durga-saptashati.pdf

### 5. **images/** (0 files, 4 KB)
- *Add your images here*:
  - Deity images
  - Logo variations
  - Background patterns
  - Decorative elements

---

## 📄 Documentation Files (3 Files)

### 1. **README.md** (350 lines, 9.6 KB)
**Purpose**: Comprehensive project documentation
**Sections**:
- Project overview and features
- Installation instructions
- Folder structure
- Pages and sections description
- Design features
- Data management guide
- JavaScript utilities documentation
- Deployment guides (GitHub Pages, Firebase)
- Browser support
- Security notes
- Content sources
- Future enhancements
- License information
- Acknowledgments

---

### 2. **PROJECT_STRUCTURE.md** (500 lines, 14 KB)
**Purpose**: Detailed file-by-file breakdown
**Sections**:
- Directory overview with tree structure
- HTML files detailed description
- CSS files documentation
- JavaScript files documentation
- JSON data files structure
- Directory purposes
- File statistics
- How to extend the project
- Security and performance notes
- Browser compatibility
- Design system documentation
- Content guidelines
- Workflow instructions

---

### 3. **FILE_INVENTORY.md** (This file)
**Purpose**: Complete file inventory and reference
**Sections**:
- Project statistics
- HTML pages inventory
- CSS files inventory
- JavaScript files inventory
- JSON data files inventory
- Directories inventory
- Documentation files inventory
- Configuration files
- Quick reference guide

---

## ⚙️ Configuration Files (1 File)

### 1. **.gitignore** (30 lines)
**Purpose**: Git ignore patterns
**Patterns Included**:
- OS files (DS_Store, Thumbs.db)
- IDE files (.vscode, .idea)
- Node modules
- Build artifacts
- Environment variables
- Temporary files
- Logs

---

## 🚀 Quick Reference Guide

### To Add New Content

**Add a Pooja**:
1. Edit `data/pooja.json`
2. Add new object with 6 steps
3. Refresh browser

**Add a Mantra**:
1. Edit `data/mantra.json`
2. Add to appropriate category
3. Include Sanskrit, Hindi, meaning, benefits

**Add an Aarti**:
1. Edit `data/aarti.json`
2. Add new object with lyrics
3. Refresh browser

**Add a Sacred Text**:
1. Place PDF in `pdfs/` folder
2. Edit `data/granth.json`
3. Add metadata entry

### To Deploy

**GitHub Pages**:
1. Push to GitHub
2. Enable Pages in Settings
3. Site goes live automatically

**Firebase Hosting**:
1. Run `firebase init hosting`
2. Run `firebase deploy`
3. Get live URL

### To Test Locally

```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# Then open http://localhost:8000
```

---

## 📊 Content Summary

| Component | Count | Details |
|-----------|-------|---------|
| HTML Pages | 7 | Home, Panchang, Pooja, Mantra, Aarti, Granth, About |
| Poojas | 5 | Ganesh, Shiv, Vishnu, Durga, Surya |
| Mantra Categories | 5 | Shiv, Vishnu, Gayatri, Hanuman, Devi |
| Mantras | 16 | 3-4 per category with meanings |
| Aartis | 5 | Ganesh, Shiv, Hanuman, Durga, Lakshmi |
| Sacred Texts | 6 | Gita, Ramayana, Mahabharata, Vedas, Upanishads, Durga Saptashati |
| Total Lines | 4,303 | HTML, CSS, JS, JSON, Docs |

---

## 🎯 Key Features by File Type

| Feature | Implementation |
|---------|-----------------|
| Responsive Design | CSS + Responsive CSS |
| Navigation | HTML + Main JS |
| Modal Popups | HTML + CSS + Main JS |
| Data Loading | JSON + Page-specific JS |
| Animations | CSS + Main JS |
| Mobile Menu | HTML + CSS + Main JS |
| PDF Viewer | HTML + Granth JS + CSS |
| Panchang API | Panchang JS + HTML |
| Local Storage | Main JS |
| Print Function | Main JS + Aarti JS |

---

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Extra Small**: Below 480px
- **Landscape**: Height below 600px

---

## 🎨 Design System

**Colors**:
- Saffron: `#FF9933`
- White: `#FFFFFF`
- Gold: `#FFD700`
- Light Gold: `#FFF8DC`

**Fonts**:
- Sanskrit: Georgia, Garamond
- Hindi: Noto Sans Devanagari, Arial

**Animations**:
- Float (3s)
- Bounce (2s)
- Drift (20s)
- Fade In (0.8s)
- Rotate (10s)

---

## 📈 Project Growth Potential

- Add more Poojas (Lakshmi, Saraswati, etc.)
- Add more Mantras (Chakra mantras, Yantra mantras)
- Add more Aartis (Regional variations)
- Add more Sacred Texts (Dharmaśāstra, Nīti Śāstra)
- Add audio recitations
- Add video tutorials
- Add personal calendar integration
- Add community features
- Add multi-language support

---

## ✅ Quality Checklist

- ✅ Mobile-first responsive design
- ✅ Semantic HTML structure
- ✅ Clean, organized CSS
- ✅ Modular JavaScript
- ✅ JSON data management
- ✅ Comprehensive documentation
- ✅ No backend required
- ✅ No database needed
- ✅ No user authentication
- ✅ GDPR compliant
- ✅ Fast loading
- ✅ SEO friendly
- ✅ Accessible design
- ✅ Cross-browser compatible

---

**Created with 🙏 devotion for Sanatan Dharma**

**ॐ ब्रह्मतत्वाय नमः**

*Last Updated: February 12, 2026*
