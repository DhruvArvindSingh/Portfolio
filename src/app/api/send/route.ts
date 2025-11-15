import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    try {
        const { name, email, subject, message } = await req.json()

        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'dhruvsinghxd@gmail.com',
            subject: subject,
            html: `
        <h1>Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        })

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 })
    } catch (error) {
        console.error('Error sending email:', error)
        return NextResponse.json({ error: 'Error sending email' }, { status: 500 })
    }
}
