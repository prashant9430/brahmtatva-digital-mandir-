# BrahmTatva – Digital Mandir - Complete Project Structure

## 📁 Directory Overview

```
brahmtatva-digital-mandir/
├── 📄 index.html                    # Home page (Main entry point)
├── 📄 panchang.html                 # Daily Panchang page
├── 📄 pooja.html                    # Pooja Vidhi page
├── 📄 mantra.html                   # Mantra Sangrah page
├── 📄 aarti.html                    # Aarti Collection page
├── 📄 granth.html                   # Granth Library page
├── 📄 about.html                    # About page
│
├── 📁 css/                          # Stylesheets
│   ├── style.css                    # Main divine design (1000+ lines)
│   └── responsive.css               # Mobile responsive styles (600+ lines)
│
├── 📁 js/                           # JavaScript files
│   ├── main.js                      # Core utilities & functions
│   ├── panchang.js                  # Panchang page logic
│   ├── pooja.js                     # Pooja Vidhi logic
│   ├── mantra.js                    # Mantra Sangrah logic
│   ├── aarti.js                     # Aarti Collection logic
│   └── granth.js                    # Granth Library logic
│
├── 📁 data/                         # JSON data files
│   ├── pooja.json                   # 5 Pooja Vidhi with steps
│   ├── mantra.json                  # 5 Mantra categories with details
│   ├── aarti.json                   # 5 Aarti lyrics
│   └── granth.json                  # 6 Sacred texts metadata
│
├── 📁 pdfs/                         # PDF files (add your PDFs here)
│   ├── bhagavad-gita.pdf
│   ├── ramayana.pdf
│   ├── mahabharata.pdf
│   ├── rigveda.pdf
│   ├── upanishads.pdf
│   └── durga-saptashati.pdf
│
├── 📁 images/                       # Images and icons (add here)
│
├── 📄 README.md                     # Project documentation
├── 📄 PROJECT_STRUCTURE.md          # This file
└── 📄 .gitignore                    # Git ignore file
```

---

## 📄 HTML Files (7 Pages)

### 1. **index.html** - Home Page
- **Purpose**: Main landing page with navigation
- **Sections**:
  - Navigation bar with Om symbol
  - Hero section with "ॐ ब्रह्मतत्वाय नमः"
  - About Sanatan Dharma introduction
  - 6 Navigation cards (grid layout)
  - Footer with mantra
- **Features**: Responsive, animated cards, smooth scrolling
- **Size**: ~200 lines

### 2. **panchang.html** - Daily Panchang
- **Purpose**: Display daily Hindu calendar
- **Sections**:
  - Page header
  - Panchang container (Tithi, Vaar, Nakshatra, Yoga, Karana)
  - Sun & Moon times section
  - Information about Panchang
- **Features**: Auto-updates daily, API integration ready
- **Size**: ~130 lines

### 3. **pooja.html** - Pooja Vidhi
- **Purpose**: Display worship procedures
- **Sections**:
  - Page header
  - Pooja cards grid
  - Modal for detailed view
- **Features**: Dynamic loading from JSON, modal popup
- **Size**: ~120 lines

### 4. **mantra.html** - Mantra Sangrah
- **Purpose**: Display sacred mantras
- **Sections**:
  - Page header
  - Mantra category tabs
  - Mantra list with Sanskrit and Hindi
- **Features**: Tab-based category switching, dynamic content
- **Size**: ~110 lines

### 5. **aarti.html** - Aarti Collection
- **Purpose**: Display aarti songs and lyrics
- **Sections**:
  - Page header
  - Aarti cards grid
  - Modal for full lyrics
- **Features**: Beautiful card layout, modal viewer
- **Size**: ~120 lines

### 6. **granth.html** - Granth Library
- **Purpose**: Display sacred texts
- **Sections**:
  - Page header
  - Granth cards with metadata
  - PDF viewer modal
  - Information about sacred texts
- **Features**: PDF viewer, download buttons, metadata display
- **Size**: ~150 lines

### 7. **about.html** - About Page
- **Purpose**: Information about the project
- **Sections**:
  - Project mission
  - Features overview
  - Sanatan Dharma explanation
  - Path of Bhakti
  - Importance of Knowledge
  - How to use the portal
  - Contact information
- **Features**: Comprehensive information, well-organized
- **Size**: ~200 lines

---

## 🎨 CSS Files (2 Files)

### 1. **css/style.css** - Main Stylesheet
- **Size**: 1000+ lines
- **Features**:
  - CSS variables for colors and fonts
  - Navigation bar styling with animations
  - Hero section with gradient backgrounds
  - Card grid layouts
  - Modal styling
  - Form elements
  - Animations (float, bounce, drift, fadeIn, fadeInUp, rotate)
  - Typography with Sanskrit and Hindi fonts
  - Color scheme: Saffron, White, Gold
  - Soft shadows and smooth transitions

**Key Sections**:
- Root Variables
- Navigation Bar
- Mantra Background Animation
- Hero Section
- Container & Main Content
- About Intro Section
- Cards Grid
- Page Sections
- Panchang Section
- Pooja Vidhi Section
- Mantra Section
- Aarti Section
- Granth Section
- PDF Viewer Modal
- About Page
- Footer
- Utility Classes

