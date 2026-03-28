/* ========================================
   Panchang Page - Pure JavaScript Hindu Calendar
   Astronomical Calculations - No External API Required
   ======================================== */

// Hindi month names
const hindiMonths = {
    0: 'जनवरी', 1: 'फरवरी', 2: 'मार्च', 3: 'अप्रैल',
    4: 'मई', 5: 'जून', 6: 'जुलाई', 7: 'अगस्त',
    8: 'सितंबर', 9: 'अक्टूबर', 10: 'नवंबर', 11: 'दिसंबर'
};

const hindiDays = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];

// Tithi names (lunar days)
const tithis = [
    'प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पंचमी',
    'षष्ठी', 'सप्तमी', 'अष्टमी', 'नवमी', 'दशमी',
    'एकादशी', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी', 'पूर्णिमा',
    'प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पंचमी',
    'षष्ठी', 'सप्तमी', 'अष्टमी', 'नवमी', 'दशमी',
    'एकादशी', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी', 'अमावस्या'
];

// Nakshatra names (lunar mansions - 27 nakshatras)
const nakshatras = [
    'अश्विनी', 'भरणी', 'कृत्तिका', 'रोहिणी', 'मृगशिरा',
    'आर्द्रा', 'पुनर्वसु', 'पुष्य', 'अश्लेषा', 'मघा',
    'पूर्वाफाल्गुनी', 'उत्तराफाल्गुनी', 'हस्त', 'चित्रा', 'स्वाति',
    'विशाखा', 'अनुराधा', 'ज्येष्ठा', 'मूल', 'पूर्वाषाढ़ा',
    'उत्तराषाढ़ा', 'श्रवण', 'धनिष्ठा', 'शतभिषा', 'पूर्वाभाद्रपद',
    'उत्तराभाद्रपद', 'रेवती'
];

// Yoga names (27 yogas)
const yogas = [
    'विष्कुम्भ', 'प्रीति', 'आयुष्मान', 'सौभाग्य', 'शोभन',
    'अतिगण्ड', 'सुकर्म', 'धृति', 'शूल', 'गण्ड',
    'वृद्धि', 'ध्रुव', 'व्यघात', 'हर्षण', 'वज्र',
    'सिद्धि', 'व्यतीपात', 'वरीयान', 'परिघ', 'शिव',
    'सिद्ध', 'साध्य', 'शुभ', 'शुक्ल', 'ब्रह्म',
    'इंद्र', 'वैधृति'
];

// Karana names (11 karanas, repeated in lunar month)
const karanas = [
    'बव', 'बालव', 'कौलव', 'तैतिल', 'गर',
    'वणिज', 'विष्टि', 'शकुनि', 'चतुष्पद', 'नाग', 'किंस्तुघ्न'
];

// ========================================
// Astronomical Calculations
// ========================================

/**
 * Calculate Julian Day Number
 * Used as basis for all astronomical calculations
 */
function calculateJulianDay(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    let a = Math.floor((14 - month) / 12);
    let y = year + 4800 - a;
    let m = month + 12 * a - 3;

    let jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    
    // Add fractional day
    let jd = jdn + (hour - 12) / 24 + minute / 1440 + second / 86400;
    
    return jd;
}

/**
 * Calculate Sun's longitude (simplified)
 * Returns angle in degrees (0-360)
 */
function calculateSunLongitude(jd) {
    // Days since J2000.0 epoch
    const T = (jd - 2451545.0) / 36525.0;
    
    // Mean longitude of sun (in degrees)
    let L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
    L0 = L0 % 360;
    if (L0 < 0) L0 += 360;
    
    // Mean anomaly of sun
    let M = 357.52911 + 35999.05029 * T - 0.0001536 * T * T;
    M = M % 360;
    if (M < 0) M += 360;
    
    // Equation of center
    let C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M * Math.PI / 180) +
            (0.019993 - 0.000101 * T) * Math.sin(2 * M * Math.PI / 180) +
            0.000029 * Math.sin(3 * M * Math.PI / 180);
    
    // True longitude
    let trueLong = L0 + C;
    trueLong = trueLong % 360;
    if (trueLong < 0) trueLong += 360;
    
    return trueLong;
}

/**
 * Calculate Moon's longitude (simplified)
 * Returns angle in degrees (0-360)
 */
function calculateMoonLongitude(jd) {
    const T = (jd - 2451545.0) / 36525.0;
    
    // Mean longitude of moon
    let L = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T + T * T * T / 538841 - T * T * T * T / 65194000;
    L = L % 360;
    if (L < 0) L += 360;
    
    // Mean anomaly of moon
    let M = 134.9328885 + 477198.8731415 * T + 0.0089970 * T * T + T * T * T / 69699 - T * T * T * T / 14712000;
    M = M % 360;
    if (M < 0) M += 360;
    
    // Mean distance of moon from ascending node
    let F = 93.2720950 + 483202.0175233 * T - 0.0036539 * T * T - T * T * T / 3526000 + T * T * T * T / 863310000;
    F = F % 360;
    if (F < 0) F += 360;
    
    // Longitude correction
    let correction = 6.28875 * Math.sin(M * Math.PI / 180) +
                    1.27402 * Math.sin(2 * (F - M) * Math.PI / 180) +
                    0.65160 * Math.sin(2 * F * Math.PI / 180);
    
    let moonLong = L + correction;
    moonLong = moonLong % 360;
    if (moonLong < 0) moonLong += 360;
    
    return moonLong;
}

