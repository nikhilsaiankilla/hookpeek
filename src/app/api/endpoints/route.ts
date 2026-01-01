import { WithTryCatchHandler } from "@/src/utils/withTryCatchHandler";
import { getDbInstance } from "../../../lib/db";
import { endpointsTable } from "@/src/db/schema";
import { NextResponse } from "next/server";

export const POST = WithTryCatchHandler(async () => {
    const db = await getDbInstance()
    const inseartedData = await db.insert(endpointsTable).values({ request_count: 0 }).returning();

    const id = inseartedData[0].id;
    const endpointUrl = `${process.env.BASE_URL}/api/hooks/${id}`

    return NextResponse.json({ message: "Endpoint created successfully", data: { id, url: endpointUrl } }, { status: 201 })
})