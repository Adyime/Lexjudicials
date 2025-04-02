import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {

    const { firstName, lastName, email, phone, service, message} = await request.json();


    if (!firstName || !lastName || !email || !message || !phone || !service) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      // secure: true,

      auth: {
        user: process.env.H_USER,
        pass: process.env.H_PASS,
      },
    });

    // Email Content
    const mailOptions = {
      from: process.env.H_USER,
      to: process.env.H_USER,
      replyTo: email,
      subject: `Contact Form Submission from ${firstName||lastName}`,
      text: `Name: ${firstName||' '||lastName}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nMessage: ${message}`,
      html: `
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #333;
              line-height: 1.6;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #ddd;
              border-radius: 5px;
              background-color: #f9f9f9;
            }
            .header {
              background-color: #007bff;
              color: #fff;
              padding: 10px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .content {
              padding: 20px;
            }
            .content p {
              margin: 10px 0;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #777;
              padding: 10px;
              border-top: 1px solid #ddd;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Query Form</h2>
            </div>
            <div class="content">
              <p><strong>Name:</strong> ${firstName||' '||lastName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Service:</strong> ${service}</p>
              <p><strong>Message:</strong> ${message}</p>
            </div>
            <div class="footer">
              <p>New Query</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}