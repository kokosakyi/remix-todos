# Remix Todos App

A full-stack todo application built with Remix, Prisma, and Supabase, ready for deployment on Netlify.

## 🚀 Features

- **Full-stack TypeScript** - Type-safe from database to UI
- **Remix Framework** - Modern web development with excellent UX
- **Prisma ORM** - Type-safe database access and migrations
- **Supabase PostgreSQL** - Scalable cloud database
- **Netlify Deployment** - Serverless functions and edge computing
- **Tailwind CSS** - Modern styling with utility classes
- **CRUD Operations** - Create, read, update, and delete todos
- **Responsive Design** - Works on desktop and mobile

## 📋 Prerequisites

- Node.js 20+
- npm or yarn
- Supabase account
- Netlify account (for deployment)

## 🛠️ Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory:

```bash
# Database Configuration (Supabase)
DATABASE_URL="postgresql://postgres.your-project-id:password@aws-0-region.pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres.your-project-id:password@aws-0-region.pooler.supabase.com:5432/postgres"

# Supabase Configuration
SUPABASE_URL="https://your-project-id.supabase.co"
SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_KEY="your-service-key"
```

### 2. Supabase Setup

1. Create a new project on [Supabase](https://supabase.com)
2. Go to **Settings > Database** and copy the connection strings
3. Go to **Settings > API** and copy the URL and keys
4. Replace the placeholder values in your `.env` file

### 3. Install Dependencies

```bash
npm install
```

### 4. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Apply database schema
npm run db:push

# Optional: Open Prisma Studio to view data
npm run db:studio
```

### 5. Development

```bash
npm run dev
```

Visit `http://localhost:5173` to see your app!

## 🚢 Deployment

### Netlify Deployment

1. **Connect Repository**

   - Push your code to GitHub/GitLab
   - Connect the repository to Netlify

2. **Configure Build Settings**

   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Environment Variables**

   - Go to Site settings > Environment variables
   - Add all variables from your `.env` file

4. **Deploy**
   - Your app will be available at `https://your-site-name.netlify.app`

### Manual Deployment

```bash
# Build the application
npm run build

# Deploy to Netlify CLI (optional)
npx netlify deploy --prod --dir=dist
```

## 📁 Project Structure

```
remix-todos/
├── app/
│   ├── lib/
│   │   └── db.server.ts      # Prisma client configuration
│   │   └── routes/
│   │   │   ├── _index.tsx        # Home page
│   │   │   └── todos.tsx         # Todos CRUD functionality
│   │   ├── entry.client.tsx      # Client entry point
│   │   ├── entry.server.tsx      # Server entry point
│   │   └── root.tsx              # App shell
│   ├── prisma/
│   │   └── schema.prisma         # Database schema
│   ├── public/                   # Static assets
│   ├── netlify.toml              # Netlify configuration
│   ├── package.json              # Dependencies and scripts
│   └── vite.config.ts            # Vite + Netlify configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript checks

## 🎯 Usage

1. **Create Todos** - Use the form to add new todos with title and description
2. **Mark Complete** - Click the "Complete" button to mark todos as done
3. **Delete Todos** - Click the "Delete" button to remove todos
4. **View History** - See creation dates and status of all todos

## 🔍 API Routes

The app uses Remix's file-based routing:

- `GET /todos` - Display todos page with all todos
- `POST /todos` - Handle todo operations (create, toggle, delete)

## 🛡️ Error Handling

- Database connection errors are handled gracefully
- Form validation ensures required fields
- User-friendly error messages for failed operations
- Optimistic UI updates with proper loading states

## 🧪 Database Schema

```prisma
model Todo {
  id          String   @id @default(cuid())
  title       String
  description String?
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("todos")
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning and development!

## 🔗 Links

- [Remix Documentation](https://remix.run/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
