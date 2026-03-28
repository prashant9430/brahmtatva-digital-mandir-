/* ========================================
   Mantra Sangrah Page
   ======================================== */

let currentCategory = null;

// Load Mantras
async function loadMantras() {
    try {
        const data = await loadJSON('data/mantra.json');
        if (data && data.categories) {
            displayMantraTabs(data.categories);
            // Load first category by default
            if (data.categories.length > 0) {
                currentCategory = data.categories[0].id;
                displayMantras(data.categories[0].mantras);
            }
        } else {
            showError('mantraList', 'मंत्र लोड नहीं हो सके।');
        }
    } catch (error) {
        console.error('Error loading mantras:', error);
        showError('mantraList', 'त्रुटि: ' + error.message);
    }
}

// Display Mantra category tabs
function displayMantraTabs(categories) {
    let html = '';
    
    categories.forEach((category, index) => {
        const activeClass = index === 0 ? 'active' : '';
        html += `
            <button class="mantra-tab ${activeClass}" onclick="switchCategory('${category.id}')">
                ${category.name}
            </button>
        `;
    });

    document.getElementById('mantraTabs').innerHTML = html;
}

// Switch category
async function switchCategory(categoryId) {
    try {
        const data = await loadJSON('data/mantra.json');
        const category = data.categories.find(c => c.id === categoryId);

        if (category) {
            currentCategory = categoryId;
            displayMantras(category.mantras);

            // Update active tab
            document.querySelectorAll('.mantra-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            event.target.classList.add('active');

            // Smooth scroll
            document.getElementById('mantraList').scrollIntoView({ behavior: 'smooth' });
        }
    } catch (error) {
        console.error('Error switching category:', error);
    }
}

// Display Mantras
function displayMantras(mantras) {
    let html = '';
    
    mantras.forEach(mantra => {
        html += `
            <div class="mantra-item">
                <div class="mantra-sanskrit">${mantra.sanskrit}</div>
                <div class="mantra-hindi"><strong>हिंदी:</strong> ${mantra.hindi}</div>
                <div class="mantra-meaning">
                    <strong>अर्थ:</strong> ${mantra.meaning}
                </div>
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255, 153, 51, 0.2);">
                    <strong style="color: var(--primary-saffron);">लाभ:</strong> ${mantra.benefits}
                </div>
            </div>
        `;
    });

    document.getElementById('mantraList').innerHTML = html;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadMantras);
