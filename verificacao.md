# Verificação da análise da papelaria

## Resultado

**Cálculos e código dos gráficos conferidos; sem divergências encontradas na cópia limpa.** A conferência usou somente os arquivos locais e `.venv/Scripts/python.exe`.

## Arquivos revisados

- `vendas_papelaria.csv` — origem, 182 linhas de dados; 180 IDs distintos.
- `papelaria_limpa.csv` — cópia tratada, 180 linhas; 180 `id_venda` distintos.
- `resumo.md` — descrição do tratamento e dos problemas encontrados.
- `graficos.py` — fonte usada para gerar os dois gráficos.

## Recálculo independente

Recalculei cada valor de venda como `quantidade × preco_unitario`, sem usar a coluna `valor_venda` como entrada do cálculo.

- **Vendas na cópia limpa:** 180 registros (180 IDs únicos). Isso é a contagem de vendas; a soma da coluna `quantidade` é **548 unidades**.
- **Total vendido na cópia limpa:** **R$ 20.059,00**. A soma da coluna `valor_venda` também é R$ 20.059,00, e não houve divergência em nenhuma linha.
- **Conferência da origem:** o total calculado diretamente nas 182 linhas originais é **R$ 20.066,00**. A diferença de **R$ 7,00** corresponde às duas duplicatas exatas excedentes (`V0010` e `V0020`), cada uma com valor de R$ 3,50.

### Reconciliação por categoria

| Categoria | Valor recalculado |
|---|---:|
| Acessórios | R$ 10.517,00 |
| Livros | R$ 7.438,00 |
| Papelaria | R$ 2.104,00 |
| **Soma das categorias** | **R$ 20.059,00** |

A soma por categoria coincide exatamente com o total vendido recalculado.

### Conferência adicional por cidade

| Cidade | Valor recalculado |
|---|---:|
| Campinas | R$ 8.578,00 |
| Santos | R$ 6.937,50 |
| Sorocaba | R$ 4.543,50 |
| **Soma das cidades** | **R$ 20.059,00** |

## Revisão de `graficos.py`

O script lê `papelaria_limpa.csv`, localizado na mesma pasta do próprio script; converte `valor_venda` para número e soma por `categoria` e `cidade`. Reexecutei-o com `.venv/Scripts/python.exe`; os totais impressos coincidiram com os recálculos acima e os gráficos foram gerados.

O código define o limite inferior dos eixos em zero, formata os valores em reais e inclui a observação de que valor vendido não representa lucro. Não encontrei uso do CSV original no código dos gráficos nem erro de agregação.

## Conclusões revisadas e ressalva

- A categoria com maior valor vendido é **Acessórios**; a cidade com maior valor é **Campinas**.
- Os valores representam a soma de `quantidade × preco_unitario` nas vendas deduplicadas, não lucro: custos e despesas não estão disponíveis nos arquivos conferidos.
- Esta validação confirma a consistência aritmética e a execução sobre os arquivos locais; não verifica se os preços e as quantidades da origem correspondem a registros externos ou a uma definição contábil de receita.
