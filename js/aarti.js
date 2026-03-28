/* ========================================
   Aarti Sangrah Page
   ======================================== */

// Load Aartis
async function loadAartis() {
    try {
        const data = await loadJSON('data/aarti.json');
        if (data && data.aartis) {
            displayAartis(data.aartis);
        } else {
            showError('aartiGrid', 'आरती लोड नहीं हो सकी।');
        }
    } catch (error) {
        console.error('Error loading aartis:', error);
        showError('aartiGrid', 'त्रुटि: ' + error.message);
    }
}

// Display Aarti cards
function displayAartis(aartis) {
    let html = '';
    
    aartis.forEach(aarti => {
        html += `
            <div class="aarti-card" onclick="openAartiDetail('${aarti.id}')">
                <div class="aarti-header">
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">${aarti.icon}</div>
                    <h3>${aarti.name}</h3>
                </div>
                <div class="aarti-content">
                    <p style="color: #666; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1rem;">
                        ${aarti.lyrics.substring(0, 100)}...
                    </p>
                    <button class="btn-read" onclick="openAartiDetail('${aarti.id}'); event.stopPropagation();">पूरी आरती देखें</button>
                </div>
            </div>
        `;
    });

    document.getElementById('aartiGrid').innerHTML = html;
}

// Open Aarti detail modal
async function openAartiDetail(aartiId) {
    try {
        const data = await loadJSON('data/aarti.json');
        const aarti = data.aartis.find(a => a.id === aartiId);

        if (aarti) {
            displayAartiDetail(aarti);
            openModal('aartiModal');
        }
    } catch (error) {
        console.error('Error opening aarti detail:', error);
    }
}

// Display Aarti detail
function displayAartiDetail(aarti) {
    const lyricsLines = aarti.lyrics.split('\n').map(line => line.trim()).filter(line => line);
    
    let lyricsHtml = '';
    lyricsLines.forEach(line => {
        if (line) {
            lyricsHtml += `<div style="margin-bottom: 0.8rem; line-height: 1.8; color: #555;">${line}</div>`;
        }
    });

    const html = `
        <div style="padding: 1rem 0;">
            <h3 style="font-family: var(--font-hindi); color: var(--primary-saffron); margin-bottom: 1.5rem; font-size: 1.3rem;">
                ${aarti.name}
            </h3>
            
            <div style="background: linear-gradient(135deg, rgba(255, 153, 51, 0.1) 0%, rgba(255, 215, 0, 0.1) 100%); padding: 1.5rem; border-radius: 10px; margin-bottom: 1.5rem;">
                <h4 style="font-family: var(--font-hindi); color: var(--primary-saffron); margin-bottom: 1rem; font-size: 1.1rem;">
                    🎵 आरती के बोल:
                </h4>
                <div class="aarti-lyrics">
                    ${lyricsHtml}
                </div>
            </div>

            <div style="background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 250, 220, 0.1) 100%); padding: 1.5rem; border-radius: 10px; border-left: 4px solid var(--primary-gold);">
                <p style="color: #555; line-height: 1.8; font-size: 0.95rem;">
                    <strong>नोट:</strong> आरती भक्ति का सर्वोच्च रूप है। इसे प्रेम और श्रद्धा से गाया जाना चाहिए। 
                    आरती के समय घंटी, शंख और ढोल बजाए जाते हैं।
                </p>
            </div>

            <div style="margin-top: 1.5rem; text-align: center;">
                <button class="btn-read" onclick="printContent('aartiDetail')">प्रिंट करें</button>
            </div>
        </div>
    `;

    document.getElementById('aartiDetail').innerHTML = html;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadAartis);
