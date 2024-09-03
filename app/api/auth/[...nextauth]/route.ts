import { connectToDB } from "@utils/database";
import User from "@models/user";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { Profile } from "next-auth";

console.log(process.env.GOOGLE_ID)
console.log(process.env.GOOGLE_CLIENT_SECRET)

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      const sessionUser = await User.findOne({
        email: session.user.email
      })

      session.user.id = sessionUser._id.toString();
      return session // The return type will match the one returned in `useSession()`
    },
    async signIn({profile, account}) {

      console.log("profile", profile);
      console.log("account", account);

      try{
        await connectToDB();

        const userExists = await User.findOne({email: profile?.email})
        if(!userExists) {

          const user = {
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            image: profile?.picture
          }
          console.log("const user", user)
          await User.create(user)
        }

        return true;
      }catch(error){
        console.log(error)
        return false;
      }
    },
  },
  
});

export { handler as GET, handler as POST };
