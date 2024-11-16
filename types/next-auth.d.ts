import NextAuth, { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      _id?: string | null
      role?: string
    } & DefaultSession['user']
  }

  export interface User extends DefaultUser {
    _id?: string
    role?: string
  }
}
