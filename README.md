# Tarefas+ (Next.js + Firebase)

Sistema moderno para organização de tarefas, anotações e comentários, com autenticação Google, visual animado e responsivo.

## ✨ Demonstração

![Demonstração do Layout](public/assets/hero.png)

## 🚀 Funcionalidades

- Cadastro e login com Google (NextAuth)
- Criação, listagem e exclusão de tarefas
- Tarefas públicas e privadas
- Compartilhamento de tarefas públicas por link
- Comentários em tarefas públicas
- Contador de tarefas e comentários na Home
- Layout moderno, responsivo e animado
- Paleta de cores personalizada (azul, ciano, branco)

## 🛠️ Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) (React + SSR/SSG)
- [Firebase Firestore](https://firebase.google.com/products/firestore) (banco de dados)
- [NextAuth.js](https://next-auth.js.org/) (autenticação Google)
- [React Icons](https://react-icons.github.io/react-icons/)
- CSS Modules + animações CSS
- TypeScript

## 🎨 Paleta de Cores

- Azul Primário: `#007FFF`
- Azul Claro: `#00b2fe`
- Azul Escuro: `#007cb2`
- Azul Pastel: `#bfecff`
- Azul Suave: `#80d9ff`

## 📱 Responsividade

- Layout adaptado para desktop, tablet e mobile
- Componentes flexíveis e responsivos
- Animações suaves e microinterações

## 🔒 Autenticação

- Login seguro via Google
- Painel pessoal para cada usuário
- Apenas usuários autenticados podem criar/excluir tarefas
- Tarefas públicas podem ser visualizadas/comentadas por qualquer pessoa

## 💻 Instalação e Uso Local

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/tarefas-plus.git
   cd tarefas-plus
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install
   ```
3. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env.local` com as chaves do Firebase e Google Auth:
     ```env
     NEXT_PUBLIC_URL=http://localhost:3000
     GOOGLE_CLIENTE_ID=SEU_CLIENT_ID
     GOOGLE_CLIENTE_SECRET=SEU_CLIENT_SECRET
     JWT_SECRET=UM_SEGREDO_FORTE
     ```
4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```
5. **Acesse:**
   - [http://localhost:3000](http://localhost:3000)

## 📝 Estrutura de Pastas

```
├── src/
│   ├── components/         # Componentes reutilizáveis (Header, Textarea)
│   ├── pages/              # Páginas Next.js (Home, Dashboard, Task)
│   ├── services/           # Conexão com Firebase
│   └── styles/             # Estilos globais e módulos CSS
├── public/                 # Imagens e assets
├── package.json            # Dependências e scripts
└── README.md
```