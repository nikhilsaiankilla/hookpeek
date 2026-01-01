import { endpointsTable, requestsTable } from "@/src/db/schema";
import { ApiError } from "@/src/lib/ApiError";
import { getDbInstance } from "@/src/lib/db";
import { WithTryCatchHandler } from "@/src/utils/withTryCatchHandler";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const WebHookHandler = WithTryCatchHandler(async (req: NextRequest, ctx) => {
    const db = await getDbInstance();

    const id = (await ctx?.params)?.id;

    const endpointId = id as string;
    const response = await db.select().from(endpointsTable).where(eq(endpointsTable.id, endpointId)).limit(1);

    if (response.length === 0) {
        throw new ApiError("Event id not found", 404);
    }

    const endpoint = response[0];
    const httpMethod = req?.method;

    const rawBody = await req.text();
    const queryParams = req.nextUrl.searchParams;

    let parsedBody: unknown = null;
    let parsedQueryParams: Record<string, string> = {};

    if (rawBody && rawBody.length > 0) {
        try {
            parsedBody = JSON.parse(rawBody);
        } catch (error) {
            parsedBody = rawBody;
        }
    }

    if (queryParams) {
        queryParams.forEach((value, key) => {
            parsedQueryParams[key] = value;
        });
    }
    
    const payload = {
        endpointId: endpoint?.id,
        method: httpMethod as string,
        headers: Object.fromEntries(req.headers),
        body: parsedBody,
        queryParams: parsedQueryParams,
    }

    await db.transaction(async (tx) => {
        await tx.insert(requestsTable).values(payload).returning();

        await tx.update(endpointsTable).set({ request_count: endpoint.request_count + 1 }).where(eq(endpointsTable.id, endpoint?.id))
    })

    return NextResponse.json({ message: "Request logged successfully" }, { status: 201 })
})

export const POST = WebHookHandler
export const GET = WebHookHandler
export const PUT = WebHookHandler
export const DELETE = WebHookHandler
export const PATCH = WebHookHandler