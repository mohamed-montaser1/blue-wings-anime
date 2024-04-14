import nodemailer from "nodemailer";

export default async function sendEmailVerificationCodeTo(email: string) {
  let code = generateRandomCode(6);
  let [username, password]: [string, string] = [
    process.env.EMAIL_USER_NAME as string,
    process.env.EMAIL_PASSWORD as string,
  ];

  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },

    auth: {
      user: username,
      pass: password,
    },
  });

  try {
    await transporter.sendMail({
      from: username,
      to: email,
      subject: "<blue-wings-team> رمز تأكيد الإيميل",
      text: `رمز التأكيد هو:  ${code}`,
    });
    return {
      success: true,
      code,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}

function generateRandomCode(iteration: number) {
  let code = "";
  for (let i = 1; i <= iteration; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
}