### 2. **css/responsive.css** - Responsive Design
- **Size**: 600+ lines
- **Breakpoints**:
  - Tablets: 768px and below
  - Mobile: 480px and below
  - Extra Small: 320px and below
  - Landscape: max-height 600px
- **Features**:
  - Mobile-first approach
  - Hamburger menu implementation
  - Adjusted font sizes
  - Grid adjustments
  - Touch-friendly spacing
  - Modal adjustments
  - Navigation menu collapse

---

## 🔧 JavaScript Files (6 Files)

### 1. **js/main.js** - Core Utilities
- **Size**: 300+ lines
- **Functions**:
  - Mobile menu toggle
  - Modal open/close
  - JSON data loading
  - Date formatting (Hindi)
  - Timezone detection
  - Smooth scrolling
  - Lazy loading images
  - Loading/error/success states
  - File download
  - Print functionality
  - Share functionality
  - Debounce & throttle
  - Scroll animations
  - Local storage utilities
  - Fetch with retry
  - Service Worker registration

### 2. **js/panchang.js** - Panchang Logic
- **Size**: 200+ lines
- **Functions**:
  - Load Panchang data from API or local calculation
  - Display Panchang information
  - Display Sun & Moon times
  - Auto-refresh at midnight
  - Tithi, Nakshatra, Yoga calculations
  - Hindi month and day names

### 3. **js/pooja.js** - Pooja Vidhi Logic
- **Size**: 100+ lines
- **Functions**:
  - Load Pooja data from JSON
  - Display Pooja cards
  - Open Pooja detail modal
  - Display step-by-step procedures
  - Show mantra and benefits

### 4. **js/mantra.js** - Mantra Logic
- **Size**: 100+ lines
- **Functions**:
  - Load Mantra categories from JSON
  - Display category tabs
  - Switch between categories
  - Display mantras with meanings
  - Smooth scroll to content

### 5. **js/aarti.js** - Aarti Logic
- **Size**: 100+ lines
- **Functions**:
  - Load Aarti data from JSON
  - Display Aarti cards
  - Open Aarti detail modal
  - Format lyrics display
  - Print functionality

### 6. **js/granth.js** - Granth Logic
- **Size**: 80+ lines
- **Functions**:
  - Load Granth metadata from JSON
  - Display Granth cards
  - Open PDF viewer
  - Download functionality
  - File existence checking

---

## 📊 JSON Data Files (4 Files)

### 1. **data/pooja.json**
- **Structure**: Array of 5 Pooja objects
- **Fields per Pooja**:
  - `id`: Unique identifier
  - `name`: Hindi name
  - `icon`: Emoji icon
  - `description`: Brief description
  - `steps`: Array of step objects (6 steps each)
    - `step`: Step number
    - `title`: Hindi title
    - `description`: Detailed description
  - `mantra`: Sanskrit mantra
  - `benefits`: Benefits of the pooja
- **Poojas Included**:
  1. Ganesh Pooja Vidhi
  2. Shiv Pooja Vidhi
  3. Vishnu Pooja Vidhi
  4. Durga Pooja Vidhi
  5. Surya Arghya Vidhi

### 2. **data/mantra.json**
- **Structure**: Array of 5 Category objects
- **Fields per Category**:
  - `id`: Unique identifier
  - `name`: Hindi category name
  - `mantras`: Array of mantra objects
    - `id`: Mantra ID
    - `sanskrit`: Sanskrit text
    - `hindi`: Hindi transliteration
    - `meaning`: Detailed meaning
    - `benefits`: Benefits of chanting
- **Categories Included**:
  1. Shiv Mantra (3 mantras)
  2. Vishnu Mantra (3 mantras)
  3. Gayatri Mantra (1 mantra)
  4. Hanuman Mantra (3 mantras)
  5. Devi Mantra (3 mantras)

### 3. **data/aarti.json**
- **Structure**: Array of 5 Aarti objects
- **Fields per Aarti**:
  - `id`: Unique identifier
  - `name`: Hindi name
  - `icon`: Emoji icon
  - `lyrics`: Full aarti lyrics in Hindi
- **Aartis Included**:
  1. Ganesh Aarti
  2. Shiv Aarti
  3. Hanuman Aarti
  4. Durga Aarti
  5. Lakshmi Aarti

### 4. **data/granth.json**
- **Structure**: Array of 6 Granth objects
- **Fields per Granth**:
  - `id`: Unique identifier
  - `name`: Hindi name
  - `author`: Author name
  - `description`: Brief description
  - `pages`: Number of pages
  - `language`: Language information
  - `file`: PDF filename
  - `icon`: Emoji icon
- **Granths Included**:
  1. Bhagavad Gita
  2. Ramayana
  3. Mahabharata
  4. Rigveda
  5. Upanishads
  6. Durga Saptashati

---

## 📁 Directories

