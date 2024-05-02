import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db, validateRequest, validateRequestServer } from "root/db";
import * as schema from "root/schema";

export async function GET(params: { sessionId: string | undefined }) {
  if (!params.sessionId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { user } = await validateRequestServer(params.sessionId);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const currentUser = await db.query.user.findMany({
    where: eq(schema.user.id, user.id),
  });

  return NextResponse.json(currentUser);
}
