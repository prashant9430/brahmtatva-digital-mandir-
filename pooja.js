/* ========================================
   Pooja Vidhi Page
   ======================================== */

// Load Pooja data
async function loadPoojas() {
    try {
        const data = await loadJSON('data/pooja.json');
        if (data && data.poojas) {
            displayPoojas(data.poojas);
        } else {
            showError('poojaGrid', 'पूजा विधि लोड नहीं हो सकी।');
        }
    } catch (error) {
        console.error('Error loading poojas:', error);
        showError('poojaGrid', 'त्रुटि: ' + error.message);
    }
}

// Display Pooja cards
function displayPoojas(poojas) {
    let html = '';
    
    poojas.forEach(pooja => {
        html += `
            <div class="pooja-card" onclick="openPoojaDetail('${pooja.id}')">
                <div class="pooja-card-header">
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">${pooja.icon}</div>
                    <h3>${pooja.name}</h3>
                </div>
                <div class="pooja-card-body">
                    <p>${pooja.description}</p>
                    <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--primary-saffron); font-weight: 500;">
                        मंत्र: ${pooja.mantra}
                    </p>
                    <button class="btn-read" onclick="openPoojaDetail('${pooja.id}'); event.stopPropagation();">विस्तृत जानकारी</button>
                </div>
            </div>
        `;
    });

    document.getElementById('poojaGrid').innerHTML = html;
}

// Open Pooja detail modal
async function openPoojaDetail(poojaId) {
    try {
        const data = await loadJSON('data/pooja.json');
        const pooja = data.poojas.find(p => p.id === poojaId);

        if (pooja) {
            displayPoojaDetail(pooja);
            openModal('poojaModal');
        }
    } catch (error) {
        console.error('Error opening pooja detail:', error);
    }
}

// Display Pooja detail
function displayPoojaDetail(pooja) {
    let stepsHtml = '';
    
    pooja.steps.forEach(step => {
        stepsHtml += `
            <div style="margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(255, 153, 51, 0.2);">
                <h4 style="font-family: var(--font-hindi); color: var(--primary-saffron); font-size: 1.1rem; margin-bottom: 0.5rem;">
                    चरण ${step.step}: ${step.title}
                </h4>
                <p style="color: #555; line-height: 1.8;">${step.description}</p>
            </div>
        `;
    });

    const html = `
        <div style="padding: 1rem 0;">
            <h3 style="font-family: var(--font-hindi); color: var(--primary-saffron); margin-bottom: 1rem; font-size: 1.3rem;">
                ${pooja.name}
            </h3>
            
            <div style="background: rgba(255, 215, 0, 0.1); padding: 1rem; border-radius: 10px; margin-bottom: 1.5rem; border-left: 4px solid var(--primary-gold);">
                <p style="color: #555; line-height: 1.8; margin-bottom: 1rem;">
                    <strong>विवरण:</strong> ${pooja.description}
                </p>
                <p style="color: #555; line-height: 1.8; margin-bottom: 1rem;">
                    <strong>मंत्र:</strong> <span style="font-family: var(--font-sanskrit); font-size: 1.1rem; color: var(--primary-saffron);">${pooja.mantra}</span>
                </p>
                <p style="color: #555; line-height: 1.8;">
                    <strong>लाभ:</strong> ${pooja.benefits}
                </p>
            </div>

            <h4 style="font-family: var(--font-hindi); color: var(--primary-saffron); margin-bottom: 1.5rem; font-size: 1.2rem;">
                📖 पूजा विधि के चरण:
            </h4>

            ${stepsHtml}

            <div style="background: linear-gradient(135deg, rgba(255, 153, 51, 0.1) 0%, rgba(255, 215, 0, 0.1) 100%); padding: 1.5rem; border-radius: 10px; margin-top: 1.5rem;">
                <p style="color: #555; line-height: 1.8; font-size: 0.95rem;">
                    <strong>नोट:</strong> यह पूजा विधि सामान्य निर्देश है। स्थानीय परंपरा और आचार्य के निर्देशानुसार पूजा की जा सकती है।
                </p>
            </div>
        </div>
    `;

    document.getElementById('poojaDetail').innerHTML = html;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadPoojas);
