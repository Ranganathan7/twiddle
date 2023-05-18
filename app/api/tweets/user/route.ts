import { prisma } from "@/utils/prisma.client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { limit, cursor, userId } = await req.json();
    if (cursor && (!cursor.createdAt || !cursor.id)) {
      throw new Error();
    }
    if (!userId) return new Error();
    const data = await prisma.tweet.findMany({
      where: {
        userId: userId,
      },
      take: limit ? limit + 1 : undefined,
      cursor: cursor ? { createdAt_id: cursor } : undefined,
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      select: {
        id: true,
        content: true,
        createdAt: true,
        _count: { select: { likes: true } },
        likes: !userId ? false : { where: { userId: userId } },
        user: { select: { name: true, image: true, id: true } },
      },
    });
    let nextCursor: typeof cursor | undefined;
    // for pagination (seeing if there are more data to load)
    if (limit && data.length > limit) {
      const nextTweet = data.pop();
      if (nextTweet) {
        nextCursor = { id: nextTweet.id, createdAt: nextTweet.createdAt };
      }
    }
    // filtering our data and sending it in usable format
    const tweets = data.map((tweet) => ({
      id: tweet.id,
      createdAt: tweet.createdAt,
      content: tweet.content,
      likeCount: tweet._count.likes,
      user: tweet.user,
      likedByMe: tweet.likes?.length > 0,
    }));
    return NextResponse.json(
      {
        message: "All tweets of the user fetched successfully!",
        tweets: tweets,
        nextCursor: nextCursor,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch the tweets of the user!" },
      { status: 500 }
    );
  }
};
