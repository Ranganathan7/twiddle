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
import IconHoverEffect from "./IconHoverEffect";
import { VscAccount, VscHome, VscSignOut, VscSignIn } from "react-icons/vsc";

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
          <Link href="/">
            <IconHoverEffect>
              <span className="flex items-center gap-2">
                <VscHome className="h-8 w-8" />
                <span className="max-sm:hidden text-lg">Home</span>
              </span>
            </IconHoverEffect>
          </Link>
        </li>
        {user && (
          <li>
            <Link href={`/profile/${user.id}`}>
              <IconHoverEffect>
                <span className="flex items-center gap-2">
                  <VscAccount className="h-8 w-8" />
                  <span className="max-sm:hidden text-lg">Profile</span>
                </span>
              </IconHoverEffect>
            </Link>
          </li>
        )}
        {user ? (
          <li>
            <button
              onClick={() => {
                signOut();
              }}
            >
              <IconHoverEffect red>
                <span className="flex items-center gap-2">
                  <VscSignOut className="h-8 w-8 fill-red-700" />
                  <span className="max-sm:hidden text-lg text-red-700">
                    Log Out
                  </span>
                </span>
              </IconHoverEffect>
            </button>
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
                      <IconHoverEffect>
                        <span className="flex items-center gap-1">
                          <VscSignIn className="h-8 w-8 fill-green-700" />
                          <Image
                            src={`/icons/${provider.id}.png`}
                            alt={`${provider.name}-icon`}
                            height={35}
                            width={35}
                          />
                          <span className="max-sm:hidden text-lg text-green-700">
                            Log In
                          </span>
                        </span>
                      </IconHoverEffect>
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
