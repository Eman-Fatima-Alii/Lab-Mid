# 🍽️ COMSATS Cafeteria Management System - PRODUCTION READY

**A fully functional, professional, enterprise-grade cafeteria management system** with real backend, secure authentication, and comprehensive features.

![Status](https://img.shields.io/badge/status-production--ready-success)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ What's New - Production Upgrade!

Your app is now **100% production-ready** with:

✅ **Real Backend API** - Node.js/Express + MongoDB  
✅ **Secure Authentication** - JWT tokens + bcrypt password hashing  
✅ **RESTful APIs** - Complete CRUD for all entities  
✅ **Role-Based Access Control** - Student/Teacher/Admin roles  
✅ **Error Tracking & Logging** - Winston + Morgan  
✅ **Security Features** - Helmet, rate limiting, CORS  
✅ **Comprehensive Documentation** - Full setup guides  

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **MongoDB** v6+ ([Download](https://www.mongodb.com/try/download/community))

### Installation

**Windows Users:** Simply run:
```bash
start.bat
```

**Manual Setup:**

1. **Install Dependencies**
```bash
npm install
cd backend
npm install
```

2. **Configure Environment**
```bash
cd backend
copy .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

3. **Seed Database**
```bash
cd backend
npm run seed
```

4. **Start Servers**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
npm run dev
```

**Access:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

---

## 📋 Demo Credentials

After seeding the database:

| Role | Email | Password |
|------|-------|----------|
| Student | student@comsats.edu.pk | password123 |
| Teacher | teacher@comsats.edu.pk | password123 |
| Admin | admin@comsats.edu.pk | password123 |

---

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- Framer Motion
- Zustand (State Management)
- React Router

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt (Password Hashing)
- Winston (Logging)
- Helmet (Security)
- Rate Limiting

---

## 📚 Documentation

For detailed setup instructions, API documentation, and deployment guides, see:

- **[Production Setup Guide](PRODUCTION_SETUP.md)** - Complete setup instructions
- **[API Documentation](PRODUCTION_SETUP.md#api-documentation)** - All endpoints documented

---

## 🔑 Key Features

### For Students
- Browse menu items
- Add items to cart
- Apply discount codes
- Place orders
- Track order status
- Order history
- WhatsApp verification

### For Teachers
- All student features
- Department-specific access
- Enhanced ordering privileges

### For Administrators
- Complete POS system
- Menu management (CRUD)
- Order management
- User management
- Discount creation
- Payment tracking
- Analytics dashboard

---

## 🔒 Security Features

✅ Password hashing with bcrypt  
✅ JWT token authentication  
✅ Rate limiting (100 req/15min)  
✅ CORS protection  
✅ Helmet security headers  
✅ Input validation  
✅ Protected routes  
✅ Role-based authorization  

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register/student` - Register new student
- `POST /api/auth/register/teacher` - Register new teacher
- `POST /api/auth/register/admin` - Register new admin
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### CRUD Operations
All entities support full CRUD:
- `/api/menuitems` - Menu items (public view, admin CRUD)
- `/api/orders` - Orders (user-specific, admin full access)
- `/api/orderitems` - Order line items
- `/api/payments` - Payment records
- `/api/discounts` - Discount codes
- `/api/students` - Student management (admin only)
- `/api/teachers` - Teacher management (admin only)
- `/api/admins` - Admin management (admin only)

**Example Request:**
```bash
curl -X GET http://localhost:5000/api/menuitems
```

---

## 🧪 Testing

**Type Check:**
```bash
npm run check
```

**Run Tests:**
```bash
npm run test:run
```

---

## 🚢 Deployment

### Recommended: Render + Vercel

**Backend on Render:**
```bash
# 1. Push to GitHub
git push origin main

# 2. Deploy on Render
# Go to render.com → New Web Service
# Root Directory: backend
# Build: npm install, Start: npm start
# Add env vars: MONGODB_URI, JWT_SECRET, NODE_ENV
```

**Frontend on Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
# Add env var: VITE_API_URL=https://your-backend.onrender.com/api
```

### Complete Deployment Guides

📖 **Step-by-Step Instructions:**
- [DEPLOY_BACKEND_RENDER.md](DEPLOY_BACKEND_RENDER.md) - Complete Render guide
- [DEPLOY_FRONTEND_VERCEL.md](DEPLOY_FRONTEND_VERCEL.md) - Complete Vercel guide
- [DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md) - Overview and best practices

### Alternative Platforms

- **Backend:** Railway, Heroku, Fly.io
- **Frontend:** Netlify, Cloudflare Pages
- **Database:** MongoDB Atlas (recommended), PlanetScale

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for all deployment options.

---

## 📖 Project Structure

```
Cafeteria-management-main/
├── backend/                 # Node.js/Express backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Auth middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── server.js          # Main server file
│   └── seed.js            # Database seeder
├── src/                    # React frontend
│   ├── components/        # React components
│   ├── entities/          # TypeScript types
│   ├── lib/               # Utilities & API client
│   ├── store/             # State management
│   └── styles/            # CSS styles
├── PRODUCTION_SETUP.md    # Detailed setup guide
└── start.bat              # Quick start script (Windows)
```

---

## 🔧 Configuration

### Environment Variables

Create `.env` in root:
```env
VITE_API_URL=http://localhost:5000/api
```

Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cafeteria-management
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
NODE_ENV=development
```

---

## 🐛 Troubleshooting

**MongoDB Connection Error?**
- Ensure MongoDB is running: `mongod --dbpath "C:\data\db"`
- Check connection string in `backend/.env`

**Port already in use?**
- Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
- Linux/Mac: `lsof -ti:5000 | xargs kill -9`

**Token invalid?**
- Clear browser sessionStorage
- Login again to get fresh token

See [PRODUCTION_SETUP.md#troubleshooting](PRODUCTION_SETUP.md#troubleshooting) for more help.

---

## 📞 Support

- **Email:** cafeteria@comsats.edu.pk
- **Phone:** +92 (51) 1234-5678
- **WhatsApp:** +92 300 0000000

---

## 📄 License

MIT License - Feel free to use this project!

---

## 🎉 Congratulations!

Your COMSATS Cafeteria Management System is now a **fully functional, professional, production-ready application**! 

**Ready to deploy? → See [Deployment Guide](PRODUCTION_SETUP.md#deployment)**

---

*Built with ❤️ for COMSATS University*
