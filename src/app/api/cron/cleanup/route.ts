import { requestsTable } from "@/src/db/schema";
import { getDbInstance } from "@/src/lib/db";
import { lt } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('Authorization');

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({
            message: "Unauthorized",
        }, { status: 401 })
    }

    const db = await getDbInstance();

    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago

    // delete all the day before records
    await db.delete(requestsTable)
        .where(lt(requestsTable.createdAt, cutoff))

    return NextResponse.json({
        message: "Old requests cleaned up successfully",
    }, { status: 200 });
}