import NextAuth, {
  Account,
  AuthOptions,
  Profile,
  User as UserAuth,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import User from "@/models/User";
import { compare } from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import mongoose, { isValidObjectId } from "mongoose";
import { AdapterUser } from "next-auth/adapters";

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
        const { success } = loginSchema.safeParse(credentials);
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!success) {
          throw new Error("البيانات المدخله غير صالحة");
        }
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("لا يوجد مستخدم بهذا البريد الإلكتروني");
        }
        if (!user.password) {
          throw new Error(
            "يجب ان تسجل الدخول من جوجل بهذا الحساب وليس عبر كتابته يدوياً"
          );
        }
        let validPassword = await compare(password, user.password);

        if (!validPassword) {
          throw new Error("كلمة المرور غير صحيحة");
        }
        return {
          name: user.username,
          email: user.email,
          image: user.avatar,
          id: user._id,
          email_verified: user.email_verified,
        };
      },
      credentials: {},
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email_verified = token.email_verified;
      return session;
    },
    async jwt({ token, trigger, account, user, session }) {
      if (trigger === "update") {
        let user = session.user;
        try {
          await User.findByIdAndUpdate(user.id, {
            username: user.name,
            email: user.email,
            avatar: user.image,
            email_verified: user.email_verified,
          });
          console.log(
            `${"#".repeat(15)} JWT UPDATE SUCCESSFULLY ${"#".repeat(15)}`
          );
          return token;
        } catch (error) {
          console.log(
            `${"#".repeat(15)} ERROR WHILE JWT UPDATE ${"#".repeat(15)}`
          );
          console.log(error);
          console.log("#".repeat(54));
          return token;
        }
      }
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }
      if (isValidObjectId(token.id)) {
        let u = await User.findById(token.id);
        token.email_verified = u.email_verified;
      }
      token.image = token.picture;
      return token;
    },
    async signIn({ user, profile, account, credentials }) {
      console.log("#".repeat(30));
      console.log("DATA ===>", { user, profile, account, credentials });
      console.log("#".repeat(30));
      await dbConnect();
      const isFound = await User.findOne({ email: user.email });
      if (isFound) return true;

      const newUser = await User.create({
        _id: new mongoose.Types.ObjectId(),
        username: user.name,
        email: user.email,
        avatar: user.image,
        email_verified: (profile as any)?.email_verified,
      });

      try {
        await newUser.save();
        return true;
      } catch (error) {
        console.log(`${"#".repeat(15)} GOOGLE SIGN IN ERROR ${"#".repeat(15)}`);
        console.log(error);
        console.log("#".repeat(50));
        return false;
      }
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
async function signInWithCredentials() {}

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
