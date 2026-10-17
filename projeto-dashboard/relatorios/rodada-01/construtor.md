# Relatório do Construtor — rodada 01

## Versão examinada

Sem repositório Git/commit. SHA-256 dos arquivos principais:

| Arquivo | SHA-256 |
|---|---|
| `scripts/preparar_dados.py` | `87E691AC13398098C4F94AA1E8C48A990BC6701424B706A67FA7F1AF54CFDD27` |
| `site/index.html` | `7D2C64DA59F9F2E287A2945585675B09922142705BF9454AD7B8AAFE7B311EBA` |
| `site/styles.css` | `A09554E3E0532FBBFF48AE02E7D2EBE573EEF0B0610C455708237D30DEBC6D20` |
| `site/app.js` | `4A907C9E0532E0A64811D9F43085A253FAFAA3F0888D7E46BD7399F15877E43D` |
| `site/data/vendas.json` | `CBBBF4206F9A6CE935706E7FD7E410F7F552645F741A27B3D49B92505917A349` |
| `README.md` | `F9452511362284427C2E0F088D8A875CEB2F542D40614B0D62602D89E1DD3473` |

## Entrega construída

- `scripts/preparar_dados.py` usa pandas para ler e validar `papelaria_limpa.csv` (um nível acima), e gerar `site/data/vendas.json`. Não modifica os CSVs nem remove registros; verifica esquema, ausências, unicidade do ID, tipos e a identidade `quantidade × preco_unitario = valor_venda`.
- Site estático em `site/` com indicadores de valor total vendido, quantidade de vendas por registro/ID e ticket médio; gráficos de valor vendido por categoria e cidade; tabela detalhada; filtros combináveis de cidade e categoria; botão para limpar, mensagem de seleção vazia, formatação pt-BR e layout responsivo/acessível.
- `README.md` documenta granularidade, tratamentos recebidos, campo calculado, limitações, preparo, comando previsto para a suíte do Tester e servidor HTTP local. `site/` é a pasta publicável.
- `vendas_papelaria.csv`, `papelaria_limpa.csv`, `resumo.md`, `verificacao.md`, `graficos.py` e imagens preexistentes foram preservados.

## Comandos e evidências

Executado a partir de `projeto-dashboard`:

```powershell
..\.venv\Scripts\python.exe scripts\preparar_dados.py
```

Resultado: gerados 180 registros em `site/data/vendas.json`; soma informada pelo script: R$ 20.059,00. A primeira execução encontrou caractere de seta incompatível com a codificação cp1252 do terminal; substituído por texto ASCII e a execução seguinte terminou com sucesso.

Checagem pontual do JSON com Python: 180 registros, 180 IDs únicos, total 20.059,00 e datas de 2026-01-01 a 2026-03-31.

Verificações técnicas pontuais: `node --check site\app.js` terminou sem erro; servidor `http.server` retornou HTTP 200 para `/` e `/data/vendas.json`. Evidência estática: `site/` e seus recursos citados acima. Não foi executado navegador automatizado.

## Pendências e encaminhamento

- **PENDENTE — Tester:** construir/executar sua suíte independente, incluindo recálculos e exemplo conhecido, filtros individual/combinado/vazio/limpar, integridade dos dados, execução HTTP e comportamento real em navegador, responsividade e teclado. Devolver falhas de produto ao Construtor. O comando documentado para a suíte é `..\.venv\Scripts\python.exe -m unittest discover -s tests -v`, após entrega dos testes em `tests/`.
- **PENDENTE — Revisor:** revisão independente de produto e evidências após a etapa do Tester. Nenhuma revisão independente é alegada neste relatório.
- Os arquivos locais obrigatórios em `.agents/skills/explore-data/SKILL.md`, `.agents/skills/data-visualization/SKILL.md` e `.agents/skills/validate-data/SKILL.md` não foram encontrados. Não alego leitura/uso desses arquivos; os documentos de contexto `resumo.md` e `verificacao.md` foram lidos.
- A checagem de HTTP foi um smoke test do Construtor, não substitui os testes obrigatórios do Tester nem os testes em navegador.

