"use client";

import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { TweetCard } from "./TweetCard";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { Tweet } from "./RecentTweetsList";
import { LoadingSpinner } from "./LoadingSpinner";

const FollowingTweetsList: React.FC = () => {
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [cursor, setCursor] = useState<{ id: string; createdAt: Date }>();
  const session = useSession();
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchNewTweets(true);
    return(() => {
      setTweets([]);
    })
  }, [session]);

  async function fetchNewTweets(isFirstTime = false) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/tweets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          limit: 10,
          userId: session?.data?.user?.id,
          cursor: isFirstTime ? undefined : cursor,
          onlyFollowing: true,
        }),
      });
      const responseBody = await response.json();
      if (responseBody.error) {
        throw responseBody;
      } else {
        //tweets fetched successfully
        if (!isFirstTime)
          setTweets((tweets) => [...tweets, ...responseBody.tweets]);
        else {
          setTweets(responseBody.tweets);
        }
        if (responseBody.nextCursor) {
          setCursor(responseBody.nextCursor);
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      }
    } catch (err) {
      toast.error(JSON.stringify(err));
    } finally {
      setIsLoading(false);
    }
  }

  if (tweets === null || tweets?.length === 0) {
    return (
      <h2 className="my-4 text-center text-2xl text-gray-500">No Tweets</h2>
    );
  }

  return (
    <ul>
      <InfiniteScroll
        dataLength={tweets.length}
        next={fetchNewTweets}
        hasMore={hasMore}
        loader={<LoadingSpinner />}
      >
        {tweets.map((tweet) => (
          <TweetCard tweet={tweet} key={tweet.id} />
        ))}
      </InfiniteScroll>
    </ul>
  );
};

export default FollowingTweetsList;
