# Tratamento de vendas_papelaria.csv

## Visão geral
- Arquivo original: `vendas_papelaria.csv` (preservado, sem alterações).
- Dimensão original: **182 linhas × 8 colunas**.
- Cópia tratada: `papelaria_limpa.csv`, com **180 linhas × 9 colunas** (inclui `valor_venda`).
- Granularidade informada: uma linha por venda; `id_venda` identifica a venda.

## Problemas encontrados no original
- **2 duplicatas exatas excedentes**, em 2 grupos: `V0010` (2 ocorrências), `V0020` (2 ocorrências).
- Os IDs repetidos correspondem somente às duplicatas exatas acima; não há registros com o mesmo `id_venda` e dados divergentes.
- **Espaços em cidade**: 6 valores tinham espaços no início/fim.
- **Categoria com capitalização inconsistente**: `acessórios` aparece 3 vezes; padronizada para `Acessórios`.
- **Pagamento vazio**: 4 linhas; convertido para `Não informado`.
- Datas: intervalo de 2026-01-01 a 2026-03-31; datas inválidas: 0.
- Campos vazios adicionais: nenhum (além de `forma_pagamento`). Valores numéricos inválidos ou não positivos em quantidade / negativos em preço: 0.

## Tratamento aplicado à cópia
- Removida apenas uma ocorrência repetida de cada linha integralmente idêntica; linhas com `id_venda` igual, mas dados diferentes, seriam preservadas.
- Removidos espaços apenas dos valores de `cidade`.
- Categorias padronizadas para `Livros`, `Papelaria` e `Acessórios` (ajuste de maiúsculas/minúsculas, sem alterar os demais campos).
- Pagamentos vazios substituídos por `Não informado`.
- Criada a coluna `valor_venda` como `quantidade × preco_unitario`, usando cálculo decimal.
- Codificação do arquivo de saída: UTF-8. Nenhuma integração com banco de dados foi usada.
