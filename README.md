# BrahmTatva – Digital Mandir

## ॐ ब्रह्मतत्वाय नमः

A beautiful, mobile-first spiritual web app for Hindu rituals, mantras, daily panchang, and sacred texts.

---

## 📋 Project Overview

**BrahmTatva – Digital Mandir** is a comprehensive digital spiritual portal dedicated to sharing the knowledge of Sanatan Dharma (Hinduism), the path of devotion (Bhakti), and spiritual development. This is a fully responsive, temple-like web application built with pure HTML, CSS, and JavaScript.

### Key Features

- ✨ **Divine Temple-like UI** - Saffron, white, and gold color scheme with lotus patterns
- 📱 **Mobile-First Design** - Fully responsive on all devices
- 📅 **Daily Panchang** - Auto-updated Hindu calendar with Tithi, Vaar, Nakshatra, Yoga, Karana
- 🙏 **Pooja Vidhi** - Step-by-step worship procedures for various deities
- 🎵 **Mantra Sangrah** - Collection of sacred mantras with Sanskrit and Hindi meanings
- 🕯️ **Aarti Collection** - Divine songs and hymns
- 📖 **Granth Library** - Digital collection of sacred texts
- 🎨 **Smooth Animations** - Subtle background mantra animations and transitions
- 📱 **No Backend Required** - Static site ready for GitHub Pages or Firebase Hosting

---

## 📁 Folder Structure

```
brahmtatva-digital-mandir/
├── index.html                 # Home page
├── panchang.html             # Daily Panchang page
├── pooja.html                # Pooja Vidhi page
├── mantra.html               # Mantra Sangrah page
├── aarti.html                # Aarti Collection page
├── granth.html               # Granth Library page
├── about.html                # About page
│
├── css/
│   ├── style.css             # Main stylesheet with divine design
│   └── responsive.css        # Mobile responsive styles
│
├── js/
│   ├── main.js               # Main JavaScript with utilities
│   ├── panchang.js           # Panchang page functionality
│   ├── pooja.js              # Pooja Vidhi functionality
│   ├── mantra.js             # Mantra Sangrah functionality
│   ├── aarti.js              # Aarti Collection functionality
│   └── granth.js             # Granth Library functionality
│
├── data/
│   ├── pooja.json            # Pooja Vidhi data
│   ├── mantra.json           # Mantras data
│   ├── aarti.json            # Aarti lyrics data
│   └── granth.json           # Sacred texts metadata
│
├── pdfs/                     # PDF files for sacred texts
│   ├── bhagavad-gita.pdf
│   ├── ramayana.pdf
│   ├── mahabharata.pdf
│   ├── rigveda.pdf
│   ├── upanishads.pdf
│   └── durga-saptashati.pdf
│
├── images/                   # Images and icons
│
└── README.md                 # This file
```

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A text editor (VS Code, Sublime Text, etc.)
- Git (for version control)

### Installation

1. **Clone or Download the Project**
   ```bash
   git clone https://github.com/yourusername/brahmtatva-digital-mandir.git
   cd brahmtatva-digital-mandir
   ```

2. **Open Locally**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Python 2
     python -m SimpleHTTPServer 8000
     
     # Using Node.js (http-server)
     npx http-server
     ```

3. **Access the Site**
   - Open `http://localhost:8000` in your browser

---

## 📝 Pages and Sections

### 1. **Home Page** (`index.html`)
- Header: "ॐ ब्रह्मतत्वाय नमः"
- Introduction to Sanatan Dharma
- Navigation cards to all sections
- Mantra background animation

### 2. **Daily Panchang** (`panchang.html`)
- Auto-updated Hindu calendar
- Shows: Tithi, Vaar, Nakshatra, Yoga, Karana
- Sunrise and Sunset times
- Auto-detects Indian timezone
- Refreshes daily automatically

### 3. **Pooja Vidhi** (`pooja.html`)
- Ganesh Pooja Vidhi
- Shiv Pooja Vidhi
- Vishnu Pooja Vidhi
- Durga Pooja Vidhi
- Surya Arghya Vidhi
- Each with step-by-step instructions

### 4. **Mantra Sangrah** (`mantra.html`)
- Shiv Mantras
- Vishnu Mantras
- Gayatri Mantra
- Hanuman Mantras
- Devi Mantras
- Each with Sanskrit text and Hindi meanings

### 5. **Aarti Collection** (`aarti.html`)
- Ganesh Aarti
- Shiv Aarti
- Hanuman Aarti
- Durga Aarti
- Lakshmi Aarti

### 6. **Granth Library** (`granth.html`)
- Bhagavad Gita
- Ramayana
- Mahabharata
- Rigveda
- Upanishads
- Durga Saptashati
- In-site PDF viewer + download buttons

### 7. **About Page** (`about.html`)
- Project purpose and mission
- Features overview
- Information about Sanatan Dharma
- Path of Bhakti
- Importance of Knowledge

