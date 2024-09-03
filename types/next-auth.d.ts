import NextAuth, { DefaultSession, Profile } from "next-auth"

/*
By default, TypeScript will merge new interface properties and overwrite existing ones. In this case, the default session user properties will be overwritten, with the new one defined above.

If you want to keep the default session user properties, you need to add them back into the newly declared interface:
*/
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string
    } & DefaultSession["user"]
  }

  interface Profile {
    picture: string
  }
}