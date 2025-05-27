document.getElementById("seta-esquerda").addEventListener("click", () => mudarPagina(-1));
document.getElementById("seta-direita").addEventListener("click", () => mudarPagina(1));


const estados = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0
};

const legendas3 = [
  "Ação social na Clínica Sorrisus 02.10.2021",
  "Dia das crianças com saúde bucal: avaliação odontológica.",
  "Procedimentos clínicos e aprendizado sobre higiene bucal.",
  "Kit de limpeza com escova, pasta e fio dental + lanche feliz do McDonald's!"
];

// Espera o carregamento total da página
window.addEventListener("load", () => {
  for (let id = 1; id <= 6; id++) {
    const carrossel = document.querySelector(`.carrossel[data-id="${id}"]`);
    if (!carrossel) continue;

    const imagens = carrossel.querySelectorAll("img:not(.seta)");

    const containerIndicadores = document.createElement("div");
    containerIndicadores.classList.add("indicadores");
    carrossel.appendChild(containerIndicadores);

    imagens.forEach((_, index) => {
      const indicador = document.createElement("span");
      indicador.classList.add("indicador");
      indicador.setAttribute("tabindex", "0");
      if (index === 0) indicador.classList.add("ativo");

      indicador.addEventListener("pointerdown", () => atualizarCarrossel(id, index));
      containerIndicadores.appendChild(indicador);
    });
  }

  const legenda = document.getElementById("legenda-3");
  if (legenda) {
    legenda.textContent = legendas3[0];
  }
});

function atualizarCarrossel(id, novaIndex) {
  const carrossel = document.querySelector(`.carrossel[data-id="${id}"]`);
  const imagens = carrossel.querySelectorAll("img:not(.seta)");
  const indicadores = carrossel.querySelectorAll(".indicador");

  imagens[estados[id]].classList.remove("active");
  indicadores[estados[id]].classList.remove("ativo");

  estados[id] = novaIndex;

  imagens[novaIndex].classList.add("active");
  indicadores[novaIndex].classList.add("ativo");

  if (id === 3) {
    const legenda = document.getElementById("legenda-3");
    legenda.textContent = legendas3[novaIndex] || "";
  }
}

function mudarImagem(id, direcao) {
  const carrossel = document.querySelector(`.carrossel[data-id="${id}"]`);
  const imagens = carrossel.querySelectorAll("img:not(.seta)");
  const novaIndex = (estados[id] + direcao + imagens.length) % imagens.length;
  atualizarCarrossel(id, novaIndex);
}

function mudarParaImagem(id, novaIndex) {
  atualizarCarrossel(id, novaIndex);
}

function iniciarCarrosselSimples(classe) {
  const container = document.querySelector(`.${classe}`);
  if (!container) return;

  const imagens = container.querySelectorAll('img');
  let index = 0;

  setInterval(() => {
    imagens[index].classList.remove('active');
    index = (index + 1) % imagens.length;
    imagens[index].classList.add('active');
  }, 2000);
}

// Inicialização dos carroseis 
iniciarCarrosselSimples('carrosselgigantinhos');
iniciarCarrosselSimples('carrosselpandemia');

const carrosseis = document.querySelectorAll(".carrossel");
const totalCarrosseis = carrosseis.length;
const carrosseisPorPagina = 3;
let paginaAtual = 0;

function mostrarCarrosseis() {
  // Calcula índice inicial e final de carrosséis que devem estar visíveis
  const inicio = paginaAtual * carrosseisPorPagina;
  const fim = inicio + carrosseisPorPagina;

  carrosseis.forEach((carrossel, index) => {
    if (index >= inicio && index < fim) {
      carrossel.style.display = "block"; // mostra
    } else {
      carrossel.style.display = "none"; // esconde
    }
  });
}

// Função para avançar ou voltar
function mudarPagina(direcao) {
  paginaAtual += direcao;

  // Limita o valor para não passar dos limites
  if (paginaAtual < 0) paginaAtual = 0;
  if (paginaAtual > Math.floor((totalCarrosseis - 1) / carrosseisPorPagina)) {
    paginaAtual = Math.floor((totalCarrosseis - 1) / carrosseisPorPagina);
  }

  mostrarCarrosseis();
}

// Inicializa mostrando os primeiros carrosséis
mostrarCarrosseis();




