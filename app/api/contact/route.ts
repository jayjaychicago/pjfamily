import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const verify = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY!,
          response: body.token,
        }),
      }
    );

    const captcha = await verify.json();

    if (!captcha.success) {
      return Response.json(
        { error: "Captcha failed" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "contact@pj.family",
      to: [
        "julienpmjacquet@gmail.com",
        "alexanderkpurdy@gmail.com"
      ],
      subject: `PJ.FAMILY Website message from ${body.name}`,
      replyTo: body.email,
      text: `
Name: ${body.name}

Email: ${body.email}

Message:
${body.message}
      `,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error(err);

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}