import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import fs from "fs";
import { cwd } from "process";

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const credentialDetails = {
          username: credentials.username,
          password: credentials.password,
        };
        try {
          const data = await axios.post(
            "https://dummyjson.com/auth/login",
            credentialDetails
          );
          if (data.data.id) {
            fs.writeFileSync(
              cwd() + "/logs/sign-in.txt",
              `${data.data.email} -> ${new Date().toLocaleString()} \n`,
              { flag: "a+" },
              (err) => {
                console.log(err);
              }
            );
            return { user: data.data };
          } else {
            console.log("check your credentials");
            return null;
          }
        } catch (error) {
          console.log(error.response.data.message);
          throw new Error(error.response.data.message);
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.sub = user.user.id;
        token.email = user.user.email;
        token.username = user.user.username;
        token.firstName = user.user.firstName;
        token.image = user.user.image;
        token.lastName = user.user.lastName;
        token.gender = user.user.gender;
        token.accessToken = user.user.token;
      }

      return token;
    },
    session: ({ session, token, user }) => {
      if (token) {
        session.user.email = token.email;
        session.user.id = token.sub;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.image = token.image;
        session.user.gender = token.gender;
        session.user.username = token.username;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.SECRET_KEY,
};