/**
 * Calculate Tithi (lunar day)
 * Based on angular distance between Sun and Moon
 */
function calculateTithi(jd) {
    const sunLong = calculateSunLongitude(jd);
    const moonLong = calculateMoonLongitude(jd);
    
    // Angular distance
    let elongation = moonLong - sunLong;
    if (elongation < 0) elongation += 360;
    
    // Tithi is 1/30 of lunar month (12 degrees)
    let tithi = Math.floor(elongation / 12);
    if (tithi >= 30) tithi = 29;
    
    return tithi;
}

/**
 * Calculate Nakshatra (lunar mansion)
 * Based on Moon's position in zodiac
 */
function calculateNakshatra(jd) {
    const moonLong = calculateMoonLongitude(jd);
    
    // Each nakshatra spans 13.33 degrees (360/27)
    let nakshatra = Math.floor(moonLong / (360 / 27));
    if (nakshatra >= 27) nakshatra = 26;
    
    return nakshatra;
}

/**
 * Calculate Yoga
 * Based on sum of Sun and Moon longitudes
 */
function calculateYoga(jd) {
    const sunLong = calculateSunLongitude(jd);
    const moonLong = calculateMoonLongitude(jd);
    
    // Sum of longitudes
    let sum = (sunLong + moonLong) % 360;
    if (sum < 0) sum += 360;
    
    // Each yoga spans 13.33 degrees (360/27)
    let yoga = Math.floor(sum / (360 / 27));
    if (yoga >= 27) yoga = 26;
    
    return yoga;
}

/**
 * Calculate Karana
 * Karana is half of a tithi (60 karanas in lunar month)
 */
function calculateKarana(jd) {
    const sunLong = calculateSunLongitude(jd);
    const moonLong = calculateMoonLongitude(jd);
    
    let elongation = moonLong - sunLong;
    if (elongation < 0) elongation += 360;
    
    // Karana is 1/60 of lunar month (6 degrees)
    let karana = Math.floor(elongation / 6) % 11;
    
    return karana;
}

// ========================================
// Sunrise and Sunset Calculations
// ========================================

/**
 * Calculate Sunrise and Sunset times
 * Based on user's system timezone and location approximation
 * Uses simplified algorithm for India (latitude ~20°N, longitude ~78°E)
 */
function calculateSunriseSunset(date) {
    // Get user's timezone offset
    const timezoneOffset = date.getTimezoneOffset() / 60;
    
    // Approximate coordinates for India (can be customized)
    const latitude = 20; // degrees North
    const longitude = 78; // degrees East
    
    // Calculate day of year
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    // Calculate solar declination
    const declination = 23.44 * Math.sin((2 * Math.PI * (dayOfYear - 81)) / 365) * Math.PI / 180;
    
    // Calculate hour angle
    const latRad = latitude * Math.PI / 180;
    const cosH = -Math.tan(latRad) * Math.tan(declination);
    
    let sunrise, sunset;
    
    if (cosH > 1) {
        // Polar night
        sunrise = new Date(date);
        sunrise.setHours(0, 0, 0);
        sunset = new Date(date);
        sunset.setHours(0, 0, 0);
    } else if (cosH < -1) {
        // Polar day
        sunrise = new Date(date);
        sunrise.setHours(0, 0, 0);
        sunset = new Date(date);
        sunset.setHours(23, 59, 59);
    } else {
        const H = Math.acos(cosH) * 180 / Math.PI;
        
        // Calculate equation of time
        const B = (2 * Math.PI * (dayOfYear - 1)) / 365;
        const eot = 229.2 * (0.000075 + 0.001868 * Math.cos(B) - 0.032077 * Math.sin(B) - 
                             0.014615 * Math.cos(2 * B) - 0.040849 * Math.sin(2 * B));
        
        // Calculate sunrise and sunset in minutes from midnight UTC
        const sunriseUTC = 720 - 4 * (longitude + H) - eot;
        const sunsetUTC = 720 - 4 * (longitude - H) - eot;
        
        // Convert to local time
        const sunriseLocal = sunriseUTC + (timezoneOffset * 60);
        const sunsetLocal = sunsetUTC + (timezoneOffset * 60);
        
        sunrise = new Date(date);
        sunrise.setHours(Math.floor(sunriseLocal / 60), Math.floor(sunriseLocal % 60), 0);
        
        sunset = new Date(date);
        sunset.setHours(Math.floor(sunsetLocal / 60), Math.floor(sunsetLocal % 60), 0);
    }
    
    return { sunrise, sunset };
}

// ========================================
// Main Panchang Calculation
// ========================================

/**
 * Calculate complete Panchang for a given date
 */
