import { getServerSession } from 'next-auth'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

// ✅ Export authOptions
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
}

// ✅ Export getAuthSession function
export const getAuthSession = () => getServerSession(authOptions)
