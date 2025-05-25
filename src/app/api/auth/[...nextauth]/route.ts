import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Mot de passe', type: 'password' },
        type: { label: 'Type', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password, type } = credentials;

        if (type === 'customer') {
          const user = await prisma.customer.findUnique({ where: { email } });
          if (!user || !(await compare(password, user.password))) return null;
          return { id: user.id + '', name: user.username, email: user.email, role: 'customer' };
        }

        if (type === 'restaurant') {
          const resto = await prisma.restaurant.findUnique({ where: { email } });
          if (!resto || !(await compare(password, resto.password))) return null;
          return { id: resto.id + '', name: resto.name, email: resto.email, role: 'restaurant' };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
});
export { handler as GET, handler as POST };
