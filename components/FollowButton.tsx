"use client";

import { useSession } from "next-auth/react";
import React from "react";
import Button from "./Button";

const FollowButton: React.FC<{
  isUserFollowing: boolean;
  userId: string;
  isToggleFollowLoading: boolean;
  onClick: () => void;
}> = ({ isUserFollowing, userId, onClick, isToggleFollowLoading }) => {
  const session = useSession();

  if (session.status !== "authenticated" || session.data.user.id === userId) {
    return <></>;
  }

  return (
    <Button
      onClick={onClick}
      disabled={isToggleFollowLoading}
      gray={isUserFollowing ? true : false}
    >
      {isUserFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;
