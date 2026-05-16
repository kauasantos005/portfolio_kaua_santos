# SM3 — Batalha de Modelos & Engenharia de Prompt (XML)

> Experimento prático comparando a fidelidade de 7 LLMs a um prompt estruturado em XML para geração de página HTML Single Page.

---

## 📋 Sobre o Experimento

**Disciplina:** Engenharia de Prompt e Aplicações em IA  
**Atividade:** Experiência 3 — Batalha de Modelos  
**Tema da página gerada:** Blog/Revista Digital  
**Paleta:** Dark + Neon (`#00ffe0`)

O mesmo prompt XML foi submetido a 7 ferramentas de IA:  
`ChatGPT` · `Gemini` · `DeepSeek` · `Qwen` · `Grok` · `Maritaca` · `Claude`

A avaliação não considerou estética, mas sim **fidelidade às instruções XML**.

---

## 📁 Estrutura do Repositório

```
SM3 - Batalha de Modelos & Engenharia de Prompt (XML)/
├── index.html                        # Página HTML gerada pelo Claude
├── Batalha_Modelos_Preenchido.docx   # Quadro comparativo + Reflexão Crítica
└── README.md                         # Este arquivo
```

---

## 🧩 O Prompt XML Utilizado

```xml
<tarefa>
  <objetivo>Criar uma página HTML5 única com CSS3 interno (single page).</objetivo>
  <tema>Blog/Revista Digital</tema>
  <diretrizes_design>
    <layout>Responsivo e minimalista, com grid de 12 colunas
    e breakpoints em 768px e 1200px.</layout>
    <paleta_cores>
      <primaria>#080810</primaria>
      <secundaria>#e8e8f0</secundaria>
      <destaque>#00ffe0</destaque>
      <texto>#6b6b88</texto>
    </paleta_cores>
    <tipografia>
      <titulos>Sans-serif (Bebas Neue via Google Fonts)</titulos>
      <corpo>Serif (Lora via Google Fonts)</corpo>
    </tipografia>
  </diretrizes_design>
  <obrigatoriedades_tecnicas>
    <item>Menu de navegação funcional com âncoras suaves
    (scroll-behavior: smooth) para: Início, Sobre, Galeria e Contato.</item>
    <item>Seção de galeria com 6 cards de artigos fictícios,
    cada card com thumbnail placeholder, categoria, título e descrição.</item>
    <item>Rodapé com informações de contato simuladas: e-mail,
    LinkedIn e GitHub fictícios.</item>
    <item>Seção "Sobre" com manifesto editorial, parágrafo
    descritivo e estatísticas da revista.</item>
  </obrigatoriedades_tecnicas>
  <metrica_obrigatoria>
    Ao final da resposta, informe uma estimativa de quantos
    tokens foram gerados para este código.
  </metrica_obrigatoria>
</tarefa>
```

---

## 📊 Resultados — Resumo Comparativo

| Critério | GPT | Gemini | DeepSeek | Qwen | Grok | Maritaca | Claude |
|---|---|---|---|---|---|---|---|
| Precisão do prompt (XML) | Alta | Alta | Média | Alta | Alta | Média | **Alta** |
| Precisão do HTML | Alta | Alta | Alta | Média | Alta | Média | **Alta** |
| Criatividade no Conteúdo | Alta | Média | Média | Média | Alta | Baixa | **Alta** |
| Erros de Sintaxe (Bugs) | 0 | 1 | 2 | 2 | 1 | 3 | **0** |
| Tokens Estimados | ~2800 | ~3100 | ~2600 | ~2400 | ~3000 | ~1800 | **~3200** |

---

## 💡 Reflexão Crítica (Fink)

### 1. Qual modelo demonstrou maior compreensão da estrutura XML?
**GPT-4o e Claude** foram os que mais respeitaram todas as tags sem omissões. O Claude se destacou por código mais modular (CSS com variáveis, semântica HTML5) e por ser o único a fornecer a estimativa de tokens de forma proativa. Maritaca teve maior dificuldade com tags aninhadas.

### 2. Houve diferença significativa na verbosidade?
Sim — variação de **~78%** entre Maritaca (~1.800 tokens) e Claude (~3.200 tokens). Verbosidade maior correlacionou com maior fidelidade às diretrizes e código mais maintível, mas não é regra absoluta.

### 3. Qual ferramenta para cada contexto?
- **Prototipagem rápida →** DeepSeek ou Qwen: entrega funcional, menor custo de tokens, mais iterações por sessão.  
- **Código complexo / produção →** Claude ou GPT-4o: maior fidelidade a specs detalhadas, CSS modular, semântica correta e comportamento responsivo completo.

---

## 🛠️ Como Visualizar a Página

1. Clone ou baixe o repositório
2. Abra `index.html` diretamente no navegador — não requer servidor
3. Navegação por âncoras e responsividade funcionam sem dependências externas (apenas Google Fonts via CDN)

---

## 📄 Licença

Uso acadêmico. Conteúdo fictício gerado para fins de experimento educacional.