function calculatePanchang(date) {
    const jd = calculateJulianDay(date);
    
    // Calculate all Panchang components
    const tithiIndex = calculateTithi(jd);
    const nakshatraIndex = calculateNakshatra(jd);
    const yogaIndex = calculateYoga(jd);
    const karanaIndex = calculateKarana(jd);
    
    // Get Sunrise and Sunset
    const { sunrise, sunset } = calculateSunriseSunset(date);
    
    // Format times
    const sunriseTime = sunrise.toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    const sunsetTime = sunset.toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    
    return {
        date: date,
        tithi: tithis[tithiIndex],
        vaar: hindiDays[date.getDay()],
        nakshatra: nakshatras[nakshatraIndex],
        yoga: yogas[yogaIndex],
        karana: karanas[karanaIndex],
        sunrise: sunriseTime,
        sunset: sunsetTime,
        tithiIndex: tithiIndex,
        nakshatraIndex: nakshatraIndex,
        yogaIndex: yogaIndex,
        karanaIndex: karanaIndex
    };
}

// ========================================
// Display Functions
// ========================================

/**
 * Display Panchang data in HTML
 */
function displayPanchang(panchangData) {
    const today = panchangData.date;
    const dateStr = `${today.getDate()} ${hindiMonths[today.getMonth()]} ${today.getFullYear()}`;

    // Update elements with IDs
    const tithiElement = document.getElementById('tithi');
    const vaarElement = document.getElementById('vaar');
    const nakshatraElement = document.getElementById('nakshatra');
    const yogaElement = document.getElementById('yoga');
    const karanaElement = document.getElementById('karana');

    if (tithiElement) tithiElement.textContent = panchangData.tithi;
    if (vaarElement) vaarElement.textContent = panchangData.vaar;
    if (nakshatraElement) nakshatraElement.textContent = panchangData.nakshatra;
    if (yogaElement) yogaElement.textContent = panchangData.yoga;
    if (karanaElement) karanaElement.textContent = panchangData.karana;

    // Also display in grid format if container exists
    const panchangContent = document.getElementById('panchangContent');
    if (panchangContent) {
        const html = `
            <h2 style="font-family: var(--font-hindi); color: var(--primary-saffron); margin-bottom: 1.5rem; text-align: center;">
                ${dateStr}
            </h2>
            <div class="panchang-grid">
                <div class="panchang-item">
                    <h3>तिथि</h3>
                    <p id="tithi">${panchangData.tithi}</p>
                </div>
                <div class="panchang-item">
                    <h3>वार</h3>
                    <p id="vaar">${panchangData.vaar}</p>
                </div>
                <div class="panchang-item">
                    <h3>नक्षत्र</h3>
                    <p id="nakshatra">${panchangData.nakshatra}</p>
                </div>
                <div class="panchang-item">
                    <h3>योग</h3>
                    <p id="yoga">${panchangData.yoga}</p>
                </div>
                <div class="panchang-item">
                    <h3>करण</h3>
                    <p id="karana">${panchangData.karana}</p>
                </div>
            </div>
        `;
        panchangContent.innerHTML = html;
    }
}

/**
 * Display Sunrise and Sunset times
 */
function displaySunMoonTimes(panchangData) {
    const sunriseElement = document.getElementById('sunrise');
    const sunsetElement = document.getElementById('sunset');

    if (sunriseElement) sunriseElement.textContent = panchangData.sunrise;
    if (sunsetElement) sunsetElement.textContent = panchangData.sunset;

    // Also display in grid format if container exists
    const sunMoonContent = document.getElementById('sunMoonContent');
    if (sunMoonContent) {
        const html = `
            <div class="panchang-item">
                <h3>☀️ सूर्योदय</h3>
                <p id="sunrise">${panchangData.sunrise}</p>
            </div>
            <div class="panchang-item">
                <h3>🌅 सूर्यास्त</h3>
                <p id="sunset">${panchangData.sunset}</p>
            </div>
            <div class="panchang-item">
                <h3>🌙 चंद्रोदय</h3>
                <p>~${new Date(panchangData.date.getTime() + 12 * 60 * 60 * 1000).toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
            </div>
            <div class="panchang-item">
                <h3>🌙 चंद्रास्त</h3>
                <p>~${new Date(panchangData.date.getTime() + 24 * 60 * 60 * 1000).toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
            </div>
        `;
        sunMoonContent.innerHTML = html;
    }
}

/**
 * Load and display Panchang for today
 */
function loadPanchang() {
    try {
        const today = new Date();
        const panchangData = calculatePanchang(today);
        
        if (panchangData) {
            displayPanchang(panchangData);
            displaySunMoonTimes(panchangData);
        } else {
            showError('panchangContent', 'पंचांग की गणना नहीं हो सकी।');
        }
    } catch (error) {
        console.error('Error calculating panchang:', error);
        showError('panchangContent', 'त्रुटि: ' + error.message);
    }
}

/**
 * Auto-refresh Panchang daily at midnight
 */
function setupAutoRefresh() {
    // Load on page load
    loadPanchang();

    // Refresh at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const timeUntilMidnight = tomorrow - now;
    
    setTimeout(() => {
        loadPanchang();
        // Then refresh every 24 hours
        setInterval(loadPanchang, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', setupAutoRefresh);