### 1. **pdfs/** - PDF Storage
- **Purpose**: Store sacred text PDFs
- **Files to Add**:
  - bhagavad-gita.pdf
  - ramayana.pdf
  - mahabharata.pdf
  - rigveda.pdf
  - upanishads.pdf
  - durga-saptashati.pdf
- **Note**: PDFs are referenced in granth.json

### 2. **images/** - Image Storage
- **Purpose**: Store images and icons
- **Potential Files**:
  - Deity images
  - Logo variations
  - Background patterns
  - Decorative elements

---

## 📄 Documentation Files

### 1. **README.md**
- Comprehensive project documentation
- Installation instructions
- Feature overview
- Deployment guides
- Content management instructions
- Browser support information

### 2. **PROJECT_STRUCTURE.md** (This File)
- Detailed file-by-file breakdown
- Directory structure
- File purposes and contents
- Line counts and features

### 3. **.gitignore**
- Git ignore patterns
- OS files (DS_Store, Thumbs.db)
- IDE files (.vscode, .idea)
- Build artifacts
- Logs and temporary files

---

## 🎯 Key Features by File

| Feature | Files Involved |
|---------|-----------------|
| Responsive Design | responsive.css, all HTML files |
| Navigation | main.js, style.css, all HTML files |
| Modal Popups | main.js, style.css, pooja.html, aarti.html, granth.html |
| JSON Loading | main.js, pooja.js, mantra.js, aarti.js, granth.js |
| Animations | style.css, main.js |
| Mobile Menu | main.js, responsive.css, all HTML files |
| PDF Viewer | granth.js, granth.html, style.css |
| Panchang API | panchang.js, panchang.html |
| Local Storage | main.js |
| Print Function | main.js, aarti.js |

---

## 📊 File Statistics

| Category | Count | Lines |
|----------|-------|-------|
| HTML Files | 7 | ~1,000 |
| CSS Files | 2 | ~1,600 |
| JavaScript Files | 6 | ~1,200 |
| JSON Files | 4 | ~500 |
| Documentation | 3 | ~800 |
| **Total** | **22** | **~5,100** |

---

## 🚀 How to Extend

### Add a New Pooja
1. Edit `data/pooja.json`
2. Add new object to `poojas` array
3. Include all required fields

### Add a New Mantra Category
1. Edit `data/mantra.json`
2. Add new object to `categories` array
3. Include mantras with Sanskrit and meanings

### Add a New Aarti
1. Edit `data/aarti.json`
2. Add new object to `aartis` array
3. Include full lyrics

### Add a New Sacred Text
1. Place PDF in `pdfs/` folder
2. Edit `data/granth.json`
3. Add metadata entry

### Add a New Page
1. Create new HTML file
2. Copy navigation from existing page
3. Create new JS file for logic
4. Add CSS styles to style.css
5. Add responsive styles to responsive.css

---

## 🔒 Security & Performance

- **No Backend**: Static site, no server-side vulnerabilities
- **No Database**: All data in JSON files
- **No User Data**: No tracking or data collection
- **Fast Loading**: Optimized CSS and JavaScript
- **Lazy Loading**: Images loaded on demand
- **Caching**: Service Worker ready for offline support
- **GDPR Compliant**: No personal data collection

---

## 📱 Browser Compatibility

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Tablets (iPad, Android tablets)

---

## 🎨 Design System

### Colors
- Saffron: `#FF9933`
- White: `#FFFFFF`
- Gold: `#FFD700`
- Light Gold: `#FFF8DC`

### Typography
- Sanskrit: Georgia, Garamond
- Hindi: Noto Sans Devanagari, Arial

### Spacing
- Base unit: 1rem (16px)
- Padding: 1rem, 1.5rem, 2rem, 3rem
- Margins: 0.5rem to 3rem

### Shadows
- Soft: `0 4px 15px rgba(0, 0, 0, 0.1)`
- Deep: `0 8px 25px rgba(0, 0, 0, 0.15)`

---

## 📝 Content Guidelines

### Pooja Steps
- Use 6 steps per pooja
- Include Sanskrit mantra
- Provide clear Hindi descriptions
- List benefits at the end

### Mantras
- Include Sanskrit text
- Provide Hindi transliteration
- Add detailed meaning
- List spiritual benefits

### Aartis
- Include full lyrics
- Maintain poetic structure
- Use proper Hindi formatting
- Include deity information

### Granths
- Add accurate metadata
- Include author information
- Provide brief descriptions
- Link to PDF files

---

## 🔄 Workflow

1. **Edit JSON Data** → Changes appear automatically
2. **Update CSS** → Refresh browser to see changes
3. **Modify JavaScript** → Clear cache if needed
4. **Add PDFs** → Place in pdfs/ folder, update JSON
5. **Test Responsive** → Use browser DevTools
6. **Deploy** → Push to GitHub/Firebase

---

## 📞 Support & Contribution

- Report issues on GitHub
- Create pull requests for improvements
- Share feedback and suggestions
- Contribute translations
- Add more content

---

**Created with 🙏 devotion for Sanatan Dharma**

**ॐ ब्रह्मतत्वाय नमः**
