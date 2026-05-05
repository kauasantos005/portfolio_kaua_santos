# 🐾 VetConnect — Telemedicina Veterinária

> Conectando tutores e veterinários em tempo real, com cuidado e tecnologia.

---

## 🔗 Link de Pré-visualização

**URL gerada pela Manus AI:**
> [https://manus.im/app-preview/Z5PhAsZ8kNeuXDUkYxw8Pk?sessionId=G03np5D5F0lJwRBgaDSOiz](https://manus.im/app-preview/Z5PhAsZ8kNeuXDUkYxw8Pk?sessionId=G03np5D5F0lJwRBgaDSOiz)

---

## 📱 QR Code

> Escaneie para abrir o preview do app no celular:

![QR Code VetConnect](./QR.png)

*Para gerar o QR Code via script incluso no projeto:*
```bash
pnpm qr
```

---

## 💡 Proposta de Valor

**Qual problema o VetConnect resolve?**

Levar um pet ao veterinário pode ser estressante, caro e demorado — especialmente para animais idosos, de comportamento ansioso ou tutores com mobilidade reduzida. O **VetConnect** elimina essa barreira ao oferecer **consultas veterinárias por videochamada**, com um fluxo clínico completo diretamente no celular.

**Por que este app é único?**

| Diferencial | Descrição |
|---|---|
| 🎯 Fluxo clínico completo | Pré-consulta → Videochamada → Avaliação, tudo num único app |
| 👤 Perfis distintos | Interface adaptada para Tutores e Veterinários |
| 💬 Chat integrado | Comunicação por texto durante a videochamada |
| ⭐ Avaliação pós-consulta | Sistema de feedback com estrelas e comentários |
| 📋 Formulário inteligente | Coleta nome, espécie, raça, idade e sintomas antes da consulta |
| 📳 Haptics nativos | Feedback tátil nas principais ações (Expo Haptics) |

---

## 🛠️ Tecnologias Utilizadas

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

## 📸 Capturas de Tela

### Telas do App

![Banner VetConnect](./screenshots_banner.png)

| Tela | Descrição |
|---|---|
| ![Onboarding](./screen_01_onboarding.png) | **Onboarding** — Seleção de perfil Tutor / Veterinário |
| ![Home](./screen_02_home.png) | **Home** — Dashboard com consultas e botão de nova consulta |
| ![Pré-Consulta](./screen_03_pre_consulta.png) | **Pré-Consulta** — Formulário com dados do pet e sintomas |
| ![Consulta](./screen_04_consulta.png) | **Consulta** — Videochamada Jitsi Meet + Chat integrado |
| ![Avaliação](./screen_05_avaliacao.png) | **Avaliação** — Sistema de estrelas pós-consulta |
---

## 🚀 Instruções de Instalação

### Pré-requisitos

- Node.js 18+ instalado
- pnpm instalado (`npm install -g pnpm`)
- Expo Go instalado no celular **OU** Android Studio/Xcode para emulador
- Banco de dados MySQL disponível

### 1. Clone o repositório

```bash
git clone https://github.com/SEU_USUARIO/vetconnect-app.git
cd vetconnect-app
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Banco de Dados
DATABASE_URL=mysql://usuario:senha@localhost:3306/vetconnect

# OAuth (se necessário)
OAUTH_CLIENT_ID=seu_client_id
OAUTH_CLIENT_SECRET=seu_client_secret

# Expo
EXPO_PORT=8081
```

### 4. Configure o banco de dados

```bash
pnpm db:push
```

### 5. Execute o projeto (desenvolvimento)

```bash
# Inicia servidor backend + app mobile simultaneamente
pnpm dev
```

Ou separadamente:

```bash
# Apenas o servidor backend
pnpm dev:server

# Apenas o app mobile
pnpm dev:metro
```

### 6. Abra no dispositivo

- **Expo Go (físico):** Escaneie o QR Code exibido no terminal com o app Expo Go
- **Android Emulator:** Pressione `a` no terminal
- **iOS Simulator:** Pressione `i` no terminal

### 7. (Opcional) Gerar QR Code para distribuição

```bash
pnpm qr
```

---

## 🏗️ Estrutura do Projeto

```
vetconnect-app/
├── app/                    # Telas do app (Expo Router)
│   ├── (tabs)/
│   │   ├── _layout.tsx     # Layout das abas
│   │   └── index.tsx       # Tela Home (Dashboard)
│   ├── onboarding.tsx      # Seleção de perfil (Tutor/Veterinário)
│   ├── pre-consultation.tsx # Formulário pré-consulta
│   ├── consultation.tsx    # Sala de videochamada + chat
│   ├── post-consultation.tsx # Avaliação pós-consulta
│   └── _layout.tsx         # Layout raiz
├── components/             # Componentes reutilizáveis
├── constants/              # Tema, cores, constantes
├── hooks/                  # Custom hooks
├── lib/                    # Utilitários e contextos
│   └── _core/              # Core gerado pela Manus AI
├── server/                 # Backend (tRPC + Express)
│   └── _core/              # Runtime e SDK da Manus AI
├── shared/                 # Tipos compartilhados front/back
├── drizzle/                # Schema e migrações do banco
├── scripts/                # Scripts auxiliares
├── design.md               # Sistema de design do app
└── package.json
```

---

## 🎨 Design System

**Paleta de Cores:**

| Token | Cor | Hex |
|---|---|---|
| Primary | Verde Floresta | `#1B6B47` |
| Success | Verde Sucesso | `#22C55E` |
| Error | Vermelho | `#EF4444` |
| Background | Branco | `#FFFFFF` |
| Surface | Cinza Claro | `#F5F5F5` |
| Foreground | Quase Preto | `#11181C` |
| Muted | Cinza Médio | `#687076` |

**Estilo:** Médico/Clean — Interface limpa, profissional, com tipografia bold e espaçamento generoso.

---

## 🤖 Sobre o Desenvolvimento com Manus AI

Este projeto foi desenvolvido com assistência da **Manus AI**, que gerou e estruturou:

- A arquitetura base do projeto (Expo + tRPC + Drizzle)
- Os componentes de tela completos (Onboarding, Pré-Consulta, Consulta, Pós-Consulta)
- O runtime core em `lib/_core/` e `server/_core/`
- O sistema de design e tokens de tema
- A integração de autenticação OAuth
- Os testes automatizados iniciais

O código reflete a estrutura e os padrões gerados/otimizados pela Manus AI para desenvolvimento Android com Expo.

---

## 📋 Checklist de Entrega

- [x] Código-Fonte organizado e documentado
- [x] Implementação Manus AI — estrutura gerada pela Manus AI refletida no código
- [x] Integração Jitsi Meet — tela de consulta com videochamada implementada
- [x] README.md profissional com todas as seções
- [ ] Link de Pré-visualização da Manus AI *(inserir URL)*
- [ ] QR Code da Manus AI *(inserir imagem)*
- [x] APK / Simulação funcional via Expo Go

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.

---

*Desenvolvido com 🐾 por [SEU NOME] — Atividade de Desenvolvimento Android com Manus AI e Jitsi Meet*
