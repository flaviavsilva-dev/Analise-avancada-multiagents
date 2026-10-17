# Relatório do Revisor — rodada 03 (final)

## Versão examinada

Sem repositório Git/commit. Hashes SHA-256 confirmados nesta revisão; os hashes de produto, CSVs e testes coincidem com os relatórios do Construtor/Tester da rodada 03.

| Arquivo | SHA-256 |
|---|---|
| `vendas_papelaria.csv` | `BF95B7609E30EB7E3E6A30CFC16E43D9FB5BDFC48A410E49148CCEB92E2494FF` |
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
| `relatorios/rodada-03/construtor.md` | `1662D278D7B970F6BB5E082BCD7A500D793FDBB4FE083562E59BA9C8FC5611C5` |
| `relatorios/rodada-03/tester.md` | `89ED1E15CD03ECB1E2C8F8CA5B01F5FE20D0E2F5CD0A08517D28E57D0602D20A` |

Os CSVs têm os mesmos hashes fixados na suíte e registrados pelo Tester; não foram modificados. O produto executável e os testes também permanecem nos hashes da versão já testada. Nesta rodada do Revisor, nenhum produto ou teste foi alterado; foi criado apenas este relatório.

## Revisão metodológica e cálculo

- Conferi os relatórios de Construtor/Tester das rodadas 02 e 03, README, script de preparação, dados JSON, HTML/CSS/JavaScript e quatro módulos de teste. A correção de quantidade fracionária permanece antes da conversão para inteiro, com teste sintético que exige rejeição sem gravar saída.
- Recalculei a partir de `papelaria_limpa.csv`, usando `Decimal` para preço e valor e sem usar `valor_venda` como entrada do cálculo. Resultado independente: **180 vendas/IDs únicos, 548 unidades, total de R$ 20.059,00 e ticket médio não arredondado de R$ 111,438888…**, apresentado como R$ 111,44.
- Agregações recalculadas: Acessórios R$ 10.517,00; Livros R$ 7.438,00; Papelaria R$ 2.104,00; Campinas R$ 8.578,00; Santos R$ 6.937,50; Sorocaba R$ 4.543,50. Cada conjunto soma R$ 20.059,00. Conferi a identidade quantidade × preço em cada linha e a correspondência CSV→JSON por ID/ordem, quantidade, preço e valor. Exemplo individual conferido: V0001, 4 × R$ 42,00 = R$ 168,00. O exemplo pequeno calculado manualmente (2 × R$ 3,50 + 1 × R$ 10,00 = R$ 17,00; 3 unidades) também passa no teste independente.
- As regras documentadas de tratamento permanecem compatíveis com os arquivos: duas duplicatas integrais excedentes removidas na cópia limpa anterior, ajuste de espaços/capitalização e pagamento vazio normalizado; a preparação deste dashboard valida e não deduplica registros adicionais.

## README e comandos

- A correção da rodada 03 está efetiva. `README.md` agora remete a `relatorios/rodada-02/tester.md` e afirma 12 testes, 12 passaram, sem skips/falhas. Essa afirmação corresponde ao relatório referenciado; o README também esclarece que o resultado da suíte isoladamente não equivale à aprovação conjunta. Portanto, **o achado de README da rodada 02 está resolvido e não é repetido como problema atual**.
- Os comandos estão coerentes com o layout: criação da `.venv` na pasta acima do projeto, instalação local de pandas/Playwright, comando de verificação com `channel='chrome'`, execução unittest e servidor HTTP com `site/` como raiz. O texto declara Chrome estável instalado como pré-requisito e orienta não baixar Chromium pelo Playwright; isso corresponde à automação da suíte.
- O Tester reporta ter verificado launcher/Python, dependências na `.venv`, lançamento de Chrome 155.0.8059.80, comandos de preparação/servidor e resultado 12/12. Não repetiu a criação de uma venv limpa sobre a existente para preservá-la; isso está explicitado no relatório e não contradiz o procedimento documentado. Nesta revisão executei novamente a suíte completa.

## Interface, cobertura e evidências

- Reexecutei, em `projeto-dashboard`:

  ```powershell
  ..\.venv\Scripts\python.exe -m unittest discover -s tests -v
  ```

  Resultado: **12 testes, 12 passaram, zero falhas e zero skips** (`Ran 12 tests in 6.614s — OK`). Ambos os testes Playwright reais executaram no Chrome. A suíte cobre preservação e contrato dos dados, limpeza/duplicatas, tipos/ausências, cálculo e exemplo conhecido, regressão fracionária, correspondência do dataset, sintaxe e recursos HTTP, e interação real.
- Evidência de navegador nesta execução: Chrome acessou HTML/CSS/JS/JSON com HTTP 200; testes validaram indicadores/gráficos/tabela, filtros individuais e combinados, limpar, seleção vazia/zero divisão, teclado, viewports 390 px e 1365 px, legibilidade/contraste e ausência de overflow horizontal/erros/requisições necessárias falhas. A requisição automática a `/favicon.ico` retorna 404, mas o HTML não referencia esse recurso e isso não falha os testes.
- A revisão do markup/estilos/scripts confirma rótulos associados aos filtros, foco visível, navegação por teclado, tabela com caption/cabeçalhos, status para estado vazio e nomes acessíveis nos gráficos. Formatação monetária/números é pt-BR. Os filtros atualizam indicadores, gráficos e tabela em conjunto; valor vendido não é rotulado como lucro.
- Recálculo independente, somente leitura, executado com `..\.venv\Scripts\python.exe -` em `projeto-dashboard`: **PASSOU**; saída confirmou 180 vendas, 548 unidades, total 20059.00, agregações e reconciliação CSV/JSON.
- Hashes confirmados com `Get-FileHash -Algorithm SHA256`; resultados acima. A execução da suíte e o recálculo não alteraram CSV, produto nem testes.

## Skills locais e encaminhamentos

- Confirmei que estes arquivos locais não existem: `.agents/skills/explore-data/SKILL.md`, `.agents/skills/data-visualization/SKILL.md` e `.agents/skills/validate-data/SKILL.md`. Não alego ter lido nem usado esses caminhos.
- O coordenador informou ter carregado e usado as skills correspondentes pelas ferramentas disponíveis (`explore-date`, `data-vizualization` e `validate-data`). Registro isso como informação do coordenador, distinta dos arquivos locais ausentes; não há encaminhamento para instalar/copiar os arquivos. A ausência local fica explicitamente registrada e, conforme a instrução, não é convertida em requisito adicional nem bloqueio por si só.
- Não encontrei falhas de produto, testes pendentes ou lacunas de cobertura que exijam encaminhamento nesta revisão. O relatório final conjunto continua a cargo do coordenador.

## Status

**APROVADO — revisão independente da versão final/rodada 03.** README corrigido e consistente com a evidência citada; hashes relevantes confirmados; cálculos reconciliados; suíte completa e interações reais de navegador passaram sem skips. A ausência dos três arquivos locais de skills foi informada, sem alegação de leitura/uso deles e sem inventar requisito de instalação.
