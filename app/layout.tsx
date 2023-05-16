import React from "react";
import "../styles/globals.css";
import { Metadata } from "next";
import Provider from "../components/Provider";
import { Session } from "next-auth";

export const metadata: Metadata = {
  title: "Twiddle",
  description:
    "A dynamic social networking platform that brings people together to express themselves, share thoughts, and connect with others in real-time. ",
};

const RootLayout: React.FC<{
  children: React.ReactNode;
  session: Session | null;
}> = ({ children, session }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/logo.png" />
      </head>
      <body>
        <Provider session={session}>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
