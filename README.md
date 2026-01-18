# CheckFlow Pro

Sistema completo de gestão de checklists operacionais para restaurantes e estabelecimentos similares, construído com Next.js.

## Funcionalidades

- **12 Templates Pré-configurados**: De Área Externa até Documentações, cobrindo todos os aspectos operacionais
- **Gestão de Locais**: Adicione e gerencie múltiplas unidades
- **Sistema de Pontuação**: Avaliação automática com conformidade percentual
- **Interface Responsiva**: Funciona perfeitamente em desktop e mobile
- **Relatórios**: Histórico completo de inspeções realizadas
- **Configurações**: Personalize locais e veja estatísticas do sistema

## Templates Disponíveis

1. Área Externa / Entrada
2. Recepção / Salão / Caixa
3. Buffet
4. Banheiros
5. Cozinha
6. Câmaras Frias
7. Churrasqueira e Espeto
8. Estoque
9. Retaguarda e Funcionários
10. Depósito
11. Escritório
12. Documentações

## Tecnologias

- Next.js 16
- TypeScript
- Tailwind CSS
- Lucide React (ícones)
- ESLint

## Como executar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Estrutura do Projeto

- `src/app/page.tsx` - Sistema completo CheckFlow Pro
- Interfaces TypeScript definidas no próprio arquivo

## Funcionalidades do Sistema

- **Dashboard Inicial**: Visão geral com estatísticas e templates disponíveis
- **Novo Checklist**: Seleção de template e preenchimento das inspeções
- **Lista de Checklists**: Histórico de inspeções realizadas
- **Configurações**: Gerenciamento de locais e estatísticas

## Pontuação

Cada pergunta tem pontos atribuídos, e o sistema calcula automaticamente:
- Pontuação total possível
- Pontos alcançados
- Percentual de conformidade

## Dados

Os dados são armazenados localmente no navegador (localStorage), permitindo uso offline.
