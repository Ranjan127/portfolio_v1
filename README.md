# Portfolio Backend Setup

This portfolio includes a contact form with backend functionality for email notifications and response tracking.

## Features

- Contact form with First Name, Email, and Message fields
- Email notifications sent to your inbox
- Auto-reply emails to users
- MongoDB database for tracking all submissions
- Serverless deployment on Vercel

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in your project root (copy from `.env.example`):

```bash
cp .env.example .env.local
```

Fill in your actual credentials:

- **EMAIL_USER**: Your Gmail address
- **EMAIL_PASS**: Gmail App Password (not your regular password)
- **MONGODB_URI**: MongoDB Atlas connection string

### 2. Gmail App Password Setup

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password for "Mail"
4. Use this app password in EMAIL_PASS

### 3. MongoDB Atlas Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create a database named "portfolio"
4. Create a collection named "contacts"
5. Get your connection string and update MONGODB_URI

### 4. Vercel Deployment

1. Install Vercel CLI: `npm install -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel`
4. Set environment variables in Vercel dashboard:
   - EMAIL_USER
   - EMAIL_PASS
   - MONGODB_URI

### 5. Testing Locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` and test the contact form.

## API Endpoint

- **POST** `/api/contact`
  - Body: `{ firstName, email, message }`
  - Response: Success/error message

## Response Tracking

All form submissions are stored in MongoDB with:
- Name, email, message
- Timestamp
- IP address

You can view submissions in MongoDB Atlas dashboard or create a simple admin panel.

## Security Notes

- Never commit `.env.local` to version control
- Use environment variables for all sensitive data
- Consider rate limiting for production use
