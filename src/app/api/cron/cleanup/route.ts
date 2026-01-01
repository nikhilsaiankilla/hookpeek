import { requestsTable } from "@/src/db/schema";
import { getDbInstance } from "@/src/lib/db";
import { lt } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export default async (req: NextRequest, res: NextResponse) => {
    const authHeader = req.headers.get('Authorization');

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({
            message: "Unauthorized",
        }, { status: 401 })
    }

    const db = await getDbInstance();

    const curoff = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // delete all the day before records
    await db.delete(requestsTable)
        .where(lt(requestsTable.createdAt, curoff))

    return NextResponse.json({
        message: "Old requests cleaned up successfully",
    }, { status: 200 });
}