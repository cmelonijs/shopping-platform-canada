import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],

  callbacks: {
    authorized({ auth }) {
      return !!auth; // true if authenticated, false if no
    },
  },
} satisfies NextAuthConfig;
