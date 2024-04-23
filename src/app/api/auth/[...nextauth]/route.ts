import NextAuth, { AuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import User from "@/models/User";
import { compare } from "bcrypt";
import dbConnect from "@/lib/dbConnect";

const loginSchema = z.object({
  email: z.string().email("يجب ان تدخل بريد الكتروني صالح"),
  password: z.string().min(8, "كلمة المرور لا يجب أن تقل عن 8 أحرف"),
});

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials, req) {
        await dbConnect();
        return null;
        // const { success } = loginSchema.safeParse(credentials);
        // if (!success) {
        //   throw new Error("البيانات المدخله غير صالحة");
        // }

        // const { email, password } = credentials as {
        //   email: string;
        //   password: string;
        // };
        // const user = await User.findOne({ email });
        // if (!user) {
        //   throw new Error("لا يوجد مستخدم بهذا البريد الإلكتروني");
        // }

        // let validPassword = await compare(password, user.password);
        // if (!validPassword) {
        //   throw new Error("كلمة المرور غير صالحة");
        // }

        // return user;
      },
      credentials: {},
    }),
  ],
  callbacks: {
    session({ session, token }) {
      session.user.id = token.id;
      console.log({ session, token });
      return session;
    },
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }
      return token;
    },
    signIn({ profile }) {
      console.log(profile);
      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
