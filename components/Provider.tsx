"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

const Provider: React.FC<{children: React.ReactNode, session: Session}> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      { children }
    </SessionProvider>
  );
};

export default Provider;