"use client";

import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
  signOut,
  useSession,
} from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/legacy/image";

const SideNav: React.FC<{}> = () => {
  const session = useSession();
  const user = session.data?.user;
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const setProvidersInitially = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProvidersInitially();
  }, []);

  return (
    <nav className="sticky top-0 py-4 px-2">
      <ul className="flex flex-col items-start justify-center gap-2 whitespace-nowrap">
        <li>
          <Link href="/">Home</Link>
        </li>
        {user && (
          <li>
            <Link href={`/profile/${user.id}`}>Profile</Link>
          </li>
        )}
        {user ? (
          <li>
            <button onClick={() => signOut()}>Sign Out</button>
          </li>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: ClientSafeProvider) => {
                return (
                  <li key={provider.name}>
                    <button
                      onClick={() => signIn(provider.id)}
                      className="flex flex-row justify-center items-center gap-1"
                    >
                      <Image
                        src={`/icons/${provider.id}.png`}
                        alt={`${provider.name}-icon`}
                        height={23}
                        width={23}
                      />
                      Sign In
                    </button>
                  </li>
                );
              })}
          </>
        )}
      </ul>
    </nav>
  );
};

export default SideNav;
