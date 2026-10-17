# Registro visual — rodada 05

## Versão examinada

Sem commit Git. Esta alteração foi executada sequencialmente por um único agente, conforme solicitado pelo usuário. SHA-256:

| Arquivo | SHA-256 |
|---|---|
| `site/styles.css` | `886D09FE80FF3333E4B75417531EC2FF27A4C0E64FCD83AFCF2CFF47291FEDC7` |
| `site/app.js` | `28BEA7023BD11373A2EC7B3B1EDE4BE03C7A435BAC4385C0A5444B51BF448C30` |
| `site/images/papelaria-hero.svg` | `9444820C9B591968C14A7FDEA478A1ACD13BE608C33C07E3EF96122F6ED5FD7F` |

## Alterações visuais

- Fundo geral em rosa muito claro (`#fff4f7`), cartões brancos e bordas rosa suaves.
- Cabeçalho em ameixa escuro (`#51283f`) para contraste; título ampliado, mais pesado e com espaçamento ajustado. Textos e rótulos não foram reescritos.
- Arte SVG harmonizada com fundo rosa pastel, mantendo lápis, canetas e materiais em tons vivos.
- Barras distinguíveis por categoria (rosa-berry, dourado e teal) e cidade (roxo, azul e verde), sem alterar valores, agrupamentos ou ordem.
- Estrutura HTML, conteúdo, dados e ordem da informação preservados.

## Verificações

- `.venv` Python: `..\.venv\Scripts\python.exe -m unittest discover -s tests -v` — **12 testes passaram, sem skips ou falhas**, incluindo navegador real em Chrome, filtros e responsividade. O site serviu o SVG em HTTP 200.
- Contraste calculado: texto principal/fundo 15,38:1; texto secundário/fundo 7,10:1; título branco/cabeçalho 11,56:1; subtítulo rosa/cabeçalho 7,16:1; rótulos escuros/branco entre 11,20:1 e 15,02:1.
- Os testes foram executados pelo agente que fez a alteração; não se apresentam como teste ou revisão independente. O usuário pediu execução por um agente único. A tentativa anterior de iniciar Tester para a rodada 04 foi bloqueada pelo limite de créditos.

## Status

**Alteração visual concluída; aprovação conjunta do dashboard BLOQUEADA.** A versão anterior da rodada 03 foi aprovada. Esta versão não teve revisão independente nem cobertura de testes escrita especificamente para as novas cores; o próximo passo, caso seja solicitada aprovação conjunta, é executar uma rodada independente de Tester e Revisor.
