# Church App Setup Guide

This guide will help you set up the church application with authentication and database functionality.

## 1. Vercel Postgres Database Setup

### Create Database on Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to your project
3. Go to the **Storage** tab
4. Click **Create Database** → **Postgres**
5. Choose your database name (e.g., `church-db`)
6. Select your region
7. Click **Create**

### Get Database Connection Details
1. In your Vercel dashboard, go to your database
2. Go to the **Settings** tab
3. Copy the connection details

### Set Environment Variables
Create a `.env.local` file in your project root and add:

```env
# Database
POSTGRES_URL="your-postgres-url"
POSTGRES_PRISMA_URL="your-postgres-prisma-url"
POSTGRES_URL_NO_SSL="your-postgres-url-no-ssl"
POSTGRES_URL_NON_POOLING="your-postgres-url-non-pooling"
POSTGRES_USER="your-username"
POSTGRES_HOST="your-host"
POSTGRES_PASSWORD="your-password"
POSTGRES_DATABASE="your-database"

# JWT Secret (change this to a secure random string in production)
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
```

## 2. Database Schema Setup

### Run the SQL Schema
1. Connect to your database (you can use the Vercel dashboard SQL editor)
2. Copy and paste the contents of `src/lib/database-schema.sql`
3. Execute the SQL to create all tables

### Create Admin User (Optional)
If you want to create an admin user manually:

```sql
-- Hash a password first (you can use an online bcrypt generator)
-- For password "admin123": $2b$12$LQv3c1yqBwlVHpPaQjcgeAOReqQ3rQ1Qx1k.FwrGKmxhW9H.Tt9Ny

INSERT INTO users (email, first_name, last_name, password_hash, role, is_verified)
VALUES ('admin@church.org', 'Admin', 'User', '$2b$12$LQv3c1yqBwlVHpPaQjcgeAOReqQ3rQ1Qx1k.FwrGKmxhW9H.Tt9Ny', 'admin', true);
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Run the Application

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

## 5. Features Overview

### Authentication
- **Sign Up**: Creates new user accounts with email, first name, last name, and password
- **Login**: Authenticates users with email and password
- **JWT Tokens**: Secure authentication with JSON Web Tokens
- **Role-based Access**: Admin, Pastor, and Member roles

### Daily Content Management
- **Date-based Content**: Each day can have one content entry
- **Content Fields**:
  - Opening Verse & Reference
  - Speaker
  - Vision
  - Message
  - Closing Prayer
  - Announcements
- **Permission System**: Only Admins and Pastors can create/edit content

### API Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

#### Daily Content
- `GET /api/daily-content?date=YYYY-MM-DD` - Get content for specific date
- `POST /api/daily-content` - Create/update daily content (requires authentication)

## 6. Database Tables

### Users Table
- Stores user accounts with authentication data
- Supports role-based permissions (admin, pastor, member)
- Tracks registration and login timestamps

### Daily Content Table
- One entry per date
- Stores all daily service information
- Tracks who created/updated the content

### User Sessions Table
- Manages JWT tokens and sessions
- Automatic cleanup of expired tokens

## 7. User Roles

### Member (Default)
- Can view daily content
- Can access dashboard

### Pastor
- All member permissions
- Can create and edit daily content

### Admin
- All pastor permissions
- Full system access
- User management capabilities

## 8. Development Notes

- The app uses Next.js 15 with TypeScript
- Authentication context provides user state management
- Tailwind CSS for styling
- Responsive design for mobile and desktop
- Error handling with user-friendly messages

## 9. Production Deployment

1. Push your code to GitHub
2. Connect your Vercel project to the repository
3. Set environment variables in Vercel dashboard
4. Deploy the application
5. Set up the database schema using Vercel's SQL editor

## 10. Security Considerations

- Change the JWT_SECRET in production
- Use environment variables for all secrets
- Password hashing with bcrypt
- Input validation on all endpoints
- SQL injection prevention with parameterized queries