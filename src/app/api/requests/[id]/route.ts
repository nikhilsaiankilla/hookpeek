import { WithTryCatchHandler } from "@/src/utils/withTryCatchHandler";
import { NextResponse } from "next/server";

export const GET = WithTryCatchHandler(async () => {
    return NextResponse.json({ message: "Endpoint created successfully" }, { status: 201 })
}) 