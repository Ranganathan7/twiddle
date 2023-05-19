"use client";

import React, { useState } from "react";
import ProfileImage from "./ProfileImage";
import Link from "next/link";
import { VscHeartFilled, VscHeart } from "react-icons/vsc";
import { useSession } from "next-auth/react";
import IconHoverEffect from "./IconHoverEffect";
import { Tweet } from "./RecentTweetsList";
import { toast } from "react-toastify";

export const TweetCard: React.FC<{ tweet: Tweet }> = ({ tweet }) => {
  const session = useSession();
  const [isToggleLikeLoading, setIsToggleLikeLoading] =
    useState<boolean>(false);
  const [tweetLikeCount, setTweetLikeCount] = useState<number>(tweet.likeCount);
  const [tweetLikedByMe, setTweetLikedByMe] = useState<boolean>(
    tweet.likedByMe
  );

  function dateFormatter(createdAt: Date) {
    const date = new Date(createdAt);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  function timeFormatter(createdAt: Date) {
    const date = new Date(createdAt);
    return `${date.getHours() + 1}:${
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    }`;
  }

  async function toggleLike() {
    setIsToggleLikeLoading(true);
    if (tweetLikedByMe) {
      setTweetLikedByMe(false);
      setTweetLikeCount((prevLikeCount) => prevLikeCount - 1);
    } else {
      setTweetLikedByMe(true);
      setTweetLikeCount((prevLikeCount) => prevLikeCount + 1);
    }
    try {
      const response = await fetch("/api/tweets/toggleLike", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tweetId: tweet.id,
          userId: session?.data?.user?.id,
        }),
      });
      const responseBody = await response.json();
      if (responseBody.error) {
        throw responseBody;
      }
    } catch (err) {
      toast.error(JSON.stringify(err));
    } finally {
      setIsToggleLikeLoading(false);
    }
  }

  return (
    <li className="flex gap-4 border-b px-4 py-4">
      <Link href={`/profile/${tweet.user.id}`}>
        <ProfileImage src={tweet.user.image} />
      </Link>
      <div className="flex flex-col flex-grow">
        <div className="flex gap-1">
          <Link
            href={`/profile/${tweet.user.id}`}
            className="font-bold outline-none hover:underline focus-visible:underline"
          >
            {tweet.user.name}
          </Link>
          <span className="text-gray-500">-</span>
          <span className="text-gray-500">
            {dateFormatter(tweet.createdAt)}
          </span>
          {/* <span className="text-gray-400 text-sm self-center">
            {timeFormatter(tweet.createdAt)}
          </span> */}
        </div>
        <p className="whitespace-pre-wrap">{tweet.content}</p>
        {!session?.data?.user ? (
          <div className="mb-1 mt-1 flex items-center gap-2 self-start text-gray-500">
            <VscHeart />
            <span>{tweetLikeCount}</span>
          </div>
        ) : (
          <button
            className={`group mb-1 mt-1 gap-2 flex flex-row items-center self-start transition-colors duration-200 ${
              tweetLikedByMe
                ? "text-red-500"
                : "text-gray-500 hover:text-red-500 focus-visible:text-red-500"
            }`}
            onClick={toggleLike}
            disabled={isToggleLikeLoading}
          >
            <IconHoverEffect red>
              {tweetLikedByMe ? (
                <VscHeartFilled className="fill-red-500" />
              ) : (
                <VscHeart />
              )}
            </IconHoverEffect>
            <span>{tweetLikeCount}</span>
          </button>
        )}
      </div>
    </li>
  );
};
