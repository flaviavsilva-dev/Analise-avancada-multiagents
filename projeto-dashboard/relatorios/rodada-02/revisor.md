# Relatório do Revisor — rodada 02

## Versão examinada

Sem repositório Git/commit. SHA-256 calculados nesta auditoria; os hashes do produto e dos testes coincidem com os registrados pelo Construtor/Tester da rodada 02. Nenhum CSV, documentação anterior, arquivo de produto ou teste foi alterado. Foi criado somente este relatório.

| Arquivo | SHA-256 |
|---|---|
| `vendas_papelaria.csv` | `BF95B7609E30EB7E3E6A30CFC16E43D9FB5BDFC48A410E49148CCEB92E2494FF` |
| `papelaria_limpa.csv` | `E25B6C2CDF05A6492F6495A91F9384565629F26E1318039F75734DCD9856995D` |
| `resumo.md` | `C2B9F45465FF808C485BA4E4436B7517FF4B2387758A2F646CDC842C6D3C410B` |
| `verificacao.md` | `7191EE1A568838410799C827A7379EB3E07D340666C70DE6E483A844CB57A2F7` |
| `relatorios/rodada-01/construtor.md` | `A260187863E05AFA2D63E46317A549157A908C342607E3CEC83CC61D9F4D57CA` |
| `relatorios/rodada-01/tester.md` | `33E1F216969DD6F41BEFBF703316F92D49AD4CC6854382E28CB50A0EFC8D4305` |
| `relatorios/rodada-02/construtor.md` | `017F266BE22FBB662EAF068ABA89927A30A4BA3817C52F93B665029522A60E65` |
| `relatorios/rodada-02/tester.md` | `B57F2C6C7A01225AECE5626FCA2FCE4A16B4D6C2C9C75D7E5E0ED29BFE13E5A5` |
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

## O que foi revisado

- Conferi os CSVs original e limpo, `resumo.md`, `verificacao.md`, os relatórios das duas rodadas, o script de preparação, JSON, HTML/CSS/JS, README e todos os quatro módulos de teste.
- A documentação informa 182 linhas de origem e 180 após deduplicar somente duas ocorrências integralmente repetidas; registra a normalização de cidade/categoria, pagamentos vazios e `valor_venda = quantidade × preco_unitario`. A base limpa tem 180 IDs únicos e não introduz remoção adicional.
- A correção para quantidades fracionárias é coerente: o script rejeita `quantidade % 1 != 0` antes de converter para inteiro. O teste sintético usa quantidade 1,5 com preço 4 e total coerente 6, e confirma `ValueError` sem arquivo JSON de saída.
- Recalculei os totais diretamente do CSV com `Decimal`, sem usar `valor_venda` como entrada: 180 vendas, 548 unidades, R$ 20.059,00 total e média de R$ 111,4388… (R$ 111,44 formatados). Valores agrupados conferidos: categorias R$ 10.517,00, R$ 7.438,00 e R$ 2.104,00; cidades R$ 8.578,00, R$ 6.937,50 e R$ 4.543,50. Os grupos somam o total. O JSON corresponde linha a linha ao CSV limpo em ID, quantidade, preço e valor; exemplo conhecido V0001: 4 × R$ 42,00 = R$ 168,00. O caso manual pequeno do Tester (2 × 3,50 + 1 × 10 = 17; 3 unidades) também está incluído e passou na suíte.
- Revisei os filtros de cidade/categoria, atualizações conjuntas dos indicadores/gráficos/tabela, limpar filtros, seleção vazia e ticket zero, formatação pt-BR, textos alternativos acessíveis dos gráficos, labels dos filtros, foco/teclado e comportamento responsivo. O código usa `textContent` para inserir textos da base; a tabela tem cabeçalhos/caption e a mensagem vazia tem `role="status"`.
- A execução de navegador da rodada 02 foi reproduzida: Chrome headless via Playwright, carregamento HTTP dos arquivos, filtros individuais/combinados, limpar, estado vazio, teclado, legibilidade e viewports 390 px/1365 px. A requisição automática de `/favicon.ico` retorna 404; o HTML não referencia favicon e os recursos necessários retornam 200.

## Comandos executados e resultados

Executado na pasta `projeto-dashboard`:

```powershell
..\.venv\Scripts\python.exe -m unittest discover -s tests -v
```

Resultado desta revisão: `Ran 12 tests in 6.771s — OK`; 12 passaram, zero falhas e zero skips. Os dois testes reais Playwright/Chrome foram executados, não ignorados. Os logs dos servidores HTTP mostram 200 para HTML/CSS/JS/JSON; há somente o 404 do favicon não referenciado.

Recálculo e reconciliação independente, somente leitura, com `.venv\Scripts\python.exe -` a partir de `projeto-dashboard`: **OK** para contagem, unidades, soma, média, somas agrupadas, identidade aritmética e correspondência CSV→JSON. A suíte confere também os hashes dos CSVs contra os valores registrados em `test_source_contract.py`.

Os hashes acima foram obtidos com `Get-FileHash -Algorithm SHA256`. Nenhuma alteração em produto/testes foi feita durante a execução.

## Achados e encaminhamentos

1. **README desatualizado — encaminhar ao Construtor/coordenador.** `README.md:23` diz que o resultado registrado foi 11 testes, 9 passaram e 2 de navegador pendentes por falta de Playwright. Isso descreve a rodada 01, contradiz o resultado reproduzido de 12/12 na rodada 02 e afirma que Playwright não está instalado, apesar de estar disponível na `.venv` e ter executado os testes reais. Atualizar a referência para a evidência da rodada 02, sem transformar o resultado em aprovação conjunta. Depois da correção, conferir a documentação atualizada; como não altera código executável, não há teste de produto adicional indicado, mas a versão corrigida requer nova revisão documental.
2. **Skills locais ausentes — registrar como pendência processual para o coordenador.** Não existem `.agents/skills/explore-data/SKILL.md`, `.agents/skills/data-visualization/SKILL.md` nem `.agents/skills/validate-data/SKILL.md` neste workspace. Não alego uso/leitura dessas skills. A auditoria independente e os cálculos foram feitos diretamente, mas a ausência impede afirmar cumprimento integral do requisito de uso das skills; o status conjunto não deve ocultar essa limitação.
3. **Testes obrigatórios:** nenhum pendente nesta auditoria; a suíte completa e os testes de navegador foram efetivamente executados. Não identifiquei lacuna de cobertura que justifique acrescentar testes nesta rodada.

## Status

**REPROVADO — revisão independente da rodada 02.** Produto, cálculos e suíte foram aprovados nesta conferência, mas a versão não pode receber aprovação de revisão enquanto o README reportar incorretamente o estado dos testes. A aprovação conjunta também não deve ser declarada até corrigir/revisar a documentação e o coordenador decidir como tratar a ausência das três skills locais.
