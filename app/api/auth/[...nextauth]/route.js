import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "email", placeholder: "Your Email" },
            password: { label: "Password", type: "password", placeholder: "Your Password"}
          },
          async authorize(credentials, req) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signin`, {
              method: 'POST',
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email:credentials?.email,
                password:credentials?.password
              })
            });
            const user = await res.json()
            if (user) {
                return user;
            }
            return null
          }
        })
      ]
})

export { handler as GET, handler as POST }