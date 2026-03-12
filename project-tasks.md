# Project Tasks

## Processo Obrigatório
- Toda nova task iniciada deve ser adicionada imediatamente a este arquivo com descrição detalhada.
- Toda task deve ser marcada como concluída (- [x]) somente quando finalizada e validada (build/test/lint quando aplicável).
- A task "Migração completa do sistema" deve permanecer visível em "Tarefas Pendentes" e marcada como não realizada até execução futura.

## Tarefas Implementadas
- [x] Remoção completa de dependências do Supabase no runtime (imports/uso do client) e limpeza de integrações Supabase no código.
- [x] Refatoração para Firestore nas páginas do Migrante (sessões, ofertas de emprego e detalhe, visualizador de módulos e progresso).
- [x] Refatoração para Firestore nas páginas da Empresa (criar oferta, listar ofertas, listar candidaturas, perfil de candidato).
- [x] Refatoração para Firestore nas páginas do CPC (dashboard, agenda de equipa, gestão/edição de trilhas e módulos).
- [x] Remoção de variáveis de ambiente do Supabase do repositório (.env).
- [x] Remoção do pacote @supabase/supabase-js e atualização do lockfile via npm install.
- [x] Implementação de script de migração Supabase -> Firebase (Auth + Firestore) com suporte a dry-run e seleção de tabelas.
- [x] Adição de dependência firebase-admin para suportar migração via Admin SDK.
- [x] Validação pós-alterações: lint/test/build executados com sucesso.
- [x] Exibição de "Urgências" e "Interesses" (triagem) com textos amigáveis (PT-PT) na "Visão Geral" do dashboard do Migrante.
- [x] Visualização completa do card "Status Migratório" (perguntas + respostas) no perfil do Migrante, com mapeamento de opções para PT-PT e tratamento de não respondidos.
- [x] Binding e formatação (máscara de telefone e data DD/MM/AAAA) dos campos "Telefone", "Data de nascimento" e "Nacionalidade" no card "Perfil" (dashboard/migrante/perfil), com testes para cenários com/sem dados.
- [x] Exibição somente leitura (texto estático) de "Telefone", "Data de nascimento" e "Nacionalidade" no card "Perfil" (dashboard/migrante/perfil), recuperando os dados a partir da triagem inicial e formatando em máscara de país/DD/MM/AAAA.

## Tarefas Pendentes
- [ ] Migração completa do sistema
