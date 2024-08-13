import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function generateCode(salt: number) {
  let result = "";
  for (let i = 0; i < salt; i++) {
    const random = Math.floor(Math.random() * salt);
    result += random;
  }
  return result;
}

export async function POST(req: Request) {
  const { email } = await req.json();

  const code = generateCode(4);

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER_AUTH,
      pass: process.env.EMAIL_PASS_AUTH,
    },
  });
  let mailOptions = {
    from: process.env.EMAIL_USER_AUTH,
    to: email,
    subject: "Verify Email - Blue Wings Manga",
    text: `كود تفعيل البريد الإلكتروني: ${code}`,
  };

  try {
    const res = await transporter.sendMail(mailOptions);
    if (res.rejected.length === 0) {
      return NextResponse.json(
        {
          message: "تم إرسال البريد بنجاح",
          code,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "حصل خطأ أثناء إرسال البريد",
        code: null,
        error,
      },
      { status: 500 }
    );
  }
}
