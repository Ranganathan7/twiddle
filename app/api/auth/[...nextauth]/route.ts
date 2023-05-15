import NextAuth, { Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET || "secret",
  providers: [
    // OAuth authentication providers
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
    })
  ],
  callbacks: {
    // async session({ session }: { session: Session }) {
    //   // store the user id from MongoDB to session
    //   const sessionUser = await UserModel.findOne({
    //     email: session?.user?.email,
    //   });
    //   if (sessionUser && session.user) {
    //     session.user.id = sessionUser._id.toString();
    //   }
    //   return session;
    // },
    // async signIn({ user }: { user: User }) {
    //   try {
    //     await connectToDb();
    //     // if user already exist
    //     const userExist = await UserModel.findOne({ email: user.email });
    //     // if user not found
    //     if (!userExist) {
    //       await UserModel.create({
    //         email: user.email,
    //         name: user.name,
    //         image: user.image,
    //       });
    //     }
    //     return true;
    //   } catch (err) {
    //     console.log(err);
    //     return false;
    //   }
    // },
  },
});

export { handler as GET, handler as POST };
