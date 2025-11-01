// app/api/contact/route.ts
// Yeh file contact form se email bhejne ka kaam karegi.

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    // Request body se form data nikalna
    const { name, email, subject, message, services, budget } = await request.json();

    // Input validation: Zaroori fields check karna
    if (!name || !email || !subject || !message) {
      console.error('Missing required fields:', { name, email, subject, message });
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Environment variables se credentials lena
    // Yeh bohot zaroori hai ke aap in variables ko .env.local file mein sahi se set karein.
    const userEmail = process.env.GMAIL_USER;
    const appPassword = process.env.GMAIL_APP_PASSWORD;
    const receivingEmail = process.env.RECEIVING_EMAIL;

    // Credentials ki maujoodgi check karna
    if (!userEmail || !appPassword || !receivingEmail) {
      console.error('Environment variables for email not set:', {
        GMAIL_USER: userEmail ? 'Set' : 'Not Set',
        GMAIL_APP_PASSWORD: appPassword ? 'Set' : 'Not Set',
        RECEIVING_EMAIL: receivingEmail ? 'Set' : 'Not Set',
      });
      return NextResponse.json(
        { message: 'Server configuration error: Email credentials missing.' },
        { status: 500 }
      );
    }

    // 1. Nodemailer Transporter banana
    // Yeh transporter Gmail ke SMTP server ko use karega.
    // 'service: gmail' shortcut hai, yeh khud ba khud host aur port set kar deta hai.
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: userEmail, // Aapki Gmail ID (.env.local se)
        pass: appPassword, // Aapka Gmail App Password (.env.local se)
      },
    });

    // 2. Email content define karna
    // Yeh woh email hai jo aapko receive hoga.
    const mailOptions = {
      from: userEmail, // Bhejne wale ki email (aapki Gmail ID)
      to: receivingEmail, // Jis email par message receive karna hai (.env.local se)
      subject: `Contact Form: ${subject} from ${name}`, // Email ka subject
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 600;">🎯 New Contact Form Submission</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">You have received a new message from your portfolio website</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px;">
            <!-- Client Info Card -->
            <div style="background: #f8f9fa; border-radius: 8px; padding: 25px; margin-bottom: 25px; border-left: 4px solid #007bff;">
              <h3 style="margin: 0 0 20px 0; color: #333; font-size: 18px;">👤 Client Information</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div>
                  <p style="margin: 0 0 8px 0; color: #666; font-size: 14px; font-weight: 500;">NAME</p>
                  <p style="margin: 0; color: #333; font-size: 16px; font-weight: 600;">${name}</p>
                </div>
                <div>
                  <p style="margin: 0 0 8px 0; color: #666; font-size: 14px; font-weight: 500;">EMAIL</p>
                  <p style="margin: 0; color: #007bff; font-size: 16px; font-weight: 600;">${email}</p>
                </div>
              </div>
            </div>

            <!-- Message Card -->
            <div style="background: #ffffff; border: 1px solid #e9ecef; border-radius: 8px; padding: 25px; margin-bottom: 25px;">
              <h3 style="margin: 0 0 15px 0; color: #333; font-size: 18px;">💬 Message Details</h3>
              <div style="margin-bottom: 20px;">
                <p style="margin: 0 0 8px 0; color: #666; font-size: 14px; font-weight: 500;">SUBJECT</p>
                <p style="margin: 0; color: #333; font-size: 16px; font-weight: 600;">${subject}</p>
              </div>
              <div>
                <p style="margin: 0 0 8px 0; color: #666; font-size: 14px; font-weight: 500;">MESSAGE</p>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 3px solid #28a745;">
                  <p style="margin: 0; color: #333; font-size: 15px; line-height: 1.6;">${message}</p>
                </div>
              </div>
            </div>

            <!-- Project Details -->
            ${(services && services.length > 0) || budget ? `
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 25px; margin-bottom: 25px;">
              <h3 style="margin: 0 0 20px 0; color: #856404; font-size: 18px;">🚀 Project Requirements</h3>
              ${services && services.length > 0 ? `
              <div style="margin-bottom: 15px;">
                <p style="margin: 0 0 8px 0; color: #856404; font-size: 14px; font-weight: 500;">SERVICES NEEDED</p>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                  ${services.map((service: string) => `
                    <span style="background: #ffc107; color: #856404; padding: 6px 12px; border-radius: 20px; font-size: 13px; font-weight: 500;">${service}</span>
                  `).join('')}
                </div>
              </div>
              ` : ''}
              ${budget ? `
              <div>
                <p style="margin: 0 0 8px 0; color: #856404; font-size: 14px; font-weight: 500;">BUDGET RANGE</p>
                <p style="margin: 0; color: #856404; font-size: 16px; font-weight: 600; background: #fff; padding: 8px 12px; border-radius: 6px; display: inline-block;">${budget}</p>
              </div>
              ` : ''}
            </div>
            ` : ''}

            <!-- Action Button -->
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${email}" style="background: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; display: inline-block; box-shadow: 0 4px 15px rgba(0,123,255,0.3);">
                📧 Reply to Client
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
            <p style="margin: 0; color: #6c757d; font-size: 14px;">
              This message was sent from your portfolio contact form at <strong>muhammad-shehzad.com</strong>
            </p>
          </div>
        </div>
      `, // Email ka HTML content
    };

    // 3. Email send karna (aapko notification)
    await transporter.sendMail(mailOptions);

    // 4. Client ko confirmation email bhejna
    const confirmationMailOptions = {
      from: userEmail,
      to: email, // Client ka email
      subject: `Thank you for contacting Muhammad Shehzad - We'll get back to you soon!`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 12px 40px rgba(0,0,0,0.15);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 32px; font-weight: 700; margin-bottom: 10px;">✨ Thank You!</h1>
            <p style="margin: 0; font-size: 18px; opacity: 0.9; font-weight: 300;">Your message has been received successfully</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h2 style="color: #333; margin: 0 0 15px 0; font-size: 24px; font-weight: 600;">Hello ${name}!</h2>
              <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0;">Thank you for reaching out! I've received your message and will get back to you within 24 hours.</p>
            </div>

            <!-- Message Summary -->
            <div style="background: #f8f9fa; border-radius: 12px; padding: 25px; margin: 30px 0; border-left: 4px solid #007bff;">
              <h3 style="color: #333; margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">📋 Your Message Summary</h3>
              <div style="background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <div style="margin-bottom: 15px;">
                  <p style="margin: 0 0 5px 0; color: #666; font-size: 14px; font-weight: 500;">SUBJECT</p>
                  <p style="margin: 0; color: #333; font-size: 16px; font-weight: 600;">${subject}</p>
                </div>
                <div style="margin-bottom: 15px;">
                  <p style="margin: 0 0 5px 0; color: #666; font-size: 14px; font-weight: 500;">MESSAGE</p>
                  <p style="margin: 0; color: #333; font-size: 15px; line-height: 1.5; background: #f8f9fa; padding: 15px; border-radius: 6px;">${message}</p>
                </div>
                ${services && services.length > 0 ? `
                <div style="margin-bottom: 15px;">
                  <p style="margin: 0 0 8px 0; color: #666; font-size: 14px; font-weight: 500;">SERVICES INTERESTED IN</p>
                  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${services.map((service: string) => `
                      <span style="background: #e3f2fd; color: #1976d2; padding: 6px 12px; border-radius: 20px; font-size: 13px; font-weight: 500;">${service}</span>
                    `).join('')}
                  </div>
                </div>
                ` : ''}
                ${budget ? `
                <div>
                  <p style="margin: 0 0 8px 0; color: #666; font-size: 14px; font-weight: 500;">BUDGET RANGE</p>
                  <span style="background: #fff3cd; color: #856404; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600;">${budget}</span>
                </div>
                ` : ''}
              </div>
            </div>


          </div>

          <!-- Footer -->
          <div style="background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
            <div style="margin-bottom: 20px;">
              <h4 style="margin: 0 0 10px 0; color: #333; font-size: 18px; font-weight: 600;">Muhammad Shehzad</h4>
              <p style="margin: 0; color: #666; font-size: 16px; font-weight: 500;">Full Stack Developer</p>
            </div>
            <p style="margin: 0; color: #6c757d; font-size: 12px;">
              This email was sent from your portfolio contact form at <strong>muhammad-shehzad.com</strong>
            </p>
          </div>
        </div>
      `,
    };

    // Client ko confirmation email bhejna
    await transporter.sendMail(confirmationMailOptions);

    // Agar email kamyabi se send ho gaya
    console.log('Email sent successfully!');
    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });

  } catch (error) {
    // Koi bhi error hone par console mein print karna aur 500 status bhejna
    console.error('Error sending email:', error);
    // Yahan hum zyada specific error message bhi de sakte hain agar error object mein details hon.
    return NextResponse.json({ message: 'Failed to send message. Please try again.' }, { status: 500 });
  }
}
