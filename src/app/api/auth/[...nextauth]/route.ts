import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Aquí deberías implementar la lógica para verificar las credenciales
        if (credentials?.email === "user@example.com" && credentials?.password === "password") {
          return { id: "1", name: "J Smith", email: "user@example.com" }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async jwt({ token, account, profile }: any) {
      if (account) {
        token.accessToken = account.access_token
        if (profile) {
          token.id = profile.sub
          token.email = profile.email
          token.name = profile.name
        }
      }
      return token
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken
      session.user.id = token.id
      session.user.email = token.email
      session.user.name = token.name
      return session
    },
  },
})

export { handler as GET, handler as POST }