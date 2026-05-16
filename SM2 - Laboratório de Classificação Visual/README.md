# SM2 — Laboratório de Classificação Visual

## Descrição do Projeto

O **Laboratório de Classificação Visual** é um experimento prático com **aprendizado de máquina supervisionado** utilizando a plataforma **Teachable Machine** do Google. O projeto investiga como a qualidade e a diversidade dos dados de treinamento impactam diretamente o desempenho e a equidade de modelos de classificação de imagens.

---

## O Experimento

O estudante treinou um modelo de visão computacional com apenas **20 fotografias**, propositalmente poucos exemplos, para observar e documentar os efeitos do **viés de dados** na classificação de imagens de pessoas com diferentes tipos de cabelo (liso e cacheado).

### Resultado Observado

| Sujeito | Classificação | Confiança |
|---|---|---|
| Sujeito A | Liso | 99% |
| Sujeito B | Cacheado | 78% / Liso 22% |

A incerteza de 22% no segundo sujeito evidencia como um dataset restrito **corrompe o aprendizado** e gera uma visão distorcida da realidade — especialmente quando se trata de características físicas diversas.

---

## Análise Crítica

### O Problema do Viés de Dados

Quando um modelo é treinado com poucos exemplos e baixa diversidade, ele não aprende a generalizar — aprende padrões muito fechados. No contexto do experimento:

- A máquina **não compreende misturas** ou gradações
- Características que fogem do padrão dominante são classificadas com menor confiança
- Pessoas com cabelos de textura intermediária ou mista são **invisibilizadas digitalmente**

### Impacto Humano

Esta falha técnica não é apenas um erro estatístico — ela tem **consequências reais**:

- **Emocional:** pessoas que se sentem "fora do padrão" do sistema
- **Profissional:** bloqueios em tecnologias de reconhecimento facial e seleção automatizada
- **Social:** reforço de preconceitos por meio de algoritmos

---

## Solução: Human-in-the-Loop

Para corrigir o viés identificado, o projeto propõe a estratégia de **Human-in-the-Loop (HITL)**:

1. Um humano analisa os resultados do modelo e identifica os erros
2. Novas imagens representando características diversas são adicionadas ao dataset
3. O modelo é retreinado com a curadoria ampliada
4. O ciclo se repete até que o modelo alcance equidade nas classificações

> Em vez de deixar a máquina decidir sozinha, a supervisão humana garante que o modelo respeite a diversidade e promova equidade antes de ser lançado ao público.

---

## Competências Demonstradas

| Competência | Descrição |
|---|---|
| 🤖 Machine Learning | Treinamento de modelo de classificação com Teachable Machine |
| 📊 Análise de Dados | Interpretação dos resultados e identificação de viés |
| ⚖️ Ética em IA | Reflexão crítica sobre impacto social de algoritmos tendenciosos |
| 🔄 Human-in-the-Loop | Aplicação de estratégia de curadoria humana para correção de modelos |

---

## Arquivos do Projeto

| Arquivo | Descrição |
|---|---|
| `Laboratório de Classificação Visual.txt` | Análise e reflexão escrita sobre o experimento |
| `WhatsApp+Image+2026-03-09+at+21.34.pdf` | Registro visual do experimento realizado |

---

## Tecnologias Utilizadas

- **[Teachable Machine](https://teachablemachine.withgoogle.com/)** — Plataforma de treinamento de modelos de ML sem código
- **Visão Computacional** — Classificação de imagens por tipo de cabelo
- **Análise Crítica de IA** — Estudo de viés algorítmico e impacto social

---

## Aprendizado Central

> A diversidade dos dados não é apenas uma questão técnica — é uma questão de **justiça**. Um modelo de IA reflete os dados com que foi treinado. Se esses dados são limitados, o modelo será limitado. Se são excludentes, o modelo será excludente.
