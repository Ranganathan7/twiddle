"use client";

import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { TweetCard } from "./TweetCard";
import { useSession } from "next-auth/react";

interface Tweet {
  id: string;
  content: string;
  createdAt: Date;
  likeCount: number;
  likedByMe: boolean;
  user: { id: string; image: string | null; name: string | null };
}

const TweetsList: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [cursor, setCursor] = useState<{ id: string; createdAt: Date }>();
  const session = useSession();

  useEffect(() => {
    fetchNewTweets();
  }, []);

  async function fetchNewTweets() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/tweets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          limit: 10,
          userId: session?.data?.user?.id,
          cursor: cursor,
        }),
      });
      const responseBody = await response.json();
      if (responseBody.error) {
        throw responseBody;
      } else {
        //tweets fetched successfully
        console.timeLog(responseBody.tweets);
        // setTweets((prevTweets) => [...prevTweets, responseBody.tweets]);
        setTweets((tweets) => [...tweets, ...responseBody.tweets]);
        if (responseBody.nextCursor) {
          setCursor(responseBody.nextCursor);
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      }
    } catch (err) {
      console.log(err);
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
        loader={"Loading..."}
      >
        {tweets.map((tweet) => (
          <TweetCard tweet={tweet} key={tweet.id} />
        ))}
      </InfiniteScroll>
    </ul>
  );
};

export default TweetsList;
