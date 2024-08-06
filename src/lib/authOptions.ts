import { AuthOptions, Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { TUser, User } from "@models/User";
import { compare } from "bcrypt";
import mongoose, { isValidObjectId } from "mongoose";
import { TCredentials } from "./types";
import { dbConnect, loginSchema } from "@lib";
import { Post } from "@/models";
import { Comment } from "@/models/Comment";
import slugify from "slugify";
import { slugifyOptions } from "./slugifyOptions";
import axios from "axios";

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
        const user = await User.findOne({ email }).exec();
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
        const {
          name,
          email: uEmail,
          image,
          cover,
          bio,
          _id: id,
          email_verified,
        } = user;
        return {
          name,
          email: uEmail,
          image,
          cover,
          bio,
          id,
          email_verified,
        };
      },
      credentials: {},
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = {
        ...session.user,
        ...(token.user as TUser & { _doc: TUser })._doc,
      };
      return session;
    },
    async jwt({ token, trigger, account, user, session }) {
      await dbConnect();
      if (trigger === "update") {
        const sessionUser = session.user;
        console.log({ sessionUser });
        try {
          const updatedUser = await User.findOneAndUpdate(
            { email: sessionUser.email },
            sessionUser,
            {
              new: true,
            }
          );
          console.log(
            `${"#".repeat(15)} JWT UPDATE SUCCESSFULLY ${"#".repeat(15)}`
          );
          console.log({ updatedUser });
          token = { ...token, ...sessionUser };
        } catch (error) {
          console.log(
            `${"#".repeat(15)} ERROR WHILE JWT UPDATE ${"#".repeat(15)}`
          );
          console.log(error);
          console.log("#".repeat(54));
          throw new Error(error as string);
        }
      }
      if (account) {
        // token.accessToken = account.access_token;
        token.id = user.id;
      }
      await Post.init();
      await Comment.init();

      token.user = await User.findOne({ email: token.email })
        .populate({
          path: "posts",
          populate: [
            { path: "likes", model: "User", select: "_id name image" },
            { path: "comments", model: "Comment" },
            { path: "author", model: "User" },
          ],
        })
        .populate("creations")
        .populate("favoriteManga")
        .exec();
      return token;
    },
    async signIn({ user, profile }) {
      await dbConnect();
      const isFound = await User.findOne({ email: user.email });
      if (isFound) return true;

      const newUser = await User.create({
        _id: new mongoose.Types.ObjectId(),
        name: user.name,
        slug_name: slugify(user.name as string, slugifyOptions),
        email: user.email,
        image: user.image,
        email_verified:
          (profile as Profile & { email_verified: boolean }).email_verified ??
          false,
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
