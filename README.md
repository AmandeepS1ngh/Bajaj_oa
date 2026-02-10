# BFHL API - Production-Ready REST API

A production-ready REST API built with Node.js and Express.js that provides mathematical operations and AI-powered question answering using Google's Gemini API.

## 🚀 Features

- **Mathematical Operations**
  - Fibonacci sequence generation
  - Prime number filtering
  - Least Common Multiple (LCM)
  - Highest Common Factor (HCF)
  
- **AI Integration**
  - Gemini AI-powered question answering
  - One-word response generation
  
- **Production-Ready**
  - Rate limiting (100 requests per 15 minutes)
  - Security headers with Helmet
  - CORS enabled
  - Request validation
  - Error handling
  - Health check endpoint

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Gemini API key (for AI features)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Bajaj_oa
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from the template:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
PORT=3000
OFFICIAL_EMAIL=your_email@chitkara.edu.in
GEMINI_API_KEY=your_gemini_api_key_here
```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` (or the PORT specified in your .env file).

## 📡 API Endpoints

### Health Check
```http
GET /health
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "status": "healthy",
  "timestamp": "2024-02-10T12:00:00.000Z"
}
```

### Get Official Email
```http
GET /bfhl
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in"
}
```

### Process BFHL Request
```http
POST /bfhl
Content-Type: application/json

{
  "bfhl": {
    "key": "operation_type",
    "value": [data]
  }
}
```

#### Supported Operations:

**1. Fibonacci Sequence**
```json
{
  "bfhl": {
    "key": "fibonacci",
    "value": [5]
  }
}
```
Response: `[0, 1, 1, 2, 3]`

**2. Prime Numbers**
```json
{
  "bfhl": {
    "key": "prime",
    "value": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }
}
```
Response: `[2, 3, 5, 7]`

**3. Least Common Multiple (LCM)**
```json
{
  "bfhl": {
    "key": "lcm",
    "value": [12, 18, 24]
  }
}
```
Response: `72`

**4. Highest Common Factor (HCF)**
```json
{
  "bfhl": {
    "key": "hcf",
    "value": [12, 18, 24]
  }
}
```
Response: `6`

**5. AI Question (Gemini)**
```json
{
  "bfhl": {
    "key": "AI",
    "value": "What is the capital of France?"
  }
}
```
Response: `"Paris"`

## 🔒 Security Features

- **Helmet**: Security headers protection
- **CORS**: Cross-Origin Resource Sharing enabled
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Request Size Limit**: 1MB maximum payload
- **Input Validation**: Sanitization and validation of all inputs

## 🌐 Deployment on Render

### Method 1: Using Render Dashboard

1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - **Name**: `bfhl-api` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free or Starter
6. Add Environment Variables:
   - `OFFICIAL_EMAIL`: Your email
   - `GEMINI_API_KEY`: Your Gemini API key
7. Click "Create Web Service"

### Method 2: Using render.yaml (Infrastructure as Code)

The project includes a `render.yaml` file. Simply:

1. Push to GitHub
2. Connect your repository to Render
3. Render will automatically detect and use the configuration

### Environment Variables on Render

Set these in the Render dashboard under "Environment":
- `OFFICIAL_EMAIL`
- `GEMINI_API_KEY`

## 📁 Project Structure

```
Bajaj_oa/
├── src/
│   ├── index.js              # Main application entry point
│   ├── routes/
│   │   ├── bfhl.js          # BFHL endpoint handlers
│   │   └── health.js        # Health check endpoint
│   ├── services/
│   │   └── aiService.js     # Gemini AI integration
│   ├── middlewares/
│   │   ├── errorHandler.js  # Global error handling
│   │   └── validateRequest.js # Request validation
│   └── utils/
│       └── math.js          # Mathematical operations
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## 🧪 Testing the API

### Using cURL

```bash
# Health check
curl https://your-app.onrender.com/health

# Fibonacci
curl -X POST https://your-app.onrender.com/bfhl \
  -H "Content-Type: application/json" \
  -d '{"bfhl":{"key":"fibonacci","value":[10]}}'

# AI Question
curl -X POST https://your-app.onrender.com/bfhl \
  -H "Content-Type: application/json" \
  -d '{"bfhl":{"key":"AI","value":"What is 2+2?"}}'
```

### Using Postman

1. Import the collection (if provided)
2. Set the base URL to your Render deployment URL
3. Test each endpoint

## 🐛 Error Handling

The API returns consistent error responses:

```json
{
  "is_success": false,
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200`: Success
- `400`: Bad Request (validation errors)
- `404`: Not Found
- `429`: Too Many Requests (rate limit exceeded)
- `500`: Internal Server Error

## 📝 License

ISC

## 👤 Author

Your Name - your_email@chitkara.edu.in

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if this project helped you!
