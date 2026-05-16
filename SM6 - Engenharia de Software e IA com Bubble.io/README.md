# SM6 — Engenharia de Software e IA com Bubble.io

## Descrição do Projeto

O projeto **OrcaManager** é um sistema completo de **Gestão de Orçamentos** desenvolvido sem código usando a plataforma **Bubble.io**, com arquitetura orientada a papéis de usuário (RBAC) e fluxos de aprovação. O projeto demonstra como a combinação de **IA generativa de prompts** e **plataformas No-Code** permite criar software funcional e profissional com agilidade.

🔗 **Acesse o projeto:** [orcamanager.bubbleapps.io](https://orcamanager.bubbleapps.io/version-test/?debug_mode=true)

---

## Funcionalidades do Sistema

### Controle de Acesso por Perfil (RBAC)

| Perfil | Permissões |
|---|---|
| **Administrador** | Acesso total — gerencia usuários, papéis e configurações |
| **Gestor** | Aprova ou rejeita orçamentos atribuídos |
| **Colaborador** | Cria seus próprios orçamentos |
| **Cliente** | Visualiza orçamentos criados para ele |

### Páginas do Sistema

1. **Login / Cadastro** — com redirecionamento automático por perfil
2. **Dashboard** — cards de resumo e orçamentos recentes
3. **Lista de Orçamentos** — filtros por status, data e cliente
4. **Novo Orçamento** — formulário com itens dinâmicos e cálculo automático do total
5. **Detalhe do Orçamento** — botões de aprovação/rejeição (apenas Gestores)
6. **Lista de Clientes** — acesso restrito a Admin e Gestor
7. **Painel Administrativo** — gerenciamento de papéis de usuários

---

## Arquitetura de Dados

### Tabelas Principais

| Tabela | Campos |
|---|---|
| **User** | nome, email, papel, empresa, data de criação |
| **Client** | nome, email, telefone, empresa, criado por (User) |
| **Budget** | título, descrição, cliente, criado por, gestor responsável, status, valor total, validade, motivo de rejeição |
| **BudgetItem** | orçamento (Budget), descrição, quantidade, preço unitário, preço total |

### Regras de Negócio

- Nenhuma tabela é visível publicamente
- Status dos orçamentos gerenciados via **Option Sets**: Pendente, Em Análise, Aprovado, Rejeitado, Cancelado
- Papéis de usuário também gerenciados via **Option Sets** (sem texto fixo no código)
- Todas as buscas no banco ocorrem no nível dos **Repeating Groups**

---

## Prompt de Criação Utilizado

O sistema foi gerado a partir de um prompt estruturado em inglês, contendo:
- Definição do produto e seus 4 perfis de usuário
- Especificação completa das tabelas de dados e seus relacionamentos
- Descrição de cada página e suas funcionalidades
- Regras de privacidade e boas práticas de desenvolvimento No-Code

Esse processo demonstra como a **Engenharia de Prompt aplicada ao No-Code** é capaz de gerar sistemas complexos de forma rápida e reproduzível.

---

## Arquivos do Projeto

| Arquivo | Descrição |
|---|---|
| `Engenharia de Software e IA com Bubble.io.txt` | Prompt completo utilizado para criação do OrcaManager |
| `estrategia_de_saida_bubble.pdf` | Estratégia de saída e evolução do produto além do Bubble.io |
| `Capturas de tela (PDFs)` | Registros visuais das telas do sistema desenvolvido |

---

## Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| **Bubble.io** | Plataforma No-Code para desenvolvimento visual |
| **RBAC** | Role-Based Access Control para gestão de permissões |
| **Option Sets** | Gestão de enumerações sem hardcode |
| **Engenharia de Prompt** | Geração do sistema a partir de prompts estruturados |
| **IA Generativa** | Aceleração do desenvolvimento com assistência de LLMs |

---

## Competências Demonstradas

| Competência | Descrição |
|---|---|
| 🏗️ Arquitetura de Software | Modelagem de dados relacionais e fluxos de aprovação |
| 🔐 Controle de Acesso | Implementação de RBAC com 4 níveis de permissão |
| 🧠 Prompt Engineering | Criação de prompt estruturado para geração de sistema completo |
| ⚡ No-Code | Desenvolvimento visual de software funcional sem escrever código |
| 📊 UX/UI | Design de dashboards, formulários dinâmicos e filtros |

---

## Aprendizado Central

> O futuro do desenvolvimento de software não é só escrever código — é **saber o que construir, como descrever e quais ferramentas usar**. O Bubble.io com IA mostra que a barreira técnica está caindo, e o diferencial passa a ser a capacidade de **arquitetar soluções**, não apenas implementá-las.
