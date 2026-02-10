// --- PROTEÇÃO AVANÇADA ANTI-CÓPIA & INSPEÇÃO (V2026) ---
(function() {
    // Bloqueia clique direito
    document.addEventListener('contextmenu', e => e.preventDefault());
    
    document.onkeydown = function(e) {
        // Bloqueia: F12 (123), Ctrl+Shift+I (73), Ctrl+Shift+J (74), 
        // Ctrl+Shift+C (67), Ctrl+U (85), Ctrl+S (83)
        if (e.keyCode == 123 || 
           (e.ctrlKey && e.shiftKey && [73, 74, 67].includes(e.keyCode)) ||
           (e.ctrlKey && [85, 83].includes(e.keyCode))) {
            return false;
        }
    };

    // Monitor de Console Aberto (Limpa logs se tentarem inspecionar)
    let threshold = 160;
    setInterval(() => {
        if (window.outerWidth - window.innerWidth > threshold || 
            window.outerHeight - window.innerHeight > threshold) {
            console.clear();
        }
    }, 1000);
})();

// --- LÓGICA DE INTERFACE E TRADUÇÃO ---
let currentLang = 'en'; 
const resumeFiles = { 
    en: 'assets/curriculoMarcosEn.pdf', 
    pt: 'assets/curriculoMarcosPt.pdf' 
};

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
    iframe.style.opacity = '1';
    
    iframe.onload = () => { 
        setTimeout(() => { skeleton.style.display = 'none'; }, 1500); 
    };
}

function openArchitecture() {
    const imgUrl = 'arquitetura-cloud.jpg'; 
    const modal = document.getElementById('demoModal');
    const wrapper = modal.querySelector('.modal-content-wrapper');
    const iframe = document.getElementById('demoIframe');
    const skeleton = document.getElementById('skeleton');

    // Adiciona classe para tamanho fixo e remove scroll
    wrapper.classList.add('modal-architecture');
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    iframe.src = imgUrl;
    iframe.style.opacity = '0';

    setTimeout(() => {
        if(skeleton) skeleton.style.display = 'none';
        iframe.style.opacity = '1';
    }, 600);
}

function openResume() {
    openDemo(resumeFiles[currentLang]);
}

function closeDemo() {
    const modal = document.getElementById('demoModal');
    const wrapper = modal.querySelector('.modal-content-wrapper');
    const iframe = document.getElementById('demoIframe');
    
    if(modal) modal.style.display = 'none';
    if(iframe) iframe.src = "";
    document.body.style.overflow = 'auto';
    
    // Reset de classes específicas para não afetar outros projetos
    wrapper.classList.remove('modal-architecture');
}

// Fecha o modal ao clicar fora da área de conteúdo
window.onclick = function(e) { 
    if (e.target == document.getElementById('demoModal')) closeDemo(); 
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
