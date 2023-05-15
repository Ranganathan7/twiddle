import React from "react";
import "../styles/globals.css";
import { Session } from "next-auth";
import { Metadata } from "next";
import Provider from "../components/Provider";

export const metadata: Metadata = {
  title: "Twiddle",
  description:
    "A dynamic social networking platform that brings people together to express themselves, share thoughts, and connect with others in real-time. ",
};

const RootLayout: React.FC<{ children: React.ReactNode; session: Session }> = ({
  children,
  session,
}) => {
  return (
    <html lang="en">
      <body>
        <Provider session={session}>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
