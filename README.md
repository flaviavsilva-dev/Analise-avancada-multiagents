# Relatórios, skills e dashboard da papelaria

Repositório com os relatórios de análise, o fluxo de trabalho multiagente, as skills usadas e o site estático do dashboard.

## Conteúdo

- `AGENTS.md`: instruções do fluxo de análise, construção, testes e revisão.
- `.opencode/skills/`: arquivos Markdown das skills de exploração, visualização e validação de dados.
- `resumo.md` e `verificacao.md`: documentação da análise anterior da papelaria.
- `projeto-dashboard/relatorios/`: histórico dos relatórios em Markdown, incluindo o status mais recente em `FINAL.md`.
- `projeto-dashboard/site/`: site estático preparado para publicação no Render.
- `render.yaml`: configuração do serviço estático do Render; publica `projeto-dashboard/site/` a partir da branch `main`.

## Escopo e privacidade

O `.venv`, os CSVs originais, scripts de análise, testes, caches e demais artefatos locais/pesados ficam fora do Git. O site inclui `projeto-dashboard/site/data/vendas.json`, com os 180 registros detalhados de vendas; esse arquivo será acessível publicamente no GitHub e no Render, conforme autorizado.

## Deploy no Render

No Render, crie um Blueprint a partir deste repositório e selecione a branch `main`; o `render.yaml` configura a publicação estática. O serviço usa `projeto-dashboard/site` como raiz pública e não precisa de banco de dados ou servidor de aplicação.

Consulte `projeto-dashboard/relatorios/FINAL.md` para o status e as limitações registradas; aprovações de rodadas anteriores não necessariamente se aplicam às alterações posteriores.
