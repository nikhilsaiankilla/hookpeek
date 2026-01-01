import { NextRequest, NextResponse } from "next/server"
import { ApiError } from "../lib/ApiError"

type Handler<T> = (
    req: NextRequest,
    ctx: { params?: Promise<Record<string, string>> }
) => Promise<T>

export function WithTryCatchHandler<T>(handler: Handler<T>) {
    return async (req: NextRequest, ctx: { params?: Promise<Record<string, string>> }) => {
        try {
            return await handler(req, ctx)
        } catch (error : unknown) {
            console.error(error)

            if (error instanceof ApiError) {
                return NextResponse.json(
                    { message: error.message },
                    { status: error.status }
                )
            }

            return NextResponse.json(
                { message: "Internal Server Error" },
                { status: 500 }
            )
        }
    }
}