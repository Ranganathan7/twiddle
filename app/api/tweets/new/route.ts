import { prisma } from "@/utils/prisma.client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { content, userId } = await req.json();
    console.log(content, userId);
    if(!content || !userId) {
      console.log('err')
      throw new Error;
    }
    const tweet = await prisma.tweet.create({
      data: {
        content,
        userId,
      },
    });
    return NextResponse.json(
      { message: "Created tweet successfully!", tweet },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Error creating the tweet!" },
      { status: 500 }
    );
  }
};
