// Este script gerencia múltiplos carrosséis na página.

// 'estados' armazena o índice da imagem ativa para cada carrossel numerado (1 a 6).
const estados = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0
};

// 'legendas3' contém os textos para as legendas do Carrossel 3.
const legendas3 = [
  "Ação social na Clínica Sorrisus 02.10.2021",
  "Dia das crianças com saúde bucal: avaliação odontológica.",
  "Procedimentos clínicos e aprendizado sobre higiene bucal.",
  "Kit de limpeza com escova, pasta e fio dental + lanche feliz do McDonald's!"
];

// Espera o carregamento total da página para inicializar os carrosséis.
window.addEventListener("load", () => {
  // --- Inicialização dos Carrosséis Numerados (data-id="1" a "6") ---
  for (let id = 1; id <= 6; id++) {
    const carrossel = document.querySelector(`.carrossel[data-id="${id}"]`);
    if (!carrossel) continue; // Pula se o carrossel não for encontrado

    let imagens;
    // Lógica específica para o Carrossel 3, cujas imagens estão aninhadas em um div '.imagens'.
    if (id === 3) {
      const imagensContainer = carrossel.querySelector(".imagens");
      if (imagensContainer) {
        imagens = imagensContainer.querySelectorAll("img");
      } else {
        continue; // Pula se o contêiner de imagens não for encontrado para o Carrossel 3
      }
    } else {
      // Para os outros carrosséis, seleciona todas as imagens que não são setas (botões).
      imagens = carrossel.querySelectorAll("img:not(.seta)");
    }

    if (imagens.length === 0) continue; // Pula se não houver imagens no carrossel

    // Cria e adiciona o contêiner de indicadores para cada carrossel.
    const containerIndicadores = document.createElement("div");
    containerIndicadores.classList.add("indicadores");
    carrossel.appendChild(containerIndicadores);

    // Cria um indicador (span) para cada imagem e adiciona event listeners.
    imagens.forEach((_, index) => {
      const indicador = document.createElement("span");
      indicador.classList.add("indicador");
      indicador.setAttribute("tabindex", "0");
      if (index === 0) indicador.classList.add("ativo"); // Ativa o primeiro indicador

      indicador.addEventListener("pointerdown", () => atualizarCarrossel(id, index));
      containerIndicadores.appendChild(indicador);
    });

    // Garante que a primeira imagem de cada carrossel numerado esteja ativa ao carregar.
    if (imagens[0]) {
      imagens[0].classList.add("active");
    }
  }

  // Define a legenda inicial para o Carrossel 3.
  const legenda = document.getElementById("legenda-3");
  if (legenda) {
    legenda.textContent = legendas3[0];
  }

  // Como não há botões de paginação globais no HTML (e não podemos modificá-lo),
  // todos os carrosséis da seção ".carrosseis" são exibidos por padrão.
  document.querySelectorAll(".carrossel").forEach(carrossel => {
    carrossel.style.display = "block";
  });

  // --- Início: Lógica para o Carrossel "Outras Ações" ---
  const outrasAcoesCarouselContainer = document.querySelector(".carousel-container");

  if (outrasAcoesCarouselContainer) { // Garante que o contêiner existe
      const outrasAcoesCarousel = outrasAcoesCarouselContainer.querySelector(".carousel");
      const outrasAcoesPrevBtn = outrasAcoesCarouselContainer.querySelector(".prev");
      const outrasAcoesNextBtn = outrasAcoesCarouselContainer.querySelector(".next");
      const outrasAcoesItems = outrasAcoesCarousel.querySelectorAll(".carousel-item");

      let outrasAcoesCurrentIndex = 0; // Começa no primeiro item

      // Função para atualizar a exibição dos itens do carrossel "Outras Ações"
      function updateOutrasAcoesCarousel() {
          if (outrasAcoesItems.length === 0) return; // Sai se não houver itens

          // Oculta todos os itens primeiro
          outrasAcoesItems.forEach(item => {
              item.style.display = "none";
          });

          // Mostra apenas o item atual
          if (outrasAcoesItems[outrasAcoesCurrentIndex]) {
              outrasAcoesItems[outrasAcoesCurrentIndex].style.display = "block";
          }
      }

      // Adiciona event listener para o botão "Anterior" do carrossel "Outras Ações"
      if (outrasAcoesPrevBtn) {
          outrasAcoesPrevBtn.addEventListener("click", () => {
              // Calcula o índice anterior, fazendo o loop para o final se for menor que 0
              outrasAcoesCurrentIndex = (outrasAcoesCurrentIndex - 1 + outrasAcoesItems.length) % outrasAcoesItems.length;
              updateOutrasAcoesCarousel();
          });
      }

      // Adiciona event listener para o botão "Próximo" do carrossel "Outras Ações"
      if (outrasAcoesNextBtn) {
          outrasAcoesNextBtn.addEventListener("click", () => {
              // Calcula o próximo índice, fazendo o loop para o início se for maior que o último
              outrasAcoesCurrentIndex = (outrasAcoesCurrentIndex + 1) % outrasAcoesItems.length;
              updateOutrasAcoesCarousel();
          });
      }

      // Inicializa o carrossel "Outras Ações" para mostrar o primeiro item.
      updateOutrasAcoesCarousel();
  }
  // --- Fim: Lógica para o Carrossel "Outras Ações" ---

}); // Fim do window.addEventListener("load")


// --- Funções Comuns para Carrosséis Numerados (data-id) ---

/**
 * Atualiza a imagem e o indicador ativos de um carrossel específico.
 * @param {number} id O ID do carrossel (de 1 a 6).
 * @param {number} novaIndex O novo índice da imagem a ser ativada.
 */
