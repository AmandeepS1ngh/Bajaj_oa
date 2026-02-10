# Render Deployment Checklist

## ✅ Pre-Deployment Steps Completed

- [x] Created `.gitignore` file
- [x] Created `.env.example` template
- [x] Created comprehensive `README.md`
- [x] Created `render.yaml` for IaC deployment
- [x] Added Node.js engine specification to `package.json`
- [x] Verified all dependencies are in `package.json`

## 📋 Next Steps for Deployment

### 1. Commit and Push to GitHub

```bash
# Add all new files
git add .

# Commit changes
git commit -m "chore: prepare for Render deployment - add config files and documentation"

# Push to GitHub
git push origin main
```

### 2. Deploy on Render

#### Option A: Using Render Dashboard (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect GitHub"** and authorize Render
4. Select your repository: `Bajaj_oa`
5. Configure the service:
   - **Name**: `bfhl-api` (or your preferred name)
   - **Region**: Choose closest to your users (Singapore, Oregon, Frankfurt)
   - **Branch**: `main`
   - **Root Directory**: Leave empty
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free` (or `Starter` for better performance)

6. **Add Environment Variables** (IMPORTANT):
   Click "Advanced" → "Add Environment Variable"
   
   Add these variables:
   ```
   OFFICIAL_EMAIL=your_email@chitkara.edu.in
   GEMINI_API_KEY=your_actual_gemini_api_key
   NODE_ENV=production
   ```

7. Click **"Create Web Service"**

8. Wait for deployment (usually 2-5 minutes)

9. Your API will be live at: `https://your-service-name.onrender.com`

#### Option B: Using render.yaml (Infrastructure as Code)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will automatically detect `render.yaml`
5. Add the environment variables in the dashboard:
   - `OFFICIAL_EMAIL`
   - `GEMINI_API_KEY`
6. Click **"Apply"**

### 3. Test Your Deployment

Once deployed, test your endpoints:

```bash
# Replace YOUR_APP_URL with your actual Render URL
export API_URL="https://your-app.onrender.com"

# Test health endpoint
curl $API_URL/health

# Test GET /bfhl
curl $API_URL/bfhl

# Test POST /bfhl with Fibonacci
curl -X POST $API_URL/bfhl \
  -H "Content-Type: application/json" \
  -d '{"bfhl":{"key":"fibonacci","value":[10]}}'

# Test AI endpoint
curl -X POST $API_URL/bfhl \
  -H "Content-Type: application/json" \
  -d '{"bfhl":{"key":"AI","value":"What is the capital of India?"}}'
```

### 4. Monitor Your Application

- **Logs**: Check logs in Render dashboard under "Logs" tab
- **Metrics**: Monitor performance under "Metrics" tab
- **Health**: Render automatically monitors `/health` endpoint

## 🔧 Important Notes

### Free Tier Limitations
- **Spin Down**: Free tier services spin down after 15 minutes of inactivity
- **First Request**: May take 30-60 seconds to wake up
- **Upgrade**: Consider Starter plan ($7/month) for always-on service

### Environment Variables
- Never commit `.env` file to Git
- Always use Render's environment variable dashboard
- Update `.env.example` if you add new variables

### Custom Domain (Optional)
1. Go to your service settings
2. Click "Custom Domains"
3. Add your domain
4. Update DNS records as instructed

### Automatic Deployments
- Render automatically deploys when you push to `main` branch
- You can disable this in service settings if needed

## 🐛 Troubleshooting

### Build Fails
- Check Node.js version compatibility
- Verify all dependencies are in `package.json`
- Check build logs for specific errors

### Service Won't Start
- Verify `PORT` environment variable is not hardcoded
- Check start command is correct: `npm start`
- Review application logs

### API Returns Errors
- Verify environment variables are set correctly
- Check Gemini API key is valid
- Review application logs for specific errors

### CORS Issues
- CORS is already enabled in the code
- If issues persist, check request headers

## 📞 Support

- Render Documentation: https://render.com/docs
- Render Community: https://community.render.com
- GitHub Issues: Create an issue in your repository

## 🎉 Post-Deployment

Once deployed successfully:
1. Update your frontend/client to use the new API URL
2. Test all endpoints thoroughly
3. Monitor logs for any errors
4. Set up monitoring/alerting if needed
5. Consider setting up a custom domain

---

**Your API will be live at**: `https://your-service-name.onrender.com`

Good luck with your deployment! 🚀
