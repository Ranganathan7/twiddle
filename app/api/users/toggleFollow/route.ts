import { prisma } from "@/utils/prisma.client";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  try {
    const { userId, currentUserId } = await req.json();
    if (!userId) {
      throw new Error();
    }
    const existingFollower = await prisma.user.findFirst({
      where: {
        id: userId,
        followers: { some: { id: currentUserId } },
      },
    });
    if (!existingFollower) {
      await prisma.user.update({
        where: { id: userId },
        data: { followers: { connect: { id: currentUserId } } },
      });
      return NextResponse.json(
        { message: "Followed user successfully!" },
        { status: 200 }
      );
    } else {
      await prisma.user.update({
        where: { id: userId },
        data: { followers: { disconnect: { id: currentUserId } } },
      });
      return NextResponse.json(
        { message: "Unfollowed user successfully!" },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Error occured while following/unfollowing the user!" },
      { status: 500 }
    );
  }
};
