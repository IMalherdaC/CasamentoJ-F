/**
 * LÓGICA DO SITE FABIANA & JUNIOR
 */

// 1. CONFIGURAÇÕES GERAIS
// ATENÇÃO: Coloque uma chave PIX real e ativa aqui para testar. Se for um CPF inventado, o banco vai recusar.
const PIX_KEY = "02037344244"; 
const WHATSAPP_CONFIRMACAO = "+5569999891210"; 

// LISTA DE PRESENTES ATUALIZADA
const presentes = [
    { nome: "Só pra não dizer que não dei nada", valor: 50.00, img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&q=80" },
    { nome: "Controle remoto extra para evitar brigas", valor: 75.00, img: "https://images.unsplash.com/photo-1593344484962-796055d4a3a4?w=500&q=80" },
    { nome: "Tampão de ouvido potente", valor: 90.00, img: "https://audinove.com.br/assets/images/tamp1-778x974.jpg" },
    { nome: "Prioridade na fila do buffet", valor: 164.37, img: "https://images.unsplash.com/photo-1555244162-803834f70033?w=500&q=80" },
    { nome: "Cota pra perguntar quando o casal terá filho", valor: 200.00, img: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=500&q=80" },
    { nome: "Poder reclamar do casamento ou festa", valor: 99999.00, img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjGRirTyWL30TF18uyl4Cs5yZfy3DtaphUexMZG5SnkOSrJhGanLLAhzAKxgQ1ocD5cu_Ln5hLbL4FifN5JwCE5uWEaos5fBQNKkIjJXF5m1hdPcPFgy1mOepwrK_rQDRBskOnzAIAp_Xv7/s1600/Meme+do+ET+Me+Solta+Miga+Mandrak+Concurso+Photoshop.jpg" },
    { nome: "Psicólogo para os noivos não surtarem", valor: 350.00, img: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=500&q=80" },
    { nome: "Diárias no hotel 5 estrelas", valor: 400.00, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80" },
    { nome: "Deus te iluminou e vc resolveu ajudar na viagem", valor: 986.22, img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&q=80" },
    { nome: "Patrocínio Premium - Cota Ouro Padrinho Rico", valor: 5000.00, img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&q=80" }
];

// 2. CARREGAR PRESENTES
function renderGifts() {
    const container = document.getElementById('lista-presentes-container');
    presentes.forEach(item => {
        const card = document.createElement('div');
        card.className = 'gift-card reveal';
        card.innerHTML = `
            <div>
                <img src="${item.img}" alt="${item.nome}">
                <h4>${item.nome}</h4>
            </div>
            <div>
                <span class="price">R$ ${item.valor.toFixed(2).replace('.', ',')}</span>
                <button onclick="openPix('${item.nome}', ${item.valor})" class="btn-primary btn-full">Presentear</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// 3. LÓGICA DO PIX DINÂMICA E BLINDADA
function openPix(nome, valor) {
    document.getElementById("pixGift").innerText = nome;
    const valorFormatado = valor.toFixed(2);
    document.getElementById("pixValue").innerText = valorFormatado.replace('.', ',');

    // Configurações Limpas
    const chave = PIX_KEY.trim(); 
    const nomeRecebedor = "FABIANA E JUNIOR"; 
    const cidadeRecebedor = "ARIQUEMES"; 
    const txid = "CASAMENTO"; // Sem caracteres especiais

    // Montador de blocos do PIX
    const f = (id, conteudo) => {
        const tam = conteudo.length.toString().padStart(2, '0');
        return `${id}${tam}${conteudo}`;
    };

    const gui = f('00', 'BR.GOV.BCB.PIX');
    const chavePix = f('01', chave);
    const merchantAccountInfo = f('26', gui + chavePix);

    let payload = f('00', '01') + 
                  merchantAccountInfo +
                  f('52', '0000') + 
                  f('53', '986') + 
                  f('54', valorFormatado) + 
                  f('58', 'BR') + 
                  f('59', nomeRecebedor) + 
                  f('60', cidadeRecebedor) + 
                  f('62', f('05', txid)) + 
                  '6304'; 

    // CÁLCULO DO CRC16 COM PREVENÇÃO DE ERROS DE NAVEGADOR
    function crc16(str) {
        let crc = 0xFFFF;
        for (let i = 0; i < str.length; i++) {
            crc ^= (str.charCodeAt(i) << 8) & 0xFFFF;
            for (let j = 0; j < 8; j++) {
                if ((crc & 0x8000) !== 0) {
                    crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
                } else {
                    crc = (crc << 1) & 0xFFFF;
                }
            }
        }
        return crc.toString(16).toUpperCase().padStart(4, '0');
    }

    const codigoFinal = payload + crc16(payload);

    document.getElementById("pixCode").value = codigoFinal;
    document.getElementById("pixQr").src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(codigoFinal)}`;
    document.getElementById("pixModal").style.display = "flex";
}

function closePix() {
    document.getElementById("pixModal").style.display = "none";
}

function copyPix() {
    const copyText = document.getElementById("pixCode");
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
    alert("Código PIX copiado! Cole no aplicativo do seu banco.");
}

// Fechar modal clicando fora dele
window.onclick = function(event) {
    const modal = document.getElementById("pixModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// 5. CONTAGEM REGRESSIVA
const weddingDate = new Date("August 15, 2026 15:30:00").getTime();
setInterval(() => {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if(diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = d;
        document.getElementById("hours").innerText = h;
        document.getElementById("minutes").innerText = m;
        document.getElementById("seconds").innerText = s;
    }
}, 1000);

// 6. UTILITÁRIOS (LOADER, REVEAL, LIGHTBOX)
window.addEventListener('load', () => {
    setTimeout(() => { document.getElementById('loader').style.display = 'none'; }, 1000);
    renderGifts();
    reveal(); 
});

function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        if (elementTop < windowHeight - 50) { reveals[i].classList.add("active"); }
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