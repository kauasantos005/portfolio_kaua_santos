# VetConnect - Design System

## Brand Identity

**Color Palette:**
- Primary: #1B6B47 (Verde Floresta)
- Secondary: #F5F5F5 (Cinza Claro)
- Accent: #22C55E (Verde Sucesso)
- Error: #EF4444 (Vermelho)
- Text Primary: #11181C (Quase Preto)
- Text Secondary: #687076 (Cinza Médio)
- Background: #FFFFFF (Branco)
- Surface: #F5F5F5 (Cinza Claro)

**Typography:**
- Headings: Bold (font-weight: 700)
- Body: Regular (font-weight: 400)
- Buttons: Bold (font-weight: 600)

**Style:** Médico/Clean - Interface limpa, profissional, com espaçamento generoso e ícones simples

---

## Screen List

1. **Splash Screen** - Logo e branding inicial
2. **Onboarding Screen** - Seleção de perfil (Tutor / Veterinário)
3. **Home Screen** - Dashboard principal (próximas consultas, histórico)
4. **Pre-Consultation Form** - Formulário com dados do pet e sintomas
5. **Consultation Room** - Videochamada Jitsi + Chat integrado
6. **Post-Consultation Rating** - Avaliação com estrelas e comentários
7. **Consultation History** - Histórico de consultas realizadas
8. **Settings Screen** - Configurações do app

---

## Screen Details

### 1. Onboarding Screen
**Content:**
- Logo VetConnect (topo)
- Título: "Bem-vindo ao VetConnect"
- Descrição: "Telemedicina veterinária ao seu alcance"
- Dois botões principais:
  - "Sou Tutor" (verde floresta)
  - "Sou Veterinário" (verde floresta, outline)

**Functionality:**
- Salvar perfil selecionado em AsyncStorage
- Navegar para Home Screen

---

### 2. Pre-Consultation Form
**Content:**
- Campo: Nome do Pet (texto)
- Campo: Espécie (dropdown: Cão, Gato, Pássaro, Coelho, Outro)
- Campo: Raça (texto)
- Campo: Idade (número)
- Campo: Sintomas (textarea com placeholder)
- Botão: "Iniciar Consulta" (verde floresta)

**Functionality:**
- Validação de campos obrigatórios
- Salvar dados em AsyncStorage
- Navegar para Consultation Room

---

### 3. Consultation Room
**Content:**
- Videochamada Jitsi (70% da tela)
- Chat integrado (30% da tela, lado direito)
- Botões de controle:
  - Mute/Unmute
  - Camera On/Off
  - End Call (vermelho)

**Functionality:**
- Integração com Jitsi Meet
- Chat em tempo real
- Controles de áudio/vídeo
- Finalizar consulta com transição para avaliação

---

### 4. Post-Consultation Rating
**Content:**
- Título: "Como foi sua consulta?"
- Estrelas (1-5) para avaliação
- Campo: Comentários (textarea)
- Botões: "Enviar Avaliação" e "Pular"

**Functionality:**
- Salvar avaliação em AsyncStorage
- Navegar para Home Screen
- Mostrar mensagem de sucesso

---

## Key User Flows

### Flow 1: Tutor iniciando consulta
1. Abre app → Onboarding
2. Seleciona "Sou Tutor"
3. Vai para Home
4. Clica "Nova Consulta"
5. Preenche formulário pré-consulta
6. Entra na sala de videochamada
7. Consulta com veterinário
8. Avalia consulta
9. Volta para Home

### Flow 2: Veterinário recebendo consulta
1. Abre app → Onboarding
2. Seleciona "Sou Veterinário"
3. Vai para Home (lista de consultas agendadas)
4. Clica em consulta
5. Entra na sala de videochamada
6. Consulta com tutor
7. Finaliza consulta

---

## Design Tokens

| Element | Style |
|---------|-------|
| Primary Button | Verde Floresta (#1B6B47), texto branco, padding 12px 24px, border-radius 8px |
| Secondary Button | Outline verde, texto verde, padding 12px 24px, border-radius 8px |
| Input Fields | Border cinza claro, padding 12px, border-radius 6px, font-size 16px |
| Cards | Background branco, shadow leve, border-radius 12px, padding 16px |
| Text Headings | 24px, bold, cor primária |
| Text Body | 16px, regular, cor secundária |
| Spacing | 8px, 12px, 16px, 24px, 32px (múltiplos de 4) |

---

## Interaction Patterns

- **Press Feedback:** Opacity 0.8 ao pressionar botões
- **Loading:** Spinner verde floresta
- **Success:** Ícone de checkmark verde
- **Error:** Ícone de X vermelho com mensagem
- **Haptics:** Feedback tátil em ações principais (consulta iniciada, avaliação enviada)

---

## Accessibility

- Contraste mínimo 4.5:1 para texto
- Tamanho mínimo de botões: 44x44pt
- Labels descritivas para campos
- Suporte a leitura de tela (VoiceOver/TalkBack)
