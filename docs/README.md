# 📚 Church App Documentation

Welcome to the complete documentation for United with Christ through the Holy Spirit Church web application.

## 📋 Quick Navigation

### 🚀 **Getting Started**
- [**Database Setup Guide**](./SETUP.md) - Complete setup instructions for Vercel database and deployment
- [**Admin Guide**](./ADMIN_GUIDE.md) - How to access and use admin features

### 📖 **Documentation Index**

| Document | Purpose | For Who |
|----------|---------|---------|
| [**SETUP.md**](./SETUP.md) | Database setup, deployment, environment configuration | Developer/Admin |
| [**ADMIN_GUIDE.md**](./ADMIN_GUIDE.md) | Admin access, daily content management | Church Admin |

---

## 🏗️ **Project Overview**

### **Features**
- ✅ **Authentication System** - Secure JWT-based login for administrators
- ✅ **Daily Content Management** - Create, edit, and manage daily church content
- ✅ **Role-Based Access** - Admin, Pastor, and Member permissions
- ✅ **Responsive Design** - Works on desktop and mobile devices
- ✅ **Hidden Admin Access** - Secure, invisible admin controls

### **Technology Stack**
- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **Authentication**: JWT tokens, bcryptjs password hashing
- **Database**: Vercel Postgres with SQL arrays and JSONB
- **Deployment**: Vercel platform

### **Database Schema**
The application uses two main tables:
- **`users`** - Admin accounts with role-based permissions
- **`daily_content`** - Date-based church content (intercessor, verses, announcements, etc.)

---

## 🎯 **Quick Start Checklist**

### **For First-Time Setup:**
1. ☐ Read [SETUP.md](./SETUP.md) completely
2. ☐ Create Vercel Postgres database
3. ☐ Set environment variables
4. ☐ Run database schema SQL
5. ☐ Install dependencies (`npm install`)
6. ☐ Test application (`npm run dev`)

### **For Daily Usage:**
1. ☐ Read [ADMIN_GUIDE.md](./ADMIN_GUIDE.md)
2. ☐ Learn triple-click admin access
3. ☐ Practice adding/editing content
4. ☐ Understand security features

---

## 🔒 **Security Features**

### **Admin Access Protection**
- **Hidden Login**: Triple-click church logo to reveal admin access
- **No Visible Controls**: Regular visitors see no admin buttons
- **Secure Authentication**: JWT tokens with secure password hashing
- **Role-Based Permissions**: Only admins/pastors can modify content

### **User Registration Control**
- **Hidden Signup**: Double-click dots in login form to access registration
- **Prevents Unauthorized Access**: No public registration visible
- **Admin-Only Creation**: Only existing admins can create new users

---

## 📱 **User Experience**

### **For Regular Visitors:**
- View daily church content and announcements
- Access contact information and service times
- Browse church information and about page
- No admin controls visible for security

### **For Church Administrators:**
- Access hidden admin panel via secret method
- Create, edit, and delete daily content
- Manage church announcements and verses
- Full CRUD operations on all content

---

## 🛠️ **Development Notes**

### **File Structure**
```
church/
├── docs/                    # 📚 Documentation
│   ├── README.md           # This overview file
│   ├── SETUP.md            # Database & deployment setup
│   └── ADMIN_GUIDE.md      # Admin usage guide
├── src/
│   ├── app/api/auth/       # Authentication endpoints
│   ├── components/         # React components
│   ├── contexts/           # React context providers
│   └── lib/                # Database & utility functions
└── package.json            # Dependencies & scripts
```

### **Key Components**
- **`Navigation.tsx`** - Hidden admin access via triple-click
- **`Dashboard.tsx`** - Content management (admin-only controls)
- **`LoginForm.tsx`** - Admin authentication
- **`SignupForm.tsx`** - User registration (hidden)

### **API Endpoints**
- **`POST /api/auth/login`** - Admin authentication
- **`POST /api/auth/signup`** - User registration
- **`GET /api/daily-content`** - Fetch daily content
- **`POST /api/daily-content`** - Create/update content

---

## 📞 **Support**

### **For Technical Issues:**
- Check the troubleshooting sections in each guide
- Ensure all environment variables are set correctly
- Verify database connection and schema

### **For Usage Questions:**
- Refer to the [Admin Guide](./ADMIN_GUIDE.md) for step-by-step instructions
- Practice the admin access methods (triple-click, double-click)

---

## 🎉 **Congratulations!**

You now have a complete church management system with:
- ✅ Secure admin authentication
- ✅ Daily content management
- ✅ Professional church website
- ✅ Mobile-responsive design
- ✅ Database integration
- ✅ Production-ready deployment

**Next Steps:** Follow the [SETUP.md](./SETUP.md) guide to deploy your application!

---

*Built with ❤️ for United with Christ through the Holy Spirit Church*