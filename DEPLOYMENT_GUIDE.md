# JozeyStore E-Commerce Platform - Deployment Guide

## Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB Atlas account
- M-Pesa sandbox account (for payment testing)
- Netlify account (for frontend hosting)

## Project Structure
```
ecommerce-platform/
├── client/          # React Vite frontend
├── server/          # Express backend API
└── package.json
```

## Backend Setup (Server)

### 1. Environment Configuration
Create a `.env` file in the `server/` directory using `.env.example` as template:

```bash
cd server
cp .env.example .env
```

Edit `.env` with your configuration:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_PASSKEY=your_passkey
MPESA_SHORTCODE=174379
CALLBACK_URL=http://localhost:5000
PORT=5000
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### 2. Install Dependencies
```bash
cd server
npm install
```

### 3. Start Server (Development)
```bash
npm run dev
# or
node server.js
```

Server runs on `http://localhost:5000`

## Frontend Setup (Client)

### 1. Environment Configuration
Create a `.env` file in the `client/` directory:

```bash
cd client
cp .env.example .env
```

Edit `.env`:
```
VITE_API_URL=http://localhost:5000
```

For production (Netlify):
```
VITE_API_URL=https://your-api-domain.com
```

### 2. Install Dependencies
```bash
cd client
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
# Generates optimized build in 'dist/' directory
```

## Payment Integration (M-Pesa)

### Testing M-Pesa Payments
1. Use test phone numbers: `254708374149` (sandbox)
2. Amount must be between 1-999KES for sandbox testing
3. Verify API credentials are correctly set in `.env`

### Phone Number Formats Accepted
- `0712345678` (local format)
- `254712345678` (international without +)
- `+254712345678` (international with +)

## Netlify Deployment

### Automatic Deployment Setup

#### 1. Connect Repository
1. Push code to GitHub
2. Go to [Netlify](https://app.netlify.com)
3. Click "New site from Git"
4. Connect GitHub account
5. Select your repository

#### 2. Build Configuration (Already configured in `netlify.toml`)
The project includes `client/netlify.toml` with:
- Build command: `npm run build`
- Publish directory: `dist`
- SPA routing redirects configured

#### 3. Environment Variables
Add to Netlify Site Settings > Build & Deploy > Environment:
```
VITE_API_URL=https://your-api-domain.com
```

#### 4. Deploy
Push to GitHub, Netlify automatically builds and deploys

### Manual Deployment
```bash
# Build the project
npm run build

# Deploy using Netlify CLI
npx netlify-cli deploy --prod --dir=dist
```

## API Base URL Configuration

### Development
```
http://localhost:5000
```

### Production
For deployed frontend, update `VITE_API_URL` to match your backend API URL:
- If backend is on same domain: `/api`
- If backend is on different domain: `https://api.example.com`

## Troubleshooting

### SPA Routes Return 404 on Page Refresh
- ✓ Fixed: `netlify.toml` configured with `_redirects` rule
- All routes redirect to `index.html` for React Router

### M-Pesa Payment Returns Error 400
1. Check phone number format (must be valid)
2. Verify amount is a positive number
3. Confirm environment variables are set
4. Check M-Pesa sandbox credentials

### CORS Errors
- Ensure backend has CORS enabled (Express app includes this)
- Check API_BASE_URL matches backend domain
- Verify authentication headers are included

### Payment Modal Not Appearing
- Verify Footer component imports and state management
- Check browser console for JavaScript errors
- Ensure phone number is in correct format

## Performance Optimization

- Vite handles code splitting automatically
- Production build minified and optimized
- Images should be optimized before deployment
- Use CDN for static assets if needed

## Security Considerations

1. Never commit `.env` files (added to `.gitignore`)
2. Use HTTPS in production
3. Validate all user inputs on backend
4. Keep dependencies updated
5. Use environment variables for sensitive data
6. Enable CORS only for trusted domains

## Support & Debugging

### Enable Debug Logs
- Frontend: Open browser console (F12)
- Backend: Check terminal/console output
- M-Pesa requests logged to server console

### Common Errors
- `Cannot find module`: Run `npm install`
- `Connection refused port 5000`: Backend not running
- `VITE_API_URL undefined`: Add to `.env` file
- `PaymentError 400`: Check phone format and amount

## Additional Resources
- [Vite Documentation](https://vitejs.dev)
- [React Router v7 Guide](https://reactrouter.com)
- [Netlify Deployment Documentation](https://docs.netlify.com)
- [M-Pesa Sandbox Testing](https://developer.safaricom.co.ke)
