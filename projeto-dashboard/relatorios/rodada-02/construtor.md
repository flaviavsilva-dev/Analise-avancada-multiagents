# Relatório do Construtor — rodada 02

## Versão examinada

Sem repositório Git/commit. Esta rodada altera apenas `scripts/preparar_dados.py` e `README.md`; relatórios e arquivos de `tests/` foram preservados. A suíte foi executada sem editar seus arquivos.

### SHA-256 dos arquivos de produto

| Arquivo | SHA-256 |
|---|---|
| `scripts/preparar_dados.py` | `24B11E34A60C0143A3C2BB61BEF6E7B2C967DFADE678616A8A61648B36BB3233` |
| `site/index.html` | `7D2C64DA59F9F2E287A2945585675B09922142705BF9454AD7B8AAFE7B311EBA` |
| `site/styles.css` | `A09554E3E0532FBBFF48AE02E7D2EBE573EEF0B0610C455708237D30DEBC6D20` |
| `site/app.js` | `4A907C9E0532E0A64811D9F43085A253FAFAA3F0888D7E46BD7399F15877E43D` |
| `site/data/vendas.json` | `CBBBF4206F9A6CE935706E7FD7E410F7F552645F741A27B3D49B92505917A349` |
| `README.md` | `A1136DA3CD341F7E16A29DDD1501A6C2C0AC3464FD54F87088A073F5012EC011` |

## O que foi alterado

- `scripts/preparar_dados.py`: agora rejeita `quantidade` não inteira antes da conversão para `int`; mensagem de validação também especifica quantidade inteira positiva.
- `README.md`: documenta que a quantidade por venda é inteira positiva e inclui o comando executável da suíte, além do resultado real do Tester na rodada 01 (9 passaram; 2 verificações de navegador pendentes por falta de Playwright). O texto deixa claro que isso não representa aprovação completa.
- Nenhum arquivo em `tests/` foi editado. Relatórios de rodada 01 não foram alterados.

## Comandos e resultados

Executados na pasta `projeto-dashboard`:

1. `..\.venv\Scripts\python.exe scripts\preparar_dados.py` — **OK**; regenerou `site/data/vendas.json` com 180 vendas e total R$ 20.059,00.
2. Verificação temporária isolada com `.venv\Scripts\python.exe -` e uma linha sintética com quantidade `1.5`, preço `10` e valor `15` — **OK**; recebeu `ValueError: Quantidade deve ser um número inteiro.` e confirmou que nenhum JSON de saída foi criado. Arquivos temporários foram descartados; o CSV original não foi usado nem modificado nesse teste.
3. `..\.venv\Scripts\python.exe -m unittest discover -s tests -v` — `Ran 12 tests`; **10 passaram e 2 foram ignorados como PENDENTES**. O novo teste de regressão `test_fractional_quantity_is_rejected_instead_of_truncated` passou. Os dois testes Playwright foram ignorados porque Playwright não está instalado. Saída registrada pelo comando; detalhes de escopo dos testes de navegador em `relatorios/rodada-01/tester.md`.
4. `node --check site\app.js` — **OK**, sem erro de sintaxe.
5. Verificação independente e somente de leitura do CSV e JSON — **OK**: 180 linhas, IDs únicos, soma R$ 20.059,00, agregados por categoria iguais e identidades `quantidade × preco_unitario = valor_venda` conferidas. A suíte também aprovou o teste de preservação dos arquivos de origem.
6. SHA-256 calculados com `Get-FileHash -Algorithm SHA256`; valores acima.

## Pendências

- **PENDENTE — navegador/interação:** os dois testes Playwright continuam sem execução por falta do pacote. Filtros reais, teclado e responsividade não foram aprovados nesta rodada; ver encaminhamento do Tester em `relatorios/rodada-01/tester.md`. A interface não é declarada aprovada.
- **PENDENTE — Revisor/coordenador:** revisão independente final conforme o ciclo do projeto.
- Os arquivos locais `.agents/skills/explore-data/SKILL.md`, `.agents/skills/data-visualization/SKILL.md` e `.agents/skills/validate-data/SKILL.md` não existem neste workspace; não alego leitura desses caminhos.

## Status

**BLOQUEADO para aprovação conjunta.** A correção do Construtor foi validada e os dez testes executáveis passaram, mas as verificações reais de interação no navegador permanecem pendentes, assim como a revisão independente. Não se afirma aprovação da interface ou do projeto completo.
