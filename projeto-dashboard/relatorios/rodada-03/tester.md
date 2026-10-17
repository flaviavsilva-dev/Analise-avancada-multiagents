# Relatório do Tester — rodada 03

## Versão examinada

Sem repositório Git/commit. Hashes SHA-256 da versão final conferida:

| Arquivo | SHA-256 |
|---|---|
| `vendas_papelaria.csv` (original) | `BF95B7609E30EB7E3E6A30CFC16E43D9FB5BDFC48A410E49148CCEB92E2494FF` |
| `papelaria_limpa.csv` | `E25B6C2CDF05A6492F6495A91F9384565629F26E1318039F75734DCD9856995D` |
| `scripts/preparar_dados.py` | `24B11E34A60C0143A3C2BB61BEF6E7B2C967DFADE678616A8A61648B36BB3233` |
| `site/index.html` | `7D2C64DA59F9F2E287A2945585675B09922142705BF9454AD7B8AAFE7B311EBA` |
| `site/styles.css` | `A09554E3E0532FBBFF48AE02E7D2EBE573EEF0B0610C455708237D30DEBC6D20` |
| `site/app.js` | `4A907C9E0532E0A64811D9F43085A253FAFAA3F0888D7E46BD7399F15877E43D` |
| `site/data/vendas.json` | `CBBBF4206F9A6CE935706E7FD7E410F7F552645F741A27B3D49B92505917A349` |
| `README.md` | `7D8E9ECA8E87D2146020E0B2525574E5FFDCD64314F9457870EBE731FB5F5366` |
| `tests/test_source_contract.py` | `3CACC54AB9709E1A3EB51A641F47DC58748856972B7D5563B811F71E352E41B8` |
| `tests/test_site_contract.py` | `68BF513A7018F54BCF73493DE09B6401941A2DB7734CA1C63C779FC8AA791BD6` |
| `tests/test_browser_contract.py` | `A3C6CDFE4F5A6E614E6758D48DB9A4AD6B387647930B6B29016DA4F0288DB028` |
| `tests/test_preparation_contract.py` | `95102FC3F3F63D2783729D3A59AC2BADD6A5B8F69D86014A6E9294EF9D32631E` |

Os dois hashes de CSV coincidem com os valores fixados em `tests/test_source_contract.py` e com a rodada anterior. Os hashes do produto coincidem com `relatorios/rodada-03/construtor.md`.

## Comandos e evidências

Todos executados/verificados a partir de `projeto-dashboard`, salvo indicação:

1. **Preparação pandas:**

   ```powershell
   ..\.venv\Scripts\python.exe scripts\preparar_dados.py
   ```

   **PASSOU:** gerou 180 vendas e total R$ 20.059,00. O SHA-256 do JSON gerado permaneceu `CBBBF420...17A349`, igual ao anterior; os SHA-256 dos dois CSVs também permaneceram inalterados.

2. **Ambiente e dependências README:** `py --version` e `py -0p` localizaram o launcher e Python 3.14.8; o Python efetivo foi `.venv\Scripts\python.exe`. Importações confirmaram pandas 3.0.6 e Playwright 1.64.0 em `.venv\Lib\site-packages`. `..\.venv\Scripts\python.exe -m pip install --dry-run pandas playwright` e `..\.venv\Scripts\python.exe -m pip install --dry-run --upgrade pip` terminaram com os requisitos já satisfeitos nesse ambiente. A criação de uma nova `.venv` não foi repetida para preservar a venv já instalada; não foi necessário reinstalar nem atualizar pacotes.

3. **Verificação do Chrome documentada:**

   ```powershell
   ..\.venv\Scripts\python.exe -c "from playwright.sync_api import sync_playwright; p=sync_playwright().start(); b=p.chromium.launch(channel='chrome',headless=True); print(b.version); b.close(); p.stop()"
   ```

   **PASSOU:** Playwright lançou o Chrome instalado, versão `155.0.8059.80`. Nenhum Chromium do Playwright foi baixado.

4. **Suíte final completa:**

   ```powershell
   ..\.venv\Scripts\python.exe -m unittest discover -s tests -v
   ```

   **PASSOU:** `Ran 12 tests in 6.663s — OK`; 12 passaram, zero falhas e zero skips. A saída registra os dois testes Playwright reais em Chrome, regressão de quantidade fracionária, contratos independentes de dados, sintaxe JS, site HTTP e recursos. Inclui filtros simples/combinados, limpar, cenário vazio, métricas/gráficos/tabela, responsividade, contraste/tamanho de rótulos e teclado.

5. **Servidor HTTP do README:** iniciei o equivalente documentado a `..\.venv\Scripts\python.exe -m http.server 8000 --directory site` em processo temporário, consultei `http://127.0.0.1:8000/` e `/data/vendas.json`, e encerrei o processo. **PASSOU:** index HTTP 200 e JSON com 180 registros. A porta estava livre antes do teste.

## README, achados e encaminhamentos

- Os comandos de preparação, dependências da `.venv`, verificação do Chrome, suíte e servidor HTTP correspondem a executáveis presentes neste workspace e foram validados conforme acima. O setup de ambiente limpo (`py -m venv ..\.venv` e instalação) não foi aplicado sobre a `.venv` existente; launcher, ambiente ativo e dependências foram verificados sem sobrescrever o ambiente.
- O resultado informado no README sobre a rodada 02 (12 testes, sem skips ou falhas) é consistente com `relatorios/rodada-02/tester.md`; a repetição final na rodada 03 também passou sem skips.
- **Construtor:** nenhum erro documental ou defeito de produto encontrado; nenhum encaminhamento de correção.
- **Revisor/coordenador:** hashes e evidências finais estão registrados acima. A revisão independente e o status conjunto permanecem responsabilidades do Revisor/coordenador; este relatório aprova somente a etapa de testes.

## Status

**APROVADO — Tester, rodada 03.** Os comandos verificados funcionaram, os hashes fonte permaneceram iguais aos fixados e todos os 12 testes, incluindo Chrome real, passaram sem skips ou falhas. Esta aprovação não substitui revisão independente nem aprovação conjunta.
