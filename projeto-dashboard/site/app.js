"use strict";

const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const numero = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });
const dataPt = new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" });
const SVG_NS = "http://www.w3.org/2000/svg";
const CORES_GRAFICOS = {
  categoria: {
    "Acessórios": "#c83e70",
    "Livros": "#cf790d",
    "Papelaria": "#168387",
  },
  cidade: {
    Campinas: "#7047a2",
    Santos: "#2879a8",
    Sorocaba: "#42804a",
  },
};

const elementos = {
  cidade: document.querySelector("#filtro-cidade"),
  categoria: document.querySelector("#filtro-categoria"),
  limpar: document.querySelector("#limpar-filtros"),
  total: document.querySelector("#indicador-total"),
  contagem: document.querySelector("#indicador-contagem"),
  ticket: document.querySelector("#indicador-ticket"),
  periodo: document.querySelector("#periodo"),
  tabela: document.querySelector("#corpo-tabela"),
  contagemTabela: document.querySelector("#contagem-tabela"),
  vazio: document.querySelector("#estado-vazio"),
  tabelaRolagem: document.querySelector("#tabela-rolagem"),
  graficoCategoria: document.querySelector("#grafico-categoria"),
  graficoCidade: document.querySelector("#grafico-cidade"),
};

function elementoSvg(nome, atributos = {}, texto = "") {
  const no = document.createElementNS(SVG_NS, nome);
  for (const [chave, valor] of Object.entries(atributos)) no.setAttribute(chave, String(valor));
  if (texto) no.textContent = texto;
  return no;
}

function preencherFiltro(select, valores) {
  for (const valor of valores) {
    const opcao = document.createElement("option");
    opcao.value = valor;
    opcao.textContent = valor;
    select.append(opcao);
  }
}

function agregar(vendas, coluna) {
  const totais = new Map();
  for (const venda of vendas) totais.set(venda[coluna], (totais.get(venda[coluna]) || 0) + venda.valor_venda);
  return [...totais.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "pt-BR"));
}

function desenharGrafico(destino, titulo, valores, paleta) {
  destino.replaceChildren();
  if (valores.length === 0) {
    const mensagem = document.createElement("p");
    mensagem.className = "sem-dados-grafico";
    mensagem.textContent = "Sem vendas para exibir neste gráfico.";
    destino.append(mensagem);
    return;
  }

  const largura = 560;
  const altura = 260;
  const esquerda = 92;
  const direita = 15;
  const topo = 14;
  const base = 226;
  const maximo = Math.max(...valores.map(([, valor]) => valor), 1);
  const svg = elementoSvg("svg", {
    viewBox: `0 0 ${largura} ${altura}`,
    role: "img",
    "aria-label": `${titulo}: ${valores.map(([nome, valor]) => `${nome}, ${moeda.format(valor)}`).join("; ")}`,
  });
  const tituloSvg = elementoSvg("title", {}, titulo);
  svg.append(tituloSvg);

  for (let linha = 0; linha <= 4; linha += 1) {
    const y = topo + ((base - topo) * linha) / 4;
    svg.append(elementoSvg("line", { x1: esquerda, x2: largura - direita, y1: y, y2: y, class: "grade-svg" }));
    const marca = maximo * (1 - linha / 4);
    svg.append(elementoSvg("text", { x: esquerda - 8, y: y + 4, "text-anchor": "end", class: "eixo-svg" },
      moeda.format(marca).replace(",00", "")));
  }

  const faixa = (base - topo) / valores.length;
  const alturaBarra = Math.min(30, faixa * 0.55);
  valores.forEach(([nome, valor], indice) => {
    const centroY = topo + faixa * (indice + 0.5);
    const larguraBarra = ((largura - esquerda - direita) * valor) / maximo;
    const rotulo = nome.length > 14 ? `${nome.slice(0, 13)}…` : nome;
    svg.append(elementoSvg("text", { x: esquerda - 9, y: centroY + 4, "text-anchor": "end", class: "rotulo-svg" }, rotulo));
    const barra = elementoSvg("rect", {
      x: esquerda,
      y: centroY - alturaBarra / 2,
      width: larguraBarra,
      height: alturaBarra,
      rx: 4,
      class: "barra-svg",
      fill: paleta[nome] || "#c83e70",
    });
    barra.append(elementoSvg("title", {}, `${nome}: ${moeda.format(valor)}`));
    svg.append(barra);
    const textoValor = moeda.format(valor);
    const cabeDentro = larguraBarra > 100;
    svg.append(elementoSvg("text", {
      x: cabeDentro ? esquerda + larguraBarra - 7 : Math.min(largura - 3, esquerda + larguraBarra + 7),
      y: centroY + 4,
      "text-anchor": cabeDentro ? "end" : "start",
      class: "valor-svg",
    }, textoValor));
  });
  destino.append(svg);
}

