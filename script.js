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

document.addEventListener("DOMContentLoaded", () => {
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
      if (index === 0) indicador.classList.add("ativo");
      indicador.addEventListener("click", () => atualizarCarrossel(id, index));
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

// Função genérica para carrosséis simples com troca automática
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

// Iniciar carrosséis simples (sem setas/indicadores)
iniciarCarrosselSimples('carrosselgigantinhos');
iniciarCarrosselSimples('carrosselpandemia');
