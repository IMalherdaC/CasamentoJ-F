/**
 * LÓGICA DO SITE FABIANA & JUNIOR
 */

// 1. CONFIGURAÇÕES GERAIS
const PIX_KEY = "SUA_CHAVE_PIX_AQUI"; // Coloque seu CPF ou Celular aqui
const WHATSAPP_CONFIRMACAO = "351924227265"; // Coloque seu número aqui

const presentes = [
    { nome: "Controle remoto extra para evitar brigas", valor: 52.02, img: "https://lh3.googleusercontent.com/d/1ywjPX3mN3-H6C2IcYuYHMsa9mVEHo2GS" },
    { nome: "Tampão de ouvido potente", valor: 104.05, img: "https://lh3.googleusercontent.com/d/1XoW-KxeoWpkK8W2oUfke8FjZj5MqX9n9" },
    { nome: "Cobertor para a noiva ter sempre razão", valor: 124.86, img: "https://lh3.googleusercontent.com/d/1GNItjAuFU_PfkchWMZLu3_k3sGZX6rgg" },
    { nome: "Curso de culinária para o noivo", valor: 114.45, img: "https://lh3.googleusercontent.com/d/1VaHvJTFnPYRnoS7-JcM1FCj_XxwZ7rbt" },
    { nome: "Estoque vitalício de paciência", valor: 159.90, img: "https://lh3.googleusercontent.com/d/1LAtcad7O-A8zjqW2OGaYtLADMvAlEu3j" },
    { nome: "Gasolina para fugir da sogra", valor: 200.00, img: "https://lh3.googleusercontent.com/d/1nym2cHoULMAGHjCkpb58L4C4N3xRFGLJ" }
];

// 2. CARREGAR PRESENTES
function renderGifts() {
    const container = document.getElementById('lista-presentes-container');
    presentes.forEach(item => {
        const card = document.createElement('div');
        card.className = 'gift-card reveal';
        card.innerHTML = `
            <img src="${item.img}" alt="${item.nome}">
            <h4>${item.nome}</h4>
            <span class="price">R$ ${item.valor.toFixed(2)}</span>
            <button onclick="openPix('${item.nome}', ${item.valor})" class="btn-primary">Presentear</button>
        `;
        container.appendChild(card);
    });
}

// 3. LOGICA DO PIX
function openPix(nome, valor) {
    document.getElementById("pixGift").innerText = nome;
    document.getElementById("pixValue").innerText = valor.toFixed(2);

    // Payload PIX Estático Simplificado
    const payload = `00020126360014BR.GOV.BCB.PIX01${PIX_KEY.length}${PIX_KEY}52040000530398654${valor.toFixed(2).replace('.','')}5802BR5909CASAMENTO6009ARIQUEMES6304`;

    document.getElementById("pixCode").value = payload;
    document.getElementById("pixQr").src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(payload)}`;
    document.getElementById("pixModal").style.display = "block";
}

function closePix() {
    document.getElementById("pixModal").style.display = "none";
}

function copyPix() {
    const copyText = document.getElementById("pixCode");
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
    alert("Código PIX copiado! Cole no seu banco.");
}

// 5. CONTAGEM REGRESSIVA
const weddingDate = new Date("August 15, 2026 15:30:00").getTime();
setInterval(() => {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = d;
    document.getElementById("hours").innerText = h;
    document.getElementById("minutes").innerText = m;
    document.getElementById("seconds").innerText = s;
}, 1000);

// 6. UTILITÁRIOS (LOADER, REVEAL, LIGHTBOX)
window.addEventListener('load', () => {
    setTimeout(() => { document.getElementById('loader').style.display = 'none'; }, 1000);
    renderGifts();
});

function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) { reveals[i].classList.add("active"); }
    }
}
window.addEventListener("scroll", reveal);

function openLightbox(src) {
    document.getElementById("lightbox-img").src = src;
    document.getElementById("lightbox").style.display = "flex";
}
function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}