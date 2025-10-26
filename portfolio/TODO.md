# TODO for Contact Form Backend Integration and Vercel Deployment

## Backend Setup
- [x] Fix nodemailer typo in api/contact.js (createTransporter -> createTransport)
- [x] Ensure form in contact.html submits to /api/contact via fetch (already implemented in script.js)
- [x] Verify API route handles POST requests, validates data, stores in MongoDB, and sends emails

## Environment Variables Setup
- [x] Create .env.local file with placeholders for local testing
- [ ] Set up environment variables in Vercel:
  - EMAIL_USER: Your Gmail address
  - EMAIL_PASS: Your Gmail app password (not regular password)
  - MONGODB_URI: MongoDB connection string

## Testing
- [ ] Install Node.js and Vercel CLI
- [ ] Test the contact form locally using `vercel dev`
- [ ] Verify form submission works and emails are sent
- [ ] Check MongoDB for stored submissions

## Deployment
- [ ] Deploy to Vercel using `vercel --prod` or via Vercel dashboard
- [ ] Ensure vercel.json is configured correctly for API routes
- [ ] Test the live site contact form

## Notes
- The backend is already set up with MongoDB for storage and Nodemailer for email notifications.
- For Gmail, you need to enable 2FA and generate an app password.
- MongoDB Atlas is recommended for the database.
