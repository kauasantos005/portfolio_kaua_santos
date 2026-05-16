# SM7 — Desenvolvimento de App de Videoconferência com Manus AI e Jitsi

## Descrição do Projeto

**VetConnect** é um aplicativo mobile de **telemedicina veterinária** desenvolvido com **React Native + Expo**, integrando videochamadas via **Jitsi Meet** e gerado com auxílio da **Manus AI**. O projeto demonstra como ferramentas de IA podem acelerar o desenvolvimento de aplicativos nativos completos, desde a arquitetura até a implementação de fluxos clínicos reais.

🔗 **Preview gerado pela Manus AI:**
[manus.im/app-preview/Z5PhAsZ8kNeuXDUkYxw8Pk](https://manus.im/app-preview/Z5PhAsZ8kNeuXDUkYxw8Pk?sessionId=G03np5D5F0lJwRBgaDSOiz)

---

## Proposta de Valor

Levar um pet ao veterinário pode ser estressante, caro e demorado — especialmente para animais idosos, ansiosos ou tutores com mobilidade reduzida. O VetConnect elimina essa barreira ao oferecer **consultas veterinárias por videochamada**, com um fluxo clínico completo diretamente no celular.

| Diferencial | Descrição |
|---|---|
| 🎯 Fluxo clínico completo | Pré-consulta → Videochamada → Avaliação pós-consulta |
| 👤 Perfis distintos | Interface adaptada para Tutores e Veterinários |
| 💬 Chat integrado | Comunicação por texto durante a videochamada |
| ⭐ Avaliação pós-consulta | Sistema de feedback com estrelas e comentários |
| 📋 Formulário inteligente | Coleta nome, espécie, raça, idade e sintomas antes da consulta |
| 📳 Haptics nativos | Feedback tátil nas principais ações (Expo Haptics) |

---

## Telas do Aplicativo

1. **Onboarding** — Seleção de perfil: Tutor ou Veterinário
2. **Home** — Dashboard com próximas consultas e histórico
3. **Pré-Consulta** — Formulário com dados do pet e sintomas
4. **Sala de Consulta** — Videochamada Jitsi + Chat integrado + controles de áudio/vídeo
5. **Avaliação Pós-Consulta** — Estrelas (1–5) e campo de comentários
6. **Histórico de Consultas** *(em desenvolvimento)*
7. **Configurações** *(em desenvolvimento)*

---

## Stack Tecnológica

| Categoria | Tecnologia |
|---|---|
| **Framework Mobile** | React Native + Expo SDK 54 |
| **Roteamento** | Expo Router (file-based routing) |
| **Videochamada** | Jitsi Meet (integração via WebView/SDK) |
| **Estilização** | NativeWind (Tailwind CSS para React Native) |
| **Linguagem** | TypeScript |
| **Backend/API** | tRPC + Express |
| **Banco de Dados** | Drizzle ORM + MySQL |
| **Autenticação** | OAuth 2.0 (PKCE) com JOSE |
| **Estado/Cache** | TanStack React Query |
| **IA Assistida** | Manus AI (geração e estruturação do código) |
| **Build/Deploy** | pnpm + EAS Build (Expo Application Services) |

---

## Arquitetura do Projeto

```
app/            ← Telas do app (Expo Router)
components/     ← Componentes reutilizáveis de UI
server/         ← Backend tRPC + Express
drizzle/        ← Schema e migrations do banco de dados
hooks/          ← Hooks customizados (auth, cores, etc.)
lib/            ← Utilitários, cliente tRPC, auth context
shared/         ← Tipos e constantes compartilhados
constants/      ← Tema, OAuth, constantes gerais
assets/         ← Imagens e ícones do app
```

---

## Design System

- **Cor primária:** `#1B6B47` (Verde Floresta)
- **Cor de sucesso:** `#22C55E` (Verde)
- **Erro:** `#EF4444` (Vermelho)
- **Estilo:** Médico/Clean — interface limpa, profissional, com espaçamento generoso
- **Tipografia:** Headings em Bold (700), Body em Regular (400)

---

## Como Executar

**Pré-requisitos:** Node.js 18+, pnpm, Expo Go ou emulador, MySQL

```bash
# Clone e instale
git clone <repo>
cd vetconnect-app
pnpm install

# Configure .env com DATABASE_URL e OAuth

# Inicialize o banco
pnpm db:push

# Execute em desenvolvimento
pnpm dev
```

---

## Competências Demonstradas

| Competência | Descrição |
|---|---|
| 📱 React Native + Expo | Desenvolvimento de app mobile multiplataforma |
| 🎥 Jitsi Meet | Integração de videochamada em tempo real |
| 🤖 Manus AI | Uso de IA para acelerar o desenvolvimento de software |
| 🏗️ Arquitetura Full-Stack | Backend tRPC, banco relacional, autenticação OAuth |
| 🎨 Design System | Identidade visual coesa e sistema de componentes |
| ⚡ Prompt Engineering | Geração de código estruturado via IA com prompts precisos |

---

## Aprendizado Central

> O VetConnect mostra que com **Manus AI** é possível construir aplicativos mobile completos — com autenticação, banco de dados, videochamada e design system — de forma muito mais rápida do que o desenvolvimento tradicional. O diferencial do desenvolvedor passa a ser a **visão do produto** e a capacidade de **orquestrar as ferramentas certas** para transformar uma ideia em realidade.
