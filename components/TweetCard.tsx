"use client";

import React from "react";
import ProfileImage from "./ProfileImage";
import Link from "next/link";
import { VscHeartFilled, VscHeart } from "react-icons/vsc";
import { useSession } from "next-auth/react";
import IconHoverEffect from "./IconHoverEffect";

interface Tweet {
  id: string;
  content: string;
  createdAt: Date;
  likeCount: number;
  likedByMe: boolean;
  user: { id: string; image: string | null; name: string | null };
}

export const TweetCard: React.FC<{ tweet: Tweet }> = ({ tweet }) => {
  const session = useSession();

  function dateFormatter(createdAt: Date) {
    const date = new Date(createdAt);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  function timeFormatter(createdAt: Date) {
    const date = new Date(createdAt);
    return date.toLocaleTimeString();
  }

  return (
    <li className="flex gap-4 border-b px-4 py-4">
      <Link href={`/profile/${tweet.user.id}`}>
        <ProfileImage src={tweet.user.image} />
      </Link>
      <div className="flex flex-col flex-grow">
        <div className="flex gap-1">
          <Link
            href={`/profile/${tweet.user.image}`}
            className="font-bold outline-none hover:underline focus-visible:underline"
          >
            {tweet.user.name}
          </Link>
          <span className="text-gray-500">-</span>
          <span className="text-gray-500">
            {dateFormatter(tweet.createdAt)}
          </span>
          <span className="text-gray-400 text-sm self-center">
            {timeFormatter(tweet.createdAt)}
          </span>
        </div>
        <p className="whitespace-pre-wrap">{tweet.content}</p>
        {!session?.data?.user ? (
          <div className="mb-1 mt-1 flex items-center gap-2 self-start text-gray-500">
            <VscHeart />
            <span>{tweet.likeCount}</span>
          </div>
        ) : (
          <button
            className={`group mb-1 mt-1 gap-2 flex flex-row items-center self-start transition-colors duration-200 ${
              tweet.likedByMe ? "text-red-500" : "text-gray-500 hover:text-red-500 focus-visible:text-red-500"
            }`}
          >
            <IconHoverEffect red>
              {tweet.likedByMe ? <VscHeartFilled /> : <VscHeart />}
            </IconHoverEffect>
            <span>{tweet.likeCount}</span>
          </button>
        )}
      </div>
    </li>
  );
};
