import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@models/User";
import { compare } from "bcrypt";
import mongoose, { isValidObjectId } from "mongoose";
import { TCredentials } from "@lib/types";
import { dbConnect, loginSchema } from "@lib";

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        await dbConnect();
        const { success } = loginSchema.safeParse(credentials);
        const { email, password } = credentials as TCredentials;
        if (!success) {
          throw new Error("البيانات المدخله غير صالحة");
        }
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("لا يوجد مستخدم بهذا البريد الإلكتروني");
        }
        if (!user.password) {
          throw new Error("يجب ان تسجل الدخول من جوجل بهذا الحساب وليس عبر كتابته يدوياً");
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
      const { id, email_verified, role, image, email } = token;
      let user = {
        ...session.user,
        id,
        email_verified,
        role,
        image,
      };
      const dbUser = await User.findOne({ email });
      user.image = dbUser.image;
      user.cover = dbUser.cover;
      user.bio = dbUser.bio;
      session.user = user;
      return session;
    },
    async jwt({ token, trigger, account, user, session }) {
      await dbConnect();
      if (trigger === "update") {
        // let { name, email, image, email_verified, cover, role, discord } = session.user;
        const user = session.user;
        try {
          await User.findOneAndUpdate({ email: user.email }, { ...user });
          console.log(`${"#".repeat(15)} JWT UPDATE SUCCESSFULLY ${"#".repeat(15)}`);
          token = {
            ...token,
            ...user,
          };
          return token;
        } catch (error) {
          console.log(`${"#".repeat(15)} ERROR WHILE JWT UPDATE ${"#".repeat(15)}`);
          console.log(error);
          console.log("#".repeat(54));
          return token;
        }
      }
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }

      let u = await User.findOne({ email: token.email });
      token.email_verified = u.email_verified;
      token.role = u.role;
      token.image = u.image;
      return token;
    },
    async signIn({ user, profile, ...props }) {
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

export default authOptions;
