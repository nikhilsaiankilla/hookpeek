"use client"

import { ColumnDef } from "@tanstack/react-table"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/src/components/ui/dialog"
import { Button } from "@/src/components/ui/button"
import { Eye } from "lucide-react"
import { CodeBlock } from "@/src/components/ui/code-block"
import { useMemo } from "react"

export type Requests = {
    id: string
    endpointId: string
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS" | "HEAD"
    created_at: string
    headers?: string | null | JSON
    body?: string | null | JSON
}

export const columns: ColumnDef<Requests>[] = [
    {
        accessorKey: "id",
        header: "UUID",
        cell: ({ row }) => {
            // Optional: Truncate UUID for cleaner look
            const id = row.getValue("id") as string
            return <span className="font-mono text-xs">{id}</span>
        }
    },
    {
        accessorKey: "endpointId",
        header: "Endpoint Id",
    },
    {
        accessorKey: "method",
        header: "Method",
        cell: ({ row }) => {
            const method = row.getValue("method") as string

            // Define color map
            const colors: Record<string, string> = {
                GET: "bg-blue-100 text-blue-700 border-blue-200",
                POST: "bg-green-100 text-green-700 border-green-200",
                PUT: "bg-orange-100 text-orange-700 border-orange-200",
                PATCH: "bg-yellow-100 text-yellow-700 border-yellow-200",
                DELETE: "bg-red-100 text-red-700 border-red-200",
                OPTIONS: "bg-purple-100 text-purple-700 border-purple-200",
                HEAD: "bg-gray-100 text-gray-700 border-gray-200",
            }

            // Fallback to gray if method unknown
            const colorClass = colors[method] || "bg-gray-100 text-gray-700 border-gray-200"

            return (
                <div className="flex items-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
                        {method}
                    </span>
                </div>
            )
        }
    },
    {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ row }) => {
            // Good practice: Format the date
            const date = new Date(row.getValue("createdAt"))

            return <div className="text-gray-500">{date.toLocaleString()}</div>
        }
    },
    {
        id: 'actions',
        header: 'Inspect',
        cell: ({ row }) => {
            const requestData = row.original;

            const colors: Record<string, string> = {
                GET: "bg-blue-100 text-blue-700 border-blue-200",
                POST: "bg-green-100 text-green-700 border-green-200",
                PUT: "bg-orange-100 text-orange-700 border-orange-200",
                PATCH: "bg-yellow-100 text-yellow-700 border-yellow-200",
                DELETE: "bg-red-100 text-red-700 border-red-200",
                OPTIONS: "bg-purple-100 text-purple-700 border-purple-200",
                HEAD: "bg-gray-100 text-gray-700 border-gray-200",
            }

            const headersJson = useMemo(
                () => JSON.stringify(requestData.headers, null, 2),
                [requestData.headers]
            )
            const bodyJson = useMemo(
                () => JSON.stringify(requestData.body, null, 2),
                [requestData.body]
            )

            const date = new Date(row.getValue("createdAt"))

            const colorClass = colors[requestData?.method] || "bg-gray-100 text-gray-700 border-gray-200"
            return <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4 text-gray-600" />
                        <span className="sr-only">View Details</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl! max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Request Details</DialogTitle>
                        <DialogDescription>
                            UUID: <span className="font-mono text-xs text-primary">{requestData.id}</span>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 mt-4 overflow-x-hidden">
                        {/* Method & Timestamp */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <h4 className="text-sm font-medium leading-none">Method</h4>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
                                    {requestData.method}
                                </span>
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-medium leading-none">Timestamp</h4>
                                <p className="text-sm text-muted-foreground">{date.toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Headers Section */}
                        {requestData?.headers && Object.keys(requestData?.headers).length > 0 && (
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium leading-none">Headers</h4>
                                <div className="w-full max-w-full overflow-x-auto rounded-md border bg-slate-950 p-4 scrollbar-hide"
                                    style={{
                                        scrollbarWidth: "none"
                                    }}
                                >
                                    <CodeBlock
                                        filename="headers"
                                        language="json"
                                        code={headersJson}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Body Section */}
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium leading-none">Body / Payload</h4>
                            <div className="bg-slate-950 text-slate-50 p-4 rounded-md text-xs font-mono overflow-x-auto">
                                {requestData?.body ? (
                                    <div className="w-full max-w-full overflow-x-auto rounded-md border bg-slate-950 p-4 scrollbar-hide">
                                        <CodeBlock
                                            filename="body"
                                            language="json"
                                            code={bodyJson}
                                        />
                                    </div>
                                ) : (
                                    <span className="text-slate-500 italic">No body content</span>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        }
    }
]
