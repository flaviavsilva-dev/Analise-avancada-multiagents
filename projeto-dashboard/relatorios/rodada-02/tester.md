# Relatório do Tester — rodada 02

## Versão examinada

Sem repositório Git/commit. Hashes SHA-256 da versão testada após as alterações dos testes desta rodada:

| Arquivo | SHA-256 |
|---|---|
| `scripts/preparar_dados.py` | `24B11E34A60C0143A3C2BB61BEF6E7B2C967DFADE678616A8A61648B36BB3233` |
| `site/index.html` | `7D2C64DA59F9F2E287A2945585675B09922142705BF9454AD7B8AAFE7B311EBA` |
| `site/styles.css` | `A09554E3E0532FBBFF48AE02E7D2EBE573EEF0B0610C455708237D30DEBC6D20` |
| `site/app.js` | `4A907C9E0532E0A64811D9F43085A253FAFAA3F0888D7E46BD7399F15877E43D` |
| `site/data/vendas.json` | `CBBBF4206F9A6CE935706E7FD7E410F7F552645F741A27B3D49B92505917A349` |
| `README.md` | `A1136DA3CD341F7E16A29DDD1501A6C2C0AC3464FD54F87088A073F5012EC011` |
| `tests/test_source_contract.py` | `3CACC54AB9709E1A3EB51A641F47DC58748856972B7D5563B811F71E352E41B8` |
| `tests/test_site_contract.py` | `68BF513A7018F54BCF73493DE09B6401941A2DB7734CA1C63C779FC8AA791BD6` |
| `tests/test_browser_contract.py` | `A3C6CDFE4F5A6E614E6758D48DB9A4AD6B387647930B6B29016DA4F0288DB028` |
| `tests/test_preparation_contract.py` | `95102FC3F3F63D2783729D3A59AC2BADD6A5B8F69D86014A6E9294EF9D32631E` |

## O que foi testado e alterado

- Adicionado `tests/test_preparation_contract.py`: monta CSV sintético em diretório temporário, com `quantidade=1.5` e os demais campos válidos, redireciona os caminhos de entrada/saída com mock e exige `ValueError` e ausência de JSON de saída. Não usa nem altera o CSV original.
- Playwright foi instalado **somente em** `.venv` (versão 1.64.0); o módulo está em `.venv\Lib\site-packages`. Não instalei dependência global nem baixei navegador Playwright. O Chrome 155.0.8059.80 já instalado foi lançado com `channel="chrome"`.
- Atualizei somente `tests/test_browser_contract.py` para usar esse Chrome instalado. Justificativa: os testes anteriores exigiam o Chromium empacotado pelo Playwright; usar `channel="chrome"` permite automação real sem baixar outro browser. Acrescentei verificações de tamanho/contraste dos rótulos (14 px e contraste 4,5:1), ausência de rolagem horizontal em 390 px e 1365 px e seleção/limpeza por teclado. Nenhum arquivo de produto foi editado pelo Tester.

## Comandos e evidências

Executado em `projeto-dashboard` após a conclusão do Construtor e novamente depois das alterações dos testes:

```powershell
..\.venv\Scripts\python.exe -m unittest discover -s tests -v
```

Resultado final: **12 testes executados, 12 passaram, nenhum skip ou falha** (`Ran 12 tests in 6.859s — OK`). A saída inclui ambos os testes reais em Chrome, o caso de quantidade fracionária, cinco contratos de dados e os contratos HTTP/estrutura/sintaxe. A saída detalhada do comando e os testes reproduzíveis estão em `tests/`.

Disponibilização local do navegador:

```powershell
..\.venv\Scripts\python.exe -m pip install playwright
..\.venv\Scripts\python.exe -c "from playwright.sync_api import sync_playwright; p=sync_playwright().start(); b=p.chromium.launch(channel='chrome',headless=True); print(b.version); b.close(); p.stop()"
```

Resultado: instalação de `playwright 1.64.0` e dependências na `.venv`; inicialização Playwright pelo Chrome instalado retornou versão `155.0.8059.80`. `python -m playwright install --dry-run chromium` mostrou que o Chromium de Playwright exigiria download; esse download não foi executado. A instalação em `.venv` é uma alteração de ambiente, não da base CSV ou dos arquivos de produto.

Durante os testes de navegador, servidor HTTP local retornou 200 para HTML, CSS, JavaScript e JSON. O Chrome fez também a requisição automática não referenciada `/favicon.ico` (404); isso não falhou nos testes nem impediu o carregamento. Os testes Playwright verificaram indicadores, tabela e rótulos acessíveis dos gráficos contra os registros preparados; filtros isolados/combinados, limpar, resultado vazio, ausência de `NaN`/`Infinity`/`undefined`, erros JavaScript e requisições falhas; visualização em telas pequena/grande, leitura dos rótulos e navegação/seleção por teclado.

## Achados e encaminhamentos

- **Construtor:** nenhum defeito de produto reproduzido nesta versão. A regressão de quantidade fracionária foi reproduzida com fixture sintética e passou contra a validação corrigida. A preservação dos arquivos fonte por SHA-256 e os recálculos independentes também passaram.
- **Revisor:** pode revisar a versão identificada pelos hashes acima; suíte completa e checagens reais de navegador estão aprovadas no escopo do Tester. Não há pendência de teste nesta rodada.
- A revisão independente e a aprovação conjunta do projeto continuam fora desta etapa e devem ser registradas pelo Revisor/coordenador.

## Status

**APROVADO — escopo do Tester, rodada 02.** Todos os 12 testes obrigatórios da suíte foram executados e passaram, incluindo navegador real via Playwright e Chrome instalado. Esta aprovação não substitui a revisão independente nem declara aprovação conjunta do projeto.
