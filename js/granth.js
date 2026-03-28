/* ========================================
   Granth (PDF Library) Page
   ======================================== */

// Load Granths
async function loadGranths() {
    try {
        const data = await loadJSON('data/granth.json');
        if (data && data.granths) {
            displayGranths(data.granths);
        } else {
            showError('granthGrid', 'ग्रंथ लोड नहीं हो सके।');
        }
    } catch (error) {
        console.error('Error loading granths:', error);
        showError('granthGrid', 'त्रुटि: ' + error.message);
    }
}

// Display Granth cards
function displayGranths(granths) {
    let html = '';
    
    granths.forEach(granth => {
        html += `
            <div class="granth-card">
                <div class="granth-icon">${granth.icon}</div>
                <h3>${granth.name}</h3>
                <p><strong>लेखक:</strong> ${granth.author}</p>
                <p style="margin-bottom: 1rem; font-size: 0.9rem; color: #666;">
                    ${granth.description}
                </p>
                <p style="font-size: 0.85rem; color: #999; margin-bottom: 1rem;">
                    📄 ${granth.pages} पृष्ठ | 🌐 ${granth.language}
                </p>
                <div>
                    <button class="btn-view" onclick="openPDF('${granth.file}', '${granth.name}')">
                        👁️ देखें
                    </button>
                    <a href="pdfs/${granth.file}" class="btn-download" download="${granth.name}.pdf">
                        ⬇️ डाउनलोड
                    </a>
                </div>
            </div>
        `;
    });

    document.getElementById('granthGrid').innerHTML = html;
}

// Open PDF viewer
function openPDF(filename, title) {
    const pdfPath = `pdfs/${filename}`;
    
    // Check if file exists
    fetch(pdfPath, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                document.getElementById('pdfTitle').textContent = title;
                document.getElementById('pdfViewer').src = pdfPath;
                openModal('pdfModal');
            } else {
                alert('PDF फाइल उपलब्ध नहीं है। कृपया डाउनलोड करें।');
            }
        })
        .catch(error => {
            console.error('Error checking PDF:', error);
            alert('PDF लोड नहीं हो सकी। कृपया डाउनलोड करें।');
        });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadGranths);
