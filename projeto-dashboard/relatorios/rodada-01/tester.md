# Relatório do Tester — rodada 01

## Versão examinada

Sem repositório Git/commit. Hashes SHA-256 dos arquivos relevantes após a correção dos testes:

| Arquivo | SHA-256 |
|---|---|
| `scripts/preparar_dados.py` | `87E691AC13398098C4F94AA1E8C48A990BC6701424B706A67FA7F1AF54CFDD27` |
| `site/index.html` | `7D2C64DA59F9F2E287A2945585675B09922142705BF9454AD7B8AAFE7B311EBA` |
| `site/styles.css` | `A09554E3E0532FBBFF48AE02E7D2EBE573EEF0B0610C455708237D30DEBC6D20` |
| `site/app.js` | `4A907C9E0532E0A64811D9F43085A253FAFAA3F0888D7E46BD7399F15877E43D` |
| `site/data/vendas.json` | `CBBBF4206F9A6CE935706E7FD7E410F7F552645F741A27B3D49B92505917A349` |
| `README.md` | `F9452511362284427C2E0F088D8A875CEB2F542D40614B0D62602D89E1DD3473` |
| `tests/test_source_contract.py` | `3CACC54AB9709E1A3EB51A641F47DC58748856972B7D5563B811F71E352E41B8` |
| `tests/test_site_contract.py` | `68BF513A7018F54BCF73493DE09B6401941A2DB7734CA1C63C779FC8AA791BD6` |
| `tests/test_browser_contract.py` | `512D8A8DCA64B878EE74877AC1CB00758A780E5AECD30194899CC48D5C968261` |

## O que foi conferido e alterado

- Corrigida a indentação inválida em `tests/test_site_contract.py`, que antes impedia a suíte de importar esse módulo e `test_browser_contract.py`.
- Corrigida a mensagem de skip em `tests/test_browser_contract.py`: Chrome e Edge estão instalados, mas o pacote de automação Playwright não está. Isso evita afirmar incorretamente que não há navegador.
- Os cinco testes de dados verificam preservação dos CSVs por SHA-256, esquema e ausências/tipos, duplicatas e regras de limpeza documentadas, recálculos independentes e um exemplo pequeno conhecido. A comparação preparada também confronta JSON com o CSV limpo.
- Os testes estáticos verificam conteúdo/estrutura do painel, sintaxe JavaScript, integridade do dataset preparado e carregamento HTTP dos recursos locais.
- Os dois testes Playwright contêm verificações de indicadores, gráficos/tabela, filtros isolados e combinados, limpar, resultado vazio/zero divisão, teclado e larguras de tela. Eles foram descobertos pela suíte, mas **não executados**.

## Comandos e resultados

Executado em `projeto-dashboard`:

```powershell
..\.venv\Scripts\python.exe -m unittest discover -s tests -v
```

Resultado final: **11 testes descobertos, 9 passaram e 2 foram ignorados como PENDENTES**; processo terminou com `OK (skipped=2)`. Evidência dos cinco testes de dados e quatro testes de contrato está no próprio resultado da suíte; os arquivos de teste estão em `tests/`.

Verificação de automação e navegadores:

- `..\.venv\Scripts\python.exe -c "import importlib.util, shutil; print('playwright_module=', bool(importlib.util.find_spec('playwright'))); print('node=', shutil.which('node')); print('chromium=', shutil.which('chromium')); print('chrome=', shutil.which('chrome')); print('msedge=', shutil.which('msedge'))"` — Playwright Python ausente; Node encontrado; nomes `chrome`/`msedge` não estão no PATH.
- `node -e "for (const p of ['playwright','puppeteer','selenium-webdriver']) { try { console.log(p + '=' + require.resolve(p)); } catch { console.log(p + '=not-found'); } }"` — nenhum desses pacotes Node encontrado.
- Verificação de caminhos conhecidos — `C:\Program Files\Google\Chrome\Application\chrome.exe` e `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe` existem; cache de navegadores Playwright ausente.
- Smoke test adicional com Chrome headless (`--headless=new --virtual-time-budget=5000 --dump-dom`) contra servidor HTTP local — **PASSOU**: HTML, CSS, JS e JSON responderam HTTP 200; o DOM renderizado mostrou total `R$ 20.059,00`, 180 vendas, ticket `R$ 111,44` e período. A verificação foi ajustada para a entidade HTML `&nbsp;` usada pela formatação monetária. Esse smoke test não exercita cliques, filtros, teclado nem responsividade e não substitui os testes Playwright.
- O servidor de teste registrou uma requisição automática do Chrome para `/favicon.ico` com HTTP 404; favicon não é um recurso referenciado pelo HTML nem falha nos testes de assets requeridos.

## Problemas e encaminhamentos

- **PENDENTE / BLOQUEADO para o coordenador:** executar os dois testes reais de interação em navegador após disponibilizar Playwright e os navegadores compatíveis (`python -m playwright install chromium`, se autorizado e com acesso disponível). Não houve teste real de filtros, teclado ou layout em tela pequena/grande. Não há falha reproduzível de produto nos testes que foram executados.
- **Construtor:** atualizar `README.md`: linhas 17–23 ainda dizem que os testes independentes não foram entregues, embora a suíte agora exista e seja executável. O hash do README acima confirma que ele não foi alterado nesta etapa.
- Não foi encontrada outra falha de produto reproduzível pela cobertura executada; essa observação não se estende aos comportamentos interativos pendentes.

## Status

**BLOQUEADO.** A suíte não apresentou falhas nos nove testes executáveis, e o smoke test headless passou. Porém, os testes obrigatórios de interação real no navegador foram ignorados por falta de Playwright e permanecem **PENDENTES**; conforme os critérios, não podem ser considerados aprovados.
