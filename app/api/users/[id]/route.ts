import { prisma } from "@/utils/prisma.client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        name: true,
        image: true,
        _count: { select: { followers: true, follows: true, tweets: true } },
        followers: { where: { id: params.id } },
      },
    });
    if (!user)
      return NextResponse.json({ error: "User Not Found!" }, { status: 400 });
    else {
      return NextResponse.json(
        {
          user: {
            name: user.name,
            image: user.image,
            followersCount: user._count.followers,
            followsCount: user._count.follows,
            tweetsCount: user._count.tweets,
            isUserFollowing: user.followers.length > 0,
          },
          message: "Fetched user successfully!",
        },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch user!" },
      { status: 500 }
    );
  }
};