---

## 🎨 Design Features

### Color Scheme
- **Primary Saffron**: `#FF9933`
- **Primary White**: `#FFFFFF`
- **Primary Gold**: `#FFD700`
- **Light Gold**: `#FFF8DC`

### Typography
- **Sanskrit Font**: Georgia, Garamond (serif)
- **Hindi Font**: Noto Sans Devanagari, Arial
- Highly readable with proper line spacing

### Animations
- Floating Om symbol in navbar
- Mantra background drift animation
- Card hover effects with smooth transitions
- Bounce animations on icons
- Fade-in animations on scroll

### Responsive Design
- Mobile-first approach
- Breakpoints for tablets (768px) and mobile (480px)
- Hamburger menu for mobile navigation
- Touch-friendly buttons and spacing

---

## 📊 Data Management

### JSON Files

All content is stored in separate JSON files for easy editing:

#### `data/pooja.json`
```json
{
  "poojas": [
    {
      "id": "ganesh",
      "name": "गणेश पूजा विधि",
      "steps": [...],
      "mantra": "ॐ गं गणपतये नमः"
    }
  ]
}
```

#### `data/mantra.json`
```json
{
  "categories": [
    {
      "id": "shiv",
      "name": "शिव मंत्र",
      "mantras": [...]
    }
  ]
}
```

#### `data/aarti.json`
```json
{
  "aartis": [
    {
      "id": "ganesh",
      "name": "गणेश आरती",
      "lyrics": "..."
    }
  ]
}
```

#### `data/granth.json`
```json
{
  "granths": [
    {
      "id": 1,
      "name": "भगवद् गीता",
      "file": "bhagavad-gita.pdf"
    }
  ]
}
```

### Adding New Content

1. **Add Pooja**: Edit `data/pooja.json` and add a new object to the `poojas` array
2. **Add Mantra**: Edit `data/mantra.json` and add to the appropriate category
3. **Add Aarti**: Edit `data/aarti.json` and add a new aarti object
4. **Add PDF**: Place PDF in `pdfs/` folder and add entry to `data/granth.json`

---

## 🔧 JavaScript Utilities

### Main Functions

- `loadJSON(filePath)` - Load JSON data asynchronously
- `openModal(modalId)` - Open modal dialog
- `closeModal(modalId)` - Close modal dialog
- `showLoading(elementId)` - Show loading state
- `showError(elementId, message)` - Show error message
- `showSuccess(elementId, message)` - Show success message
- `downloadFile(url, filename)` - Download file
- `printContent(elementId)` - Print element
- `shareContent(title, text, url)` - Share functionality
- `Storage.set/get/remove/clear()` - Local storage utilities

### Mobile Menu Toggle
```javascript
// Automatically handles hamburger menu on mobile
// Closes when a link is clicked
```

---

## 🌐 Deployment

### GitHub Pages

1. Push your repository to GitHub
2. Go to Settings → Pages
3. Select `main` branch as source
4. Your site will be live at `https://yourusername.github.io/brahmtatva-digital-mandir`

### Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Initialize Firebase:
   ```bash
   firebase init hosting
   ```

3. Deploy:
   ```bash
   firebase deploy
   ```

### Other Hosting

- Netlify
- Vercel
- AWS S3
- Any static hosting service

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🔐 Security Notes

- No backend required - all data is static
- No user authentication needed
- No sensitive data stored
- Safe for all ages
- GDPR compliant (no data collection)

---

## 📚 Content Sources

All content is based on traditional Hindu scriptures and practices:
- Vedas and Upanishads
- Bhagavad Gita
- Ramayana and Mahabharata
- Puranas
- Traditional Pooja procedures

---

## 🎯 Future Enhancements

- [ ] Multi-language support (English, Tamil, Telugu, Kannada, etc.)
- [ ] Audio recitation of mantras
- [ ] Video tutorials for pooja procedures
- [ ] Interactive calendar with personal events
- [ ] Offline support with Service Workers
- [ ] Dark mode theme
- [ ] Social sharing features
- [ ] Community forum
- [ ] Admin panel for content management

---

## 📄 License

This project is open-source and available under the MIT License. Feel free to use, modify, and distribute.

---

## 🙏 Acknowledgments

This project is dedicated to preserving and sharing the knowledge of Sanatan Dharma. We acknowledge all the ancient sages, scriptures, and spiritual teachers who have preserved this wisdom.

---

## 📞 Support

For issues, suggestions, or contributions, please:
1. Open an issue on GitHub
2. Create a pull request with improvements
3. Share feedback and suggestions

---

## 🕉️ Closing Prayer

> **ॐ शान्तिः शान्तिः शान्तिः**
>
> *Om Shanti Shanti Shanti*
>
> May there be peace in all three dimensions - physical, mental, and spiritual.

---

**Created with 🙏 devotion and ❤️ love for Sanatan Dharma**

**ॐ ब्रह्मतत्वाय नमः**
