const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.PASSWORD_PASS,
  },
});

app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    if(!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const adminHtml = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>`;

    const userHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <h2 style="color: #333;">Thank you for contacting us!</h2>
        <p>Dear ${name},</p>
        <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>`;

    const AdminOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Submission from ${name}`,
        html: adminHtml,
    };

    const UserOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Thank you for contacting us!`,
        html: userHtml,
    };
    
    transporter.sendMail(AdminOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send email' });
        } else {
            console.log('Email sent:', info.response);
            transporter.sendMail(UserOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    return res.status(500).json({ error: 'Failed to send email' });
                } else {
                    console.log('Email sent:', info.response);
                    return res.status(200).json({ message: 'Email sent successfully' });
                }
            });
        }
    });

})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

