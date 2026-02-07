// --- PROTEÇÃO ANTI-CÓPIA ---
document.onkeydown = function(e) {
    if(e.keyCode == 123) return false;
    if(e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) || e.keyCode == 'C'.charCodeAt(0) || e.keyCode == 'J'.charCodeAt(0))) return false;
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
};
document.addEventListener('contextmenu', event => event.preventDefault());

// --- LÓGICA DE INTERFACE E TRADUÇÃO ---
let currentLang = 'en'; 
const resumeFiles = { en: 'assets/curriculoMarcosEn.pdf', pt: 'assets/curriculoMarcosPt.pdf' };

document.addEventListener('DOMContentLoaded', () => {
    updateUI();
});

function toggleLanguage() {
    currentLang = (currentLang === 'en') ? 'pt' : 'en';
    updateUI();
}

function updateUI() {
    const langBtn = document.getElementById('langBtn');
    if(langBtn) {
        // Blindagem final de acentos para o botão
        langBtn.textContent = (currentLang === 'en') ? "Portugu\u00EAs" : "Ingl\u00EAs";
    }
    document.querySelectorAll('[data-en]').forEach(el => {
        const translation = el.getAttribute("data-" + currentLang);
        if(translation) el.textContent = translation;
    });
}

function openCustomWindow(url) {
    const width = 950; const height = 750;
    const left = (screen.width / 2) - (width / 2);
    const top = (screen.height / 2) - (height / 2);
    window.open(url, '_blank', "width=" + width + ",height=" + height + ",top=" + top + ",left=" + left);
}

function flipCard(id) { 
    const card = document.getElementById(id);
    if(card) card.classList.toggle('is-flipped'); 
}

function openDemo(url) {
    const modal = document.getElementById('demoModal');
    const iframe = document.getElementById('demoIframe');
    const skeleton = document.getElementById('skeleton');
    if(!modal) return;
    skeleton.style.display = 'flex';
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    iframe.src = url;
    iframe.onload = () => { setTimeout(() => { skeleton.style.display = 'none'; }, 1500); };
}

function openResume() {
    openDemo(resumeFiles[currentLang]);
}

function closeDemo() {
    const modal = document.getElementById('demoModal');
    if(modal) modal.style.display = 'none';
    const iframe = document.getElementById('demoIframe');
    if(iframe) iframe.src = "";
    document.body.style.overflow = 'auto';
}

/**
     * SYSTEM IGNITION - Forced Data Load
     * Dispara fetch em rotas de dados reais para garantir o boot completo do .NET e JSON.
     */
    const apisToWake = [
        'https://api-gestao-clientes-2cd2.onrender.com/api/Cliente',
        'https://controle-gastos-familiar-api.onrender.com/api/pessoas'
    ];

    window.addEventListener('load', () => {
        console.log("?? Ignificando motores das APIs (Carga de Dados)...");
        
        apisToWake.forEach(url => {
            fetch(url, { mode: 'no-cors' })
                .then(() => console.log(`? Controller e Dados ativados em: ${url}`))
                .catch(err => console.warn(`?? Falha ao despertar rota: ${url}`, err));
        });
    });

window.onclick = function(e) { if (e.target == document.getElementById('demoModal')) closeDemo(); }
