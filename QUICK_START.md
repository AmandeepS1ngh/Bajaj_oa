# 🚀 Quick Deployment Guide - Render

## ✅ What's Been Done
All necessary files have been created and pushed to GitHub!

## 📝 Environment Variables You'll Need

When deploying on Render, you'll need to set these:

```
OFFICIAL_EMAIL=your_email@chitkara.edu.in
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=production
```

## 🎯 Quick Deploy Steps

1. **Go to Render**: https://dashboard.render.com/

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select repository: `Bajaj_oa`

3. **Configure**:
   - Name: `bfhl-api` (or any name you prefer)
   - Region: Singapore/Oregon/Frankfurt
   - Branch: `main`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: Free

4. **Add Environment Variables**:
   - Click "Advanced"
   - Add the 3 environment variables listed above

5. **Deploy**:
   - Click "Create Web Service"
   - Wait 2-5 minutes for deployment

6. **Test**:
   ```bash
   curl https://your-app.onrender.com/health
   ```

## 📚 Full Documentation

- **README.md** - Complete API documentation
- **DEPLOYMENT.md** - Detailed deployment guide with troubleshooting

## 🔑 Get Your Gemini API Key

If you don't have a Gemini API key yet:
1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and use it in Render's environment variables

## ⚡ Your API Endpoints

Once deployed at `https://your-app.onrender.com`:

- `GET /health` - Health check
- `GET /bfhl` - Get official email
- `POST /bfhl` - Process requests (fibonacci, prime, lcm, hcf, AI)

## 💡 Pro Tips

- **Free Tier**: Service sleeps after 15 min of inactivity
- **First Request**: May take 30-60s to wake up
- **Logs**: Check Render dashboard for debugging
- **Auto Deploy**: Pushes to `main` branch auto-deploy

---

**Need help?** Check `DEPLOYMENT.md` for detailed instructions and troubleshooting!
