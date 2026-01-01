import { endpointsTable, requestsTable } from "@/src/db/schema";
import { ApiError } from "@/src/lib/ApiError";
import { getDbInstance } from "@/src/lib/db";
import { WithTryCatchHandler } from "@/src/utils/withTryCatchHandler";
import { count, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = WithTryCatchHandler(async (req: NextRequest, ctx) => {
    const id = (await ctx?.params)?.id;
    const db = await getDbInstance();

    if (!id) {
        throw new ApiError("ID parameter is missing", 400)
    }

    const endpoint = db.select().from(endpointsTable).where(eq(endpointsTable.id, id)).limit(1);

    if ((await endpoint).length === 0) {
        throw new ApiError("Endpoint not found", 404)
    }

    let page = req.nextUrl.searchParams.get("page") || "1";
    let limit = req.nextUrl.searchParams.get("limit") || "10";

    if (parseInt(limit) > 20) {
        limit = "20";
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const requests = await db
        .select()
        .from(requestsTable)
        .where(eq(requestsTable.endpointId, id))
        .limit(parseInt(limit))
        .offset(offset)
        .orderBy(desc(requestsTable.createdAt))

    if (requests.length === 0) {
        throw new ApiError("No requests found for this endpoint", 404)
    }
    
    const totalNoOfRequests = await db.select({ count: count() }).from(requestsTable).where(eq(requestsTable.endpointId, id))

    const totalPages = Math.ceil(totalNoOfRequests[0].count / parseInt(limit));
    const currentPage = parseInt(page);

    let hasMany = false;

    if (currentPage < totalPages) {
        hasMany = true;
    }

    const payload = {
        requests,
        page: parseInt(page),
        limit: parseInt(limit),
        totalNoOfRequests,
        totalPages,
        hasMany,
    }

    return NextResponse.json({ message: "Requests fetched successfully", data: payload }, { status: 200 })
})