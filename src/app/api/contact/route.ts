import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { FormData } from '@/types';
import { generateContactEmailHTML } from './emailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json() as FormData;
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'AMS Law Contact Form <onboarding@resend.dev>', // You'll update this to your domain later
      to: process.env.CONTACT_EMAIL || 'your-email@example.com', // Your email address
      replyTo: email, // User's email for easy replies
      subject: `New Contact Form: ${subject}`,
      html: await generateContactEmailHTML(body),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

