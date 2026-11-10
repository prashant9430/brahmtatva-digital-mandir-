# 🚀 BrahmTatva – Digital Mandir | Deployment Guide

## विषय सूची (Table of Contents)
1. [GitHub Pages पर Deploy करें](#github-pages)
2. [Firebase Hosting पर Deploy करें](#firebase-hosting)
3. [अपना Domain जोड़ें](#custom-domain)
4. [Troubleshooting](#troubleshooting)

---

## 🐙 GitHub Pages पर Deploy करें {#github-pages}

### Step 1: GitHub Account बनाएँ (अगर नहीं है)
- https://github.com पर जाएँ
- "Sign up" दबाएँ
- Email, username, password दें
- Email verify करें

### Step 2: नया Repository बनाएँ

**Option A: GitHub Desktop से (आसान)**
1. GitHub Desktop download करें: https://desktop.github.com
2. अपने GitHub account से login करें
3. "Create a New Repository" दबाएँ
4. Repository name: `brahmtatva-digital-mandir`
5. Local path: अपनी project folder select करें
6. "Create Repository" दबाएँ

**Option B: GitHub Website से**
1. https://github.com/new पर जाएँ
2. Repository name: `brahmtatva-digital-mandir`
3. Description: "BrahmTatva – Digital Mandir - A spiritual web portal"
4. "Public" select करें
5. "Create repository" दबाएँ

### Step 3: Files को GitHub पर Push करें

**Command Line से (Terminal):**

```bash
# Project folder में जाएँ
cd /home/ubuntu/brahmtatva-digital-mandir

# Git initialize करें
git init

# Remote repository add करें (अपना URL use करें)
git remote add origin https://github.com/YOUR_USERNAME/brahmtatva-digital-mandir.git

# सभी files add करें
git add .

# Commit करें
git commit -m "Initial commit: BrahmTatva Digital Mandir"

# Push करें
git branch -M main
git push -u origin main
```

### Step 4: GitHub Pages Enable करें

1. GitHub पर अपने repository पर जाएँ
2. **Settings** tab खोलें
3. बाईं ओर **Pages** option खोजें
4. **Source** में "main" branch select करें
5. **Save** दबाएँ
6. कुछ मिनट में आपकी website live हो जाएगी!

### Step 5: Website Access करें

आपकी website यहाँ available होगी:
```
https://YOUR_USERNAME.github.io/brahmtatva-digital-mandir
```

**उदाहरण:**
```
https://prashant-pandey.github.io/brahmtatva-digital-mandir
```

---

## 🔥 Firebase Hosting पर Deploy करें {#firebase-hosting}

### Step 1: Firebase Account बनाएँ
1. https://firebase.google.com पर जाएँ
2. "Get Started" दबाएँ
3. Google account से login करें
4. "Create a project" दबाएँ
5. Project name: `brahmtatva-digital-mandir`
6. Terms accept करें
7. "Create project" दबाएँ

### Step 2: Firebase CLI Install करें

```bash
# Node.js install करें (अगर नहीं है)
# https://nodejs.org से latest LTS version download करें

# Firebase CLI install करें
npm install -g firebase-tools

# Firebase login करें
firebase login
```

### Step 3: Firebase Initialize करें

```bash
# Project folder में जाएँ
cd /home/ubuntu/brahmtatva-digital-mandir

# Firebase initialize करें
firebase init hosting

# Questions का जवाब दें:
# "Which Firebase project do you want to associate with this directory?" 
# → अपना project select करें

# "What do you want to use as your public directory?" 
# → . (current directory) type करें

# "Configure as a single-page app?" 
# → n (no) type करें

# "Set up automatic builds and deploys with GitHub?" 
# → n (no) type करें
```

### Step 4: Deploy करें

```bash
firebase deploy
```

### Step 5: Website Access करें

Deploy होने के बाद आपको एक URL मिलेगा:
```
https://brahmtatva-digital-mandir.web.app
```

---

## 🌐 अपना Domain जोड़ें {#custom-domain}

### GitHub Pages के साथ Custom Domain

1. अपना domain खरीदें (Godaddy, Namecheap, आदि से)
2. Domain के DNS settings खोलें
3. यह records add करें:

```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
```

4. GitHub repository settings में जाएँ
5. **Pages** section में "Custom domain" में अपना domain enter करें
6. "Save" दबाएँ
7. SSL certificate के लिए wait करें (कुछ मिनट लग सकते हैं)

### Firebase के साथ Custom Domain

1. Firebase Console खोलें
2. अपनी project select करें
3. **Hosting** section में जाएँ
4. **Custom domain** दबाएँ
5. अपना domain enter करें
6. Firebase के DNS records को अपने domain provider में add करें
7. Verify करें

---

## 📱 Mobile App के लिए Prepare करें

### PWA (Progressive Web App) बनाएँ

`manifest.json` file बनाएँ:

```json
{
  "name": "BrahmTatva – Digital Mandir",
  "short_name": "BrahmTatva",
  "description": "A spiritual web portal for Hindu rituals and knowledge",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#FF9933",
  "icons": [
    {
      "src": "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'><text y='140' font-size='160' fill='%23FF9933'>ॐ</text></svg>",
      "sizes": "192x192",
      "type": "image/svg+xml"
    }
  ]
}
```

`index.html` के `<head>` में add करें:

```html
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#FF9933">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="BrahmTatva">
```

---

## 🔧 Troubleshooting {#troubleshooting}

### समस्या: Website 404 error दे रही है

**समाधान:**
1. Repository name check करें
2. GitHub Pages enabled है या नहीं check करें
3. Branch `main` है या `master` - सही branch select करें

### समस्या: CSS/JS load नहीं हो रहे

**समाधान:**
1. File paths check करें (case-sensitive हैं)
2. सभी files properly committed हैं या नहीं check करें
3. `git status` से verify करें

### समस्या: JSON files load नहीं हो रहे

**समाधान:**
1. `/data/` folder properly committed है या नहीं check करें
2. File names सही हैं या नहीं check करें
3. Browser console में error check करें (F12)

### समस्या: Admin Panel काम नहीं कर रहा

**समाधान:**
1. Local Storage browser में enabled है या नहीं check करें
2. Browser console में errors check करें
3. Different browser try करें

---

## 📊 Performance Tips

### 1. Images Optimize करें
```bash
# ImageMagick से images compress करें
convert image.jpg -quality 80 image-optimized.jpg
```

### 2. CSS/JS Minify करें
- Online tools: https://minifier.org
- या VS Code extension use करें

### 3. Caching Enable करें

Firebase के लिए `firebase.json`:
```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "headers": [
      {
        "source": "**/*.@(js|css|png|jpg|jpeg|gif|svg|woff|woff2)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

---

## 🔐 Security Tips

1. **Sensitive data store न करें** - JSON में passwords/keys न रखें
2. **HTTPS use करें** - GitHub Pages और Firebase दोनों automatically करते हैं
3. **Regular backups लें** - GitHub पर commits करते रहें
4. **Admin panel को protect करें** - Password add करने पर विचार करें

---

## 📈 Analytics Add करें

### Google Analytics

`index.html` के `</head>` से पहले add करें:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

`GA_MEASUREMENT_ID` को अपना ID से replace करें।

---

## 🎉 Deployment Complete!

अब आपकी **BrahmTatva – Digital Mandir** website पूरी दुनिया को दिखाई देगी! 🌍

**ॐ ब्रह्मतत्वाय नमः**

---

## 📞 Support

किसी भी समस्या के लिए:
1. Browser console check करें (F12)
2. Network tab में errors देखें
3. GitHub Issues में question पूछें
4. Firebase documentation देखें

---

**Last Updated:** February 2026  
**Version:** 1.0  
**Status:** Production Ready ✅

**Deployment log:** 10 Nov 2026 - production redeploy trigger (environment scope update ke liye). Koi content ya functionality change nahi.
