# SM8 — Composição Musical Assistida por Inteligência Artificial

## Descrição do Projeto

Este projeto explora a **composição musical generativa** utilizando Inteligência Artificial em duas frentes: a criação de letras com **Gemini Gems** (técnica RAG) e a produção musical com **Suno AI**. O resultado é um EP completo com 5 faixas inéditas no estilo pagode, demonstrando como a IA pode atuar como co-autora criativa no processo musical.

---

## Metodologia

### Fase 1 — Curadoria
Seleção de 10 letras do artista de referência para construir a base de conhecimento do assistente personalizado (Gemini Gems).

### Fase 2 — Criação do Assistente com RAG
Usando a técnica de **RAG (Retrieval-Augmented Generation)**, foi criado um **Gemini Gem** especializado — um assistente que analisa o vocabulário, a métrica, as rimas e o estilo lírico do artista base, e usa esse conhecimento para gerar novas composições fiéis ao DNA musical do gênero.

🔗 **Assistente Gemini Gems:** [Acessar o Gem](https://gemini.google.com/gem/1djZzINQYU3xmTkJ-gMLZgzjFVog57Y9R?usp=sharing)

### Fase 3 — Engenharia de Prompt para Letras
Configuração das instruções do Gem para:
- Mimetizar o vocabulário e as expressões do gênero
- Respeitar a métrica e a estrutura de versos e refrões
- Manter a temática emocional do estilo (amor, saudade, celebração)

### Fase 4 — Produção Musical com Suno AI
As letras geradas foram inseridas no **Suno AI** com parâmetros de:
- Gênero musical: Pagode
- Ajuste de BPM e instrumentação
- Geração de áudio completo com voz e arranjo

---

## O EP — Faixas Geradas

| # | Título | Estilo | Ouça |
|---|---|---|---|
| 01 | Madrugada de Seresta | Pagode | [🎵 Ouvir](https://suno.com/s/IdJ7eQaTLuuR3SdX) |
| 02 | Espelho d'Água | Pagode | [🎵 Ouvir](https://suno.com/s/qwzKxL0Mdb3WkIsj) |
| 03 | Voz do Terreiro | Pagode | [🎵 Ouvir](https://suno.com/s/4o8ejJytd8r3tQAz) |
| 04 | Sinfonia da Paz | Pagode | [🎵 Ouvir](https://suno.com/s/oRUKGI0aonRPQkEw) |
| 05 | Recomeço no Pagode | Pagode | [🎵 Ouvir](https://suno.com/s/yZdH00mnPKxh6XV3) |

---

## Tecnologias Utilizadas

| Ferramenta | Função |
|---|---|
| **Gemini Gems** | Criação do assistente personalizado com base de conhecimento lírica (RAG) |
| **Suno AI** | Geração de áudio completo (voz, melodia, arranjo instrumental) |
| **GitHub** | Documentação e versionamento do projeto |

---

## Conceitos Aplicados

### RAG — Retrieval-Augmented Generation
Em vez de depender apenas do conhecimento geral do modelo, o Gem foi alimentado com exemplos reais e específicos do artista de referência. Isso permite que a IA gere conteúdo com muito mais aderência ao estilo desejado do que um prompt simples conseguiria.

### Prompt Engineering para Criatividade
A configuração do assistente exigiu atenção a:
- **Estrutura:** verso, pré-refrão, refrão, ponte
- **Vocabulário:** expressões típicas do gênero
- **Métrica:** sílabas por linha e esquema de rimas
- **Emoção:** tom e temática adequados ao pagode

---

## Competências Demonstradas

| Competência | Descrição |
|---|---|
| 🎵 Composição Assistida por IA | Uso de IA generativa para criação lírica e musical |
| 🧠 RAG | Implementação de Retrieval-Augmented Generation com Gemini Gems |
| 🎤 Produção Musical | Geração de áudio completo com Suno AI |
| ✍️ Prompt Engineering Criativo | Configuração de assistentes especializados em estilo musical |
| 📚 Curadoria de Dados | Seleção e organização de corpus para treinamento do assistente |

---

## Aprendizado Central

> A IA não substitui o músico — ela amplifica sua criatividade. Ao dominar técnicas como **RAG** e **engenharia de prompt**, é possível criar assistentes musicais especializados que entendem o estilo desejado e colaboram na geração de letras e arranjos com identidade própria. O papel do criador passa a ser o de **curador, diretor e parceiro** da IA no processo artístico.
