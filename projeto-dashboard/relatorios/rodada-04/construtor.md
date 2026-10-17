# Relatório do Construtor — rodada 04

## Versão examinada

Sem repositório Git/commit. Esta rodada adiciona uma ilustração e a integra ao site. Não alterei CSVs, dados preparados, lógica JavaScript ou testes.

### SHA-256

| Arquivo | SHA-256 |
|---|---|
| `site/images/papelaria-hero.svg` | `3105582B353FD106D8E47D0B20F8525FFFCF4682155D91E82FA0388C26B18308` |
| `site/index.html` | `BC600347C7115CE5E4C7F8D751F31ADE29477BB544F81026D43D40DC2C5CE07B` |
| `site/styles.css` | `E730AAA8D4277BE589045ED84EAA467FBD510D64C9B76E18BEA98DBB2EF8C14E` |
| `site/app.js` | `4A907C9E0532E0A64811D9F43085A253FAFAA3F0888D7E46BD7399F15877E43D` |
| `site/data/vendas.json` | `CBBBF4206F9A6CE935706E7FD7E410F7F552645F741A27B3D49B92505917A349` |
| `tests/test_source_contract.py` | `3CACC54AB9709E1A3EB51A641F47DC58748856972B7D5563B811F71E352E41B8` |
| `tests/test_site_contract.py` | `68BF513A7018F54BCF73493DE09B6401941A2DB7734CA1C63C779FC8AA791BD6` |
| `tests/test_browser_contract.py` | `A3C6CDFE4F5A6E614E6758D48DB9A4AD6B387647930B6B29016DA4F0288DB028` |
| `tests/test_preparation_contract.py` | `95102FC3F3F63D2783729D3A59AC2BADD6A5B8F69D86014A6E9294EF9D32631E` |

## O que foi construído

- Novo `site/images/papelaria-hero.svg`: ilustração vetorial original, autocontida e sem fontes ou recursos externos. Um caderno aberto com formas abstratas não quantitativas ocupa o centro; lápis coloridos, canetas, washi tape, clipes, régua e papéis decoram as bordas. A paleta alegre usa coral, amarelo, azul, verde e lilás sobre fundo acolhedor.
- `site/index.html`: integra a arte antes dos filtros por meio de `<img>` com texto alternativo significativo e dimensões intrínsecas.
- `site/styles.css`: moldura, espaçamento e dimensionamento fluido para desktop e celular; não interfere nos controles, hierarquia ou layout dos gráficos.
- Não alterei a análise, dados, comportamento JavaScript, CSVs ou testes. O resultado dos testes é uma verificação do Construtor e não substitui a avaliação independente da rodada.

## Comandos e verificações

Executados em `projeto-dashboard`:

1. `..\.venv\Scripts\python.exe -m unittest discover -s tests -v` — **12 testes passaram, zero falhas e zero skips** (`Ran 12 tests in 6.845s — OK`). Incluiu testes reais de navegador/Chrome; os logs registraram HTTP 200 para a nova arte em `/images/papelaria-hero.svg`, além de HTML, CSS, JavaScript e JSON. A requisição automática de `/favicon.ico` retornou 404, como nos relatórios anteriores; não é referenciada pela página e não falhou nos testes.
2. `node --check site\app.js` — **OK**; sem alterações na lógica.
3. Inspeção Python somente de leitura — **OK**: o SVG é XML válido, contém título/descrição, não incorpora imagens ou URLs externas; o HTML possui exatamente um `<img>` apontando para a arte, com `alt` não vazio e dimensões; o CSS inclui regras do hero e media query móvel.
4. `Test-Path site\images\papelaria-hero.svg`, `Test-Path site\index.html` e `Test-Path site\styles.css` — os três retornaram **True**.
5. `Get-FileHash -Algorithm SHA256` calculou os hashes listados acima. Hashes dos testes coincidem com a versão aprovada da rodada 03; nenhum teste foi editado.
6. Prévia visual com Chrome headless em `1200×540`, salva em pasta temporária local fora do projeto — **OK**; caderno central dominante e objetos decorativos visíveis, sem corte dos elementos importantes.

## Limites e pendências

- A ilustração é decorativa e abstrata; não contém números, métricas ou dados de negócio. O alt descreve o conteúdo principal para leitores de tela.
- A suíte e os testes em navegador passaram nesta verificação do Construtor, mas **Tester e Revisor ainda precisam examinar e aprovar esta versão da rodada 04**. Não há aprovação conjunta nesta etapa.

## Status

**BLOQUEADO para aprovação conjunta; implementação do Construtor concluída.** Arquivos integrados e verificações locais passaram. Aguarda avaliação independente do Tester e do Revisor sobre a mesma versão identificada pelos hashes acima.
