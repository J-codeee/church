# 🚀 Quick Reference Card

*Keep this handy for quick access to admin functions*

---

## 🔐 **Admin Access Secrets**

### **Login Access:**
```
Triple-click the church logo (✞ UCHSC) → Admin Login appears for 10 seconds
```

### **Signup Access:**
```
1. Open Admin Login form
2. Look for dots (••) at bottom
3. Double-click the dots → Switches to signup form
```

---

## 📝 **Daily Content Management**

### **When Logged In, You Can:**
- ✅ **Add New Post** - Button appears in dashboard
- ✅ **Edit Posts** - Edit button on each post
- ✅ **Delete Posts** - Delete button on each post

### **Content Fields Available:**
- **Date** - Select date for content
- **Intercessor** - Person leading prayers
- **Opening** - Opening verse references
- **Lessons** - Bible lesson references
- **Vision** - Vision/prophecy verses
- **Speaker** - Speaker verse references
- **Custom Sections** - Add your own sections
- **Notes** - Additional notes (optional)

---

## 🛠️ **Development Commands**

### **Local Development:**
```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
```

### **Database Setup:**
```bash
# 1. Create Vercel database
# 2. Set environment variables in .env.local
# 3. Run SQL schema from docs/SETUP.md
```

---

## 🌐 **Environment Variables**

### **Required in `.env.local`:**
```env
POSTGRES_URL="your-postgres-url"
POSTGRES_PRISMA_URL="your-postgres-prisma-url"
POSTGRES_URL_NO_SSL="your-postgres-url-no-ssl"
POSTGRES_URL_NON_POOLING="your-postgres-url-non-pooling"
JWT_SECRET="your-super-secret-jwt-key"
```

---

## 📊 **Database Tables**

### **Users Table:**
- Stores admin accounts
- Fields: email, firstName, lastName, role, passwordHash

### **Daily Content Table:**
- Stores daily church content by date
- Fields: date, intercessor, opening[], lessons[], vision[], speaker[], customSections, notes

---

## 🔍 **Troubleshooting**

### **Can't see Admin Login?**
→ **Triple-click faster** on the logo

### **Modal appears at top/cut off?**
→ **Fixed** with higher z-index and positioning

### **Can't access signup?**
→ **Double-click the dots** (`••`) in login form

### **Buttons not showing when logged in?**
→ **Refresh page** after login

---

## 📱 **Contact Information**

### **Church Details:**
- **Service**: Saturday 8:00 AM
- **Location**: Esperanza, Sison, Pangasinan
- **Phone**: 09260252017
- **Email**: jcohannzcordoviz76@gmail.com
- **Map**: https://maps.app.goo.gl/vabn1hDXqezC542HA

---

## ⚡ **Emergency Commands**

### **Reset Admin Access:**
```javascript
// In browser console (emergency only):
localStorage.removeItem('auth_token')
localStorage.removeItem('user_data')
// Then refresh page
```

### **Check if Logged In:**
```javascript
// In browser console:
console.log(localStorage.getItem('auth_token'))
```

---

*💡 **Pro Tip**: Bookmark this page for quick access to all admin functions!*