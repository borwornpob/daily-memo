import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { NextRequest, NextResponse } from "next/server";
import { db } from "root/db";
import * as schema from "root/schema";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const user = await db.query.user.findFirst({
    where: eq(schema.user.id, data.userId),
  });

  if (!user) {
    return NextResponse.json(
      {
        error: "User not found",
      },
      {
        status: 404,
      }
    );
  }

  const note = await db
    .insert(schema.note)
    .values({
      id: generateIdFromEntropySize(10),
      userId: user.id,
      content: data.content,
      createdAt: new Date(),
    })
    .returning({
      id: schema.note.id,
    });

  return NextResponse.json(
    {
      noteId: note[0].id,
    },
    {
      status: 201,
    }
  );
}