function atualizarCarrossel(id, novaIndex) {
  const carrossel = document.querySelector(`.carrossel[data-id="${id}"]`);
  if (!carrossel) return;

  let imagens;
  if (id === 3) {
    const imagensContainer = carrossel.querySelector(".imagens");
    if (imagensContainer) {
      imagens = imagensContainer.querySelectorAll("img");
    } else {
      return;
    }
  } else {
    imagens = carrossel.querySelectorAll("img:not(.seta)");
  }

  if (imagens.length === 0) return;

  const indicadores = carrossel.querySelectorAll(".indicador");

  // Remove as classes 'active'/'ativo' da imagem e do indicador anteriores.
  if (estados[id] !== undefined && imagens[estados[id]]) {
    imagens[estados[id]].classList.remove("active");
  }
  if (estados[id] !== undefined && indicadores[estados[id]]) {
    indicadores[estados[id]].classList.remove("ativo");
  }

  estados[id] = novaIndex; // Atualiza o estado para o novo índice.

  // Adiciona as classes 'active'/'ativo' à nova imagem e indicador.
  imagens[novaIndex].classList.add("active");
  indicadores[novaIndex].classList.add("ativo");

  // Atualiza a legenda para o Carrossel 3.
  if (id === 3) {
    const legenda = document.getElementById("legenda-3");
    if (legenda) {
      legenda.textContent = legendas3[novaIndex] || "";
    }
  }
}

/**
 * Muda a imagem de um carrossel em uma direção específica (próximo ou anterior).
 * @param {number} id O ID do carrossel.
 * @param {number} direcao A direção (-1 para anterior, 1 para próximo).
 */
function mudarImagem(id, direcao) {
  const carrossel = document.querySelector(`.carrossel[data-id="${id}"]`);
  if (!carrossel) return;

  let imagens;
  if (id === 3) {
    const imagensContainer = carrossel.querySelector(".imagens");
    if (imagensContainer) {
      imagens = imagensContainer.querySelectorAll("img");
    } else {
      return;
    }
  } else {
    imagens = carrossel.querySelectorAll("img:not(.seta)");
  }

  if (imagens.length === 0) return;

  // Calcula o novo índice, garantindo que ele "dê a volta" ao atingir os limites.
  const novaIndex = (estados[id] + direcao + imagens.length) % imagens.length;
  atualizarCarrossel(id, novaIndex);
}

/**
 * Muda diretamente para uma imagem específica em um carrossel.
 * @param {number} id O ID do carrossel.
 * @param {number} novaIndex O índice da imagem para a qual mudar.
 */
function mudarParaImagem(id, novaIndex) {
  atualizarCarrossel(id, novaIndex);
}


// --- Funções para Carrosséis Simples (sem botões de navegação manuais) ---

/**
 * Inicia um carrossel simples com transição automática.
 * @param {string} classe A classe CSS do contêiner do carrossel simples.
 */
function iniciarCarrosselSimples(classe) {
  const container = document.querySelector(`.${classe}`);
  if (!container) return; // Sai se o contêiner não for encontrado

  const imagens = container.querySelectorAll('img');
  let index = 0;

  if (imagens.length === 0) return; // Sai se não houver imagens

  // Garante que a primeira imagem tenha a classe 'active' inicialmente.
  if (imagens[0]) {
    imagens[0].classList.add('active');
  }

  // Define um intervalo para trocar as imagens automaticamente.
  setInterval(() => {
    if (imagens.length === 0) return;

    imagens[index].classList.remove('active'); // Remove a classe da imagem atual.
    index = (index + 1) % imagens.length; // Avança para a próxima imagem (loop).
    imagens[index].classList.add('active'); // Adiciona a classe à nova imagem.
  }, 2000); // Troca a cada 2 segundos (2000 milissegundos).
}

// Inicialização dos carrosséis simples (Gigantinhos e Pandemia).
iniciarCarrosselSimples('carrosselgigantinhos');
iniciarCarrosselSimples('carrosselpandemia');

// --- Lógica de Paginação Global (Comentada) ---
// As funções abaixo estão comentadas/removidas porque dependem de elementos HTML
// (botões com IDs "seta-esquerda" e "seta-direita") que não estão presentes no seu HTML
// e a instrução é para não modificar o HTML. Sem esses elementos, esta lógica não funcionaria.

/*
const carrosseis = document.querySelectorAll(".carrossel");
const totalCarrosseis = carrosseis.length;
const carrosseisPorPagina = 3;
let paginaAtual = 0;

function mostrarCarrosseis() {
  const inicio = paginaAtual * carrosseisPorPagina;
  const fim = inicio + carrosseisPorPagina;

  carrosseis.forEach((carrossel, index) => {
    if (index >= inicio && index < fim) {
      carrossel.style.display = "block";
    } else {
      carrossel.style.display = "none";
    }
  });
}

function mudarPagina(direcao) {
  paginaAtual += direcao;

  if (paginaAtual < 0) paginaAtual = 0;
  if (paginaAtual > Math.floor((totalCarrosseis - 1) / carrosseisPorPagina)) {
    paginaAtual = Math.floor((totalCarrosseis - 1) / carrosseisPorPagina);
  }

  mostrarCarrosseis();
}

// document.getElementById("seta-esquerda").addEventListener("click", () => mudarPagina(-1));
// document.getElementById("seta-direita").addEventListener("click", () => mudarPagina(1));
// mostrarCarrosseis(); // Chamada inicial para a paginação
*/
