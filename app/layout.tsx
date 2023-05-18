import React from "react";
import "../styles/globals.css";
import { Metadata } from "next";
import Provider from "../components/Provider";
import SideNav from "@/components/SideNav";
import Toast from "@/components/Toast";

export const metadata: Metadata = {
  title: "Twiddle",
  description:
    "A dynamic social networking platform that brings people together to express themselves, share thoughts, and connect with others in real-time. ",
};

const RootLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/logo.png" />
      </head>
      <body>
        <Provider>
          <div className="container mx-auto flex items-start">
            <SideNav />
            <div className="min-h-screen flex-grow border-x">{children}</div>
          </div>
          <Toast />
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
