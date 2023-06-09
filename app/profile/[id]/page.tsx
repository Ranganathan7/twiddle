"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import IconHoverEffect from "@/components/IconHoverEffect";
import { VscArrowLeft } from "react-icons/vsc";
import ProfileImage from "@/components/ProfileImage";
import UserTweetsList from "@/components/UserTweetList";
import FollowButton from "@/components/FollowButton";
import { useSession } from "next-auth/react";

interface User {
  name: string;
  image: string;
  followersCount: number;
  followsCount: number;
  tweetsCount: number;
  isUserFollowing: boolean;
}

const ProfilePage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [isUserFollowing, setIsUserFollowing] = useState<boolean>(false);
  const [isToggleFollowLoading, setIsToggleFollowLoading] =
    useState<boolean>(false);
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/users/${params.id}`, { 
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ currentUserId: session?.data?.user.id })
         });
        const data = await response.json();
        if (data.error) throw data;
        else {
          setUser(data.user);
          setFollowersCount(data.user.followersCount);
          setIsUserFollowing(data.user.isUserFollowing);
        }
      } catch (err) {
        toast.error(JSON.stringify(err));
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const toggleFollow = async () => {
    setIsToggleFollowLoading(true);
    if (isUserFollowing) {
      setIsUserFollowing(false);
      setFollowersCount((prev) => prev - 1);
    } else {
      setIsUserFollowing(true);
      setFollowersCount((prev) => prev + 1);
    }
    try {
      const response = await fetch("/api/users/toggleFollow", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: params.id,
          currentUserId: session?.data?.user.id,
        }),
      });
      const data = await response.json();
      if (data.error) throw data;
    } catch (err) {
      toast.error(JSON.stringify(err));
    } finally {
      setIsToggleFollowLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  if (!user) return <></>;

  return (
    <>
      <header className="sticky top-0 z-10 flex items-center border-b bg-white px-4 py-4">
        <button onClick={() => router.push("/")} className="mr-2">
          <IconHoverEffect>
            <VscArrowLeft className="h-6 w-6" />
          </IconHoverEffect>
        </button>
        <ProfileImage src={user.image} className="flex-shrink-0" />
        <div className="ml-2 flex-grow">
          <h1 className="text-lg font-bold">{user.name}</h1>
          <div className="text-gray-500 flex gap-2 max-sm:flex-col max-sm:gap-1">
            <span>
              {user.tweetsCount}{" "}
              {user.tweetsCount <= 1 ? "Twiddle" : "Twiddles"}
            </span>
            <span className="max-sm:hidden">{"  -  "}</span>
            <span>
              {followersCount} {followersCount <= 1 ? "Follower" : "Followers"}
            </span>
            <span className="max-sm:hidden">{"  -  "}</span>
            <span>
              {user.followsCount}{" "}
              {user.followsCount <= 1 ? "Following" : "Following"}
            </span>
          </div>
        </div>
        <FollowButton
          isUserFollowing={isUserFollowing}
          userId={params.id}
          onClick={() => toggleFollow()}
          isToggleFollowLoading={isToggleFollowLoading}
        />
      </header>
      <main>
        <UserTweetsList userId={params.id} />
      </main>
    </>
  );
};

export default ProfilePage;