## Status na entrega inicial

**APROVADO — entrega inicial do Construtor.** Isso registra somente a avaliação feita na entrega original; não equivale à aprovação conjunta do projeto nem à auditoria abaixo.

---

## Aditivo de auditoria do Construtor — rodada 01

### Versão examinada

Sem repositório Git/commit. Recalculados nesta auditoria os hashes SHA-256 dos seis arquivos de produto listados acima; todos coincidem com os valores da seção “Versão examinada”. Nenhum arquivo do produto ou dos testes foi alterado.

### O que foi conferido e evidências

- Inspecionados o script de preparação, HTML, CSS, JavaScript, JSON preparado e README.
- Comando `node --check site\app.js`: terminou sem erro.
- Verificação independente e somente de leitura com `.venv\Scripts\python.exe -c ...`: comparou CSV e JSON, conferiu 180 linhas/IDs únicos, soma de R$ 20.059,00, agregados por categoria e a igualdade quantidade × preço = valor em todos os registros; **OK**. O comando não escreveu arquivos.
- Arquivos de produto e hashes atuais:

| Arquivo | SHA-256 |
|---|---|
| `scripts/preparar_dados.py` | `87E691AC13398098C4F94AA1E8C48A990BC6701424B706A67FA7F1AF54CFDD27` |
| `site/index.html` | `7D2C64DA59F9F2E287A2945585675B09922142705BF9454AD7B8AAFE7B311EBA` |
| `site/styles.css` | `A09554E3E0532FBBFF48AE02E7D2EBE573EEF0B0610C455708237D30DEBC6D20` |
| `site/app.js` | `4A907C9E0532E0A64811D9F43085A253FAFAA3F0888D7E46BD7399F15877E43D` |
| `site/data/vendas.json` | `CBBBF4206F9A6CE935706E7FD7E410F7F552645F741A27B3D49B92505917A349` |
| `README.md` | `F9452511362284427C2E0F088D8A875CEB2F542D40614B0D62602D89E1DD3473` |

### Problemas e encaminhamento

1. **Defeito de integridade no script — encaminhar ao Construtor para correção.** `preparar_dados.py` aceita quantidades numéricas fracionárias na validação e depois as converte para `int`. Exemplo reproduzível: uma linha com quantidade `1.5`, preço `10` e valor `15` passa pelas validações atuais (incluindo a identidade do valor), mas é exportada como quantidade `1` e valor `15`. Validar que quantidade é inteira antes da conversão; manter o teste correspondente na suíte do Tester. Não reproduzi alterando o CSV nem executando o script, pois isso sobrescreveria o JSON de produto.
2. **README desatualizado — encaminhar ao coordenador/construtor após a execução da suíte.** A linha 23 afirma que os testes independentes ainda não foram entregues, mas `tests/` agora contém três módulos. Atualizar para descrever o estado real da suíte; não afirmar sucesso antes do relatório do Tester.
3. A suíte não foi executada nesta auditoria para evitar disputa com o Tester, que está trabalhando exclusivamente nos testes. O coordenador registrou anteriormente que a versão existente falhou ao carregar `test_site_contract.py` por `IndentationError`. Testes de interação em navegador, responsividade e teclado continuam **PENDENTES** até evidência do Tester.
4. Os caminhos locais `.agents/skills/explore-data/SKILL.md`, `.agents/skills/data-visualization/SKILL.md` e `.agents/skills/validate-data/SKILL.md` não existem neste workspace. As skills disponíveis na sessão não substituem a leitura desses caminhos; não alego que os li.

### Status desta auditoria

**REPROVADO — individual do Construtor.** A versão atual contém a possibilidade de truncamento silencioso de quantidades fracionárias e documentação de testes desatualizada. O total e os agrupamentos dos dados atuais conferem, mas a aprovação conjunta, os testes da suíte, os testes de navegador e a revisão independente continuam pendentes.
