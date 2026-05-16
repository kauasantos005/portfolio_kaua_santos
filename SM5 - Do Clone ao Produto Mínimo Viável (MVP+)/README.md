# SM5 — Do Clone ao Produto Mínimo Viável (MVP+)

## Descrição do Projeto

**QR Procura** é uma aplicação web de geração de QR Codes personalizados, construída com **React**, **TypeScript**, **Firebase** e integração com a **API do Gemini**. O projeto representa a evolução de um clone para um MVP real — com autenticação, histórico em nuvem, geração assistida por IA e design profissional.

---

## Funcionalidades

### Tipos de QR Code Suportados
- 🔗 **URL** — Links para sites e páginas web
- 📶 **Wi-Fi** — Configuração de redes wireless com SSID e senha
- 💬 **WhatsApp** — Link direto para conversa com número personalizado

### Personalização Visual
- Tipos de pontos: rounded, square, classy, extra-rounded, dot
- Gradientes lineares e radiais com cores personalizáveis
- Cantos e bordas com estilos diferentes
- Upload de logo/imagem central no QR Code
- Presets prontos: **Cyberpunk**, **Minimal**, **Luxury**, **Vibrant**

### Geração Assistida por IA (Gemini)
- Sugestão automática de paletas de cores com base em texto descritivo
- Geração de configurações visuais via prompt em linguagem natural

### Autenticação e Persistência
- Login com **Google OAuth** via Firebase Auth
- Histórico de QR Codes salvos por usuário no **Firestore**
- Regras de segurança do Firestore por autenticação

### Exportação
- Download em **PNG** e **SVG**
- Tamanhos customizáveis

---

## Arquitetura Técnica

```
src/
  App.tsx         ← Componente principal com toda a lógica
  firebase.ts     ← Configuração Firebase (Auth + Firestore)
  main.tsx        ← Entrada da aplicação
  index.css       ← Estilos globais
```

---

## Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| **Frontend** | React 18 + TypeScript |
| **Build** | Vite |
| **Estilização** | CSS customizado + framer-motion |
| **QR Code** | qr-code-styling |
| **Animações** | Motion (Framer Motion) |
| **Backend/DB** | Firebase Firestore |
| **Autenticação** | Firebase Auth + Google OAuth |
| **IA** | Google Gemini API (@google/genai) |
| **Ícones** | Lucide React |

---

## Como Executar Localmente

**Pré-requisitos:** Node.js

```bash
# 1. Instale as dependências
npm install

# 2. Configure a chave da API do Gemini
# Adicione GEMINI_API_KEY no arquivo .env.local

# 3. Execute o projeto
npm run dev
```

---

## Conceito: Do Clone ao MVP+

Este projeto parte da lógica de **clonar para aprender** e avança para o estágio de **produto real com valor agregado**:

| Estágio | Descrição |
|---|---|
| 🔍 Clone | Reproduzir um gerador de QR básico para entender a mecânica |
| ⚙️ MVP | Adicionar autenticação, persistência e personalização |
| ✨ MVP+ | Integrar IA generativa para criar valor diferenciado e único |

---

## Arquivos do Projeto

| Arquivo/Pasta | Descrição |
|---|---|
| `src/App.tsx` | Componente principal — toda a lógica de geração e UI |
| `src/firebase.ts` | Integração com Firebase Auth e Firestore |
| `index.html` | HTML base da aplicação |
| `vite.config.ts` | Configuração do Vite |
| `firestore.rules` | Regras de segurança do banco de dados |
| `firebase-blueprint.json` | Blueprint da estrutura Firebase |
| `package.json` | Dependências do projeto |

---

## Competências Demonstradas

| Competência | Descrição |
|---|---|
| ⚛️ React + TypeScript | Desenvolvimento de SPA com tipagem forte |
| 🔥 Firebase | Auth, Firestore e regras de segurança |
| 🤖 Integração com IA | Uso da API Gemini para geração criativa |
| 🎨 Design de Produto | Interface com presets, gradientes e UX fluida |
| 🚀 MVP Thinking | Evolução progressiva de um clone para produto com valor real |

---

## Aprendizado Central

> A diferença entre um clone e um MVP está na **intenção e no valor agregado**. Clonar é o primeiro passo para aprender — mas o produto real nasce quando você adiciona algo que só você pensou, sejam as integrações, o design ou a inteligência que você embutiu nele.