function adicionarCelula(linha, valor, classe = "") {
  const celula = document.createElement("td");
  if (classe) celula.className = classe;
  celula.textContent = valor;
  linha.append(celula);
}

function desenharTabela(vendas) {
  const fragmento = document.createDocumentFragment();
  for (const venda of vendas) {
    const linha = document.createElement("tr");
    const data = dataPt.format(new Date(`${venda.data}T00:00:00Z`));
    adicionarCelula(linha, data);
    adicionarCelula(linha, venda.id_venda);
    adicionarCelula(linha, venda.cidade);
    adicionarCelula(linha, venda.categoria);
    adicionarCelula(linha, venda.produto);
    adicionarCelula(linha, numero.format(venda.quantidade), "numero");
    adicionarCelula(linha, moeda.format(venda.preco_unitario), "numero");
    adicionarCelula(linha, venda.forma_pagamento);
    adicionarCelula(linha, moeda.format(venda.valor_venda), "numero");
    fragmento.append(linha);
  }
  elementos.tabela.replaceChildren(fragmento);
}

function atualizar(vendasOriginais) {
  const cidade = elementos.cidade.value;
  const categoria = elementos.categoria.value;
  const vendas = vendasOriginais.filter((venda) =>
    (!cidade || venda.cidade === cidade) && (!categoria || venda.categoria === categoria));
  const total = vendas.reduce((soma, venda) => soma + venda.valor_venda, 0);
  const ticket = vendas.length ? total / vendas.length : 0;

  elementos.total.textContent = moeda.format(total);
  elementos.contagem.textContent = numero.format(vendas.length);
  elementos.ticket.textContent = moeda.format(ticket);
  elementos.contagemTabela.textContent = `${numero.format(vendas.length)} ${vendas.length === 1 ? "venda" : "vendas"}`;
  elementos.vazio.hidden = vendas.length !== 0;
  elementos.tabelaRolagem.hidden = vendas.length === 0;
  desenharGrafico(elementos.graficoCategoria, "Valor vendido por categoria", agregar(vendas, "categoria"), CORES_GRAFICOS.categoria);
  desenharGrafico(elementos.graficoCidade, "Valor vendido por cidade", agregar(vendas, "cidade"), CORES_GRAFICOS.cidade);
  desenharTabela(vendas);
}

async function iniciar() {
  const resposta = await fetch("./data/vendas.json");
  if (!resposta.ok) throw new Error(`Não foi possível carregar os dados (${resposta.status}).`);
  const dados = await resposta.json();
  const vendas = dados.vendas;
  const datas = vendas.map((venda) => venda.data).sort();
  const formatarData = (iso) => dataPt.format(new Date(`${iso}T00:00:00Z`));

  elementos.periodo.textContent = `${formatarData(datas[0])} a ${formatarData(datas[datas.length - 1])}`;
  preencherFiltro(elementos.cidade, [...new Set(vendas.map((venda) => venda.cidade))].sort((a, b) => a.localeCompare(b, "pt-BR")));
  preencherFiltro(elementos.categoria, [...new Set(vendas.map((venda) => venda.categoria))].sort((a, b) => a.localeCompare(b, "pt-BR")));
  elementos.cidade.addEventListener("change", () => atualizar(vendas));
  elementos.categoria.addEventListener("change", () => atualizar(vendas));
  elementos.limpar.addEventListener("click", () => {
    elementos.cidade.value = "";
    elementos.categoria.value = "";
    atualizar(vendas);
    elementos.cidade.focus();
  });
  atualizar(vendas);
}

iniciar().catch((erro) => {
  console.error(erro);
  elementos.periodo.textContent = "Erro ao carregar os dados";
  const mensagem = document.createElement("p");
  mensagem.className = "estado-vazio";
  mensagem.setAttribute("role", "alert");
  mensagem.textContent = "Não foi possível carregar os dados. Confira se os arquivos do site estão completos e abra o site por um servidor HTTP local.";
  document.querySelector("main").prepend(mensagem);
});
