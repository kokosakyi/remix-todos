# Environment Setup - Supabase Database Connection

## 🚀 Quick Setup Guide

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Click **"New Project"**
3. Fill in details:
   - **Project Name**: `remix-todos`
   - **Database Password**: Create a strong password and **SAVE IT!**
   - **Region**: Choose closest to you
4. Click **"Create new project"** (takes 2-3 minutes)

### Step 2: Get Database Connection Strings

1. **Go to Settings > Database** in your Supabase dashboard
2. **Scroll to "Connection pooling"** section
3. **Mode**: Transaction
4. **Port**: 5432
5. **Copy the connection string** that looks like:
   ```
   postgresql://postgres.project:[YOUR-PASSWORD]@aws-region.pooler.supabase.com:5432/postgres
   ```

### Step 3: Get API Credentials

1. **Go to Settings > API**
2. **Copy these values**:
   - **Project URL**: `https://your-project.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **service_role key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## ⚙️ Environment Variables Setup

Create a `.env` file in your project root with these values:

```bash
# Database Configuration - Connection Pooling (for Prisma)
DATABASE_URL="postgresql://postgres.your-project:[YOUR-PASSWORD]@aws-region.pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=1"

# Database Configuration - Direct Connection (for migrations)
DIRECT_URL="postgresql://postgres.your-project:[YOUR-PASSWORD]@aws-region.pooler.supabase.com:5432/postgres"

# Supabase Configuration
SUPABASE_URL="https://your-project-id.supabase.co"
SUPABASE_ANON_KEY="your-anon-key-here"
SUPABASE_SERVICE_KEY="your-service-role-key-here"
```

### 🔄 Replace the placeholders:

- `your-project` → Your actual project reference from Supabase
- `[YOUR-PASSWORD]` → The database password you created
- `aws-region` → Your region (e.g., `us-east-1`, `eu-west-1`)
- `your-project-id` → Your project ID from the URL
- `your-anon-key-here` → The anon key from Settings > API
- `your-service-role-key-here` → The service role key from Settings > API

## 🗄️ Database Setup Commands

After creating your `.env` file:

```bash
# 1. Generate Prisma client
npm run db:generate

# 2. Push schema to Supabase (creates the todos table)
npm run db:push

# 3. Start development server
npm run dev
```

## ✅ Verification

1. Visit `http://localhost:5173/todos`
2. You should see the todos page without database errors
3. Try adding a todo to test the connection

## 🚀 Netlify Deployment

For deployment, add the same environment variables in your Netlify dashboard:

1. **Netlify Dashboard** → Your site → **Site settings** → **Environment variables**
2. **Add each variable** from your `.env` file
3. **Deploy** your site

## 🆘 Troubleshooting

**Connection Error?**

- Verify your DATABASE_URL has the correct password
- Check that your Supabase project is in "Active" status
- Ensure the region matches your project's region

**Migration Issues?**

```bash
# Reset and try again
npm run db:push
```

**Still having issues?**

- Check the Supabase dashboard for any project status issues
- Verify all environment variables are correctly copied
- Make sure there are no extra spaces in your `.env` file
