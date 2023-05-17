"use client";

import NewTweetForm from "@/components/NewTweetForm";
import TweetsList, { Tweet } from "@/components/TweetsList";
import { useState } from "react";

const Home: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-white pt-2">
        <h1 className="text-lg font-bold mb-2 px-4">Home</h1>
      </header>
      <NewTweetForm setTweets={setTweets} />
      <TweetsList tweets={tweets} setTweets={setTweets} />
    </>
  );
};

export default Home;
