import nodemailer from 'nodemailer';
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { firstName, email, message } = req.body;

  // Basic validation
  if (!firstName || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    // MongoDB connection
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db('portfolio');
    const collection = db.collection('contacts');

    // Store submission in database
    const submission = {
      firstName,
      email,
      message,
      timestamp: new Date(),
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    };

    await collection.insertOne(submission);

    // Email configuration
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email to yourself
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${firstName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Auto-reply to user
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting me!',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${firstName},</p>
        <p>Thank you for your message. I've received your inquiry and will get back to you as soon as possible, usually within 24 hours.</p>
        <p>Here's a copy of your message:</p>
        <blockquote>${message.replace(/\n/g, '<br>')}</blockquote>
        <p>Best regards,<br>Hanji Ranjan</p>
      `
    };

    await transporter.sendMail(autoReplyOptions);

    await client.close();

    res.status(200).json({ message: 'Message sent successfully!' });

  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
