import { prisma } from "@/utils/prisma.client";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  try {
    const { tweetId, userId } = await req.json();
    if (!tweetId || !userId) {
      throw new Error();
    }
    const data = { tweetId: tweetId, userId: userId };
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_tweetId: data,
      },
    });
    if (!existingLike) {
      await prisma.like.create({ data: data });
      return NextResponse.json(
        { message: "Added like successfully!" },
        { status: 200 }
      );
    } else {
      await prisma.like.delete({
        where: {
          userId_tweetId: data,
        },
      });
      return NextResponse.json(
        { message: "Removed like successfully!" },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Error occured while liking/disliking the tweet!" },
      { status: 500 }
    );
  }
};
