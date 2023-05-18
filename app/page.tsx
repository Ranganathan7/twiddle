"use client";

import FollowingTweetsList from "@/components/FollowingTweetList";
import NewTweetForm from "@/components/NewTweetForm";
import RecentTweetsList, { Tweet } from "@/components/RecentTweetsList";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Home: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const tabs = ["Recent", "Following"];
  const [selectedTab, setSelectedTab] =
    useState<(typeof tabs)[number]>("Recent");
  const session = useSession();

  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-white pt-2">
        <h1 className="text-lg font-bold mb-2 px-4">Home</h1>
        {session.status === "authenticated" && (
          <div className="flex">
            {tabs.map((tab) => {
              return (
                <button
                  key={tab}
                  className={`flex-grow p-2 hover:bg-gray-200 focus-visible:bg-gray-200 ${
                    tab === selectedTab
                      ? "border-b-4 border-b-blue-400 font-bold"
                      : ""
                  }`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        )}
      </header>
      <NewTweetForm setTweets={setTweets} />
      {selectedTab === "Recent" ? (
        <RecentTweetsList tweets={tweets} setTweets={setTweets} />
      ) : (
        <FollowingTweetsList />
      )}
    </>
  );
};

export default Home;
