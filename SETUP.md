# HexaFalls Frontend-Backend Connection Setup

## Quick Start

### Option 1: Use the PowerShell Script (Recommended)
```powershell
.\start-dev.ps1
```

### Option 2: Manual Setup

#### 1. Start Backend Server
```powershell
cd backend/ox-kid
npm install
npm run dev
```

#### 2. Start Frontend Server (in a new terminal)
```powershell
cd 0xKid
npm install
npm run dev
```

## Configuration

### Backend Configuration (.env)
The backend is configured with:
- **Port**: 5000
- **CORS Origin**: http://localhost:5173 (Vite default)
- **API Base URL**: /api/v1

### Frontend Configuration
The frontend axios instance is configured to:
- **Base URL**: http://localhost:5000/api/v1
- **Credentials**: true (for cookies)
- **Content-Type**: application/json

## API Endpoints

### Health Check
- **GET** `/api/v1/health` - Test backend connection

### Authentication
- **POST** `/api/v1/auth/register` - User registration
- **POST** `/api/v1/auth/login` - User login
- **POST** `/api/v1/auth/logout` - User logout

### User Management
- **GET** `/api/v1/user/profile` - Get user profile
- **PUT** `/api/v1/user/profile` - Update user profile

### AI Services
- **POST** `/api/v1/ai/explain` - AI explanations
- **POST** `/api/v1/ai/review` - Code reviews

## Testing the Connection

1. Start both servers
2. Navigate to http://localhost:5173
3. You should see a "Backend Connection Test" component
4. If it shows "✅ Backend connected!", the setup is working correctly

## Troubleshooting

### Common Issues

1. **Backend not starting**
   - Check if MongoDB is running
   - Verify .env file exists in backend/ox-kid/
   - Check if port 5000 is available

2. **CORS errors**
   - Ensure backend .env has `ORIGIN=http://localhost:5173`
   - Check that frontend is running on port 5173

3. **Connection refused**
   - Make sure both servers are running
   - Check firewall settings
   - Verify axios baseURL matches backend port

### Port Conflicts
If port 5000 is in use, update:
1. Backend `.env` file: `PORT=5001`
2. Frontend `axiosInstance.js`: `baseURL: "http://localhost:5001/api/v1"`

## Development Workflow

1. **Backend Changes**: Server auto-restarts with nodemon
2. **Frontend Changes**: Vite provides hot reload
3. **API Changes**: Update both frontend API calls and backend routes
4. **Environment Variables**: Update .env file and restart backend

## Production Deployment

For production, update:
1. Backend `.env`: Set production database URL and secrets
2. Frontend `axiosInstance.js`: Update baseURL to production API
3. CORS origin in backend to production frontend URL 