# TODO for Contact Form Backend Integration and Vercel Deployment

## Backend Setup
- [x] Fix nodemailer typo in api/contact.js (createTransporter -> createTransport)
- [x] Ensure form in contact.html submits to /api/contact via fetch (already implemented in script.js)
- [x] Verify API route handles POST requests, validates data, stores in MongoDB, and sends emails
- [x] Add "type": "module" to package.json for ES modules
- [x] Update vercel.json for proper routing (API first, then static files)

## Environment Variables Setup
- [x] Create .env.local file with placeholders for local testing
- [ ] Set up environment variables in Vercel dashboard:
  - EMAIL_USER: Your Gmail address (hanjiranjan127@gmail.com)
  - EMAIL_PASS: Your Gmail app password (generate from Google Account settings)
  - MONGODB_URI: MongoDB Atlas connection string

## Deployment
- [ ] Push changes to GitHub to trigger Vercel redeploy
- [ ] Test the live site contact form after deployment
- [ ] Verify emails are received and data is stored in MongoDB

## Notes
- Project is ready for Vercel deployment
- Backend handles form submissions, validation, email notifications, and data storage
- For Gmail app password: Enable 2FA, then generate app password in security settings
- MongoDB Atlas: Create cluster, database user, whitelist IP, get connection string
