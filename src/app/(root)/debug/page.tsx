"use client"

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { ArrowBigLeft, ArrowBigRight, Loader } from "lucide-react";
import { useEffect, useState } from "react"
import { toast } from "sonner";
import { columns, Requests } from "./columns";
import { DataTable } from "./data-table";

const Page = () => {
    // State
    const [endpointId, setEndPointId] = useState<string>("");
    const [urlInput, setUrlInput] = useState<string>(""); // Renamed for clarity
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(20);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Requests[]>([])

    // This function ONLY handles extracting the ID
    const handleExtractAndSearch = () => {
        if (!urlInput) return;

        try {
            // Validate URL validity
            const constructedUrl = new URL(urlInput);
            const pathSegments = constructedUrl.pathname.split('/');

            // Safety check: ensure segment exists. 
            // Assuming format /api/hooks/{id} -> usually index 3 or last item
            const extractedId = pathSegments[3] || pathSegments[pathSegments.length - 1];

            if (extractedId) {
                // Updating state here will trigger the useEffect below
                setEndPointId(extractedId);
            } else {
                toast.error("Could not find an ID in that URL");
            }
        } catch (error) {
            console.error(error);
            toast.error("Invalid URL format");
        }
    }

    // The Fetch Logic
    const fetchData = async () => {
        if (!endpointId) return;

        try {
            setLoading(true);

            const response = await fetch(`/api/requests/${endpointId}?page=${page}&limit=${limit}`);

            if (response.status === 404) {
                console.log("No requests found for this endpoint yet.");
                toast.error('No Requests Found!!')
                setData([]);
                return;
            }

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const json = await response.json();
            console.log("Fetched Data:", json);
            // setData(json); // Store data here if needed

            const requests = json?.data?.requests;
            setData(requests)
            console.log(requests);

        } catch (error: unknown) {
            const err = error instanceof Error ? error.message : 'Internal Server Error';
            toast.error(err)
            console.error();
        } finally {
            setLoading(false);
        }
    }

    // Effect: Triggers whenever the endpointId (or pagination) changes
    useEffect(() => {
        if (endpointId) {
            fetchData();
        }
    }, [endpointId, page, limit]);

    // 150e0947-6405-449f-b8b7-411596039864

    return (
        <main className="min-h-screen w-full bg-white relative isolate">
            <div
                className="absolute inset-0 -z-10"
                style={{
                    backgroundImage: `
            linear-gradient(to right, #f0f0f0 1px, transparent 1px),
            linear-gradient(to bottom, #f0f0f0 1px, transparent 1px),
            radial-gradient(circle 800px at 100% 200px, #d5c5ff, transparent)
          `,
                    backgroundSize: "96px 64px, 96px 64px, 100% 100%",
                }}
            />

            <div className="relative z-10 pt-28 px-3">
                <div className="max-w-7xl w-full mx-auto bg-white p-6 rounded-sm shadow-sm space-y-4">
                    <h1 className="text-xl font-semibold text-primary">
                        Paste your webhook URL
                    </h1>

                    <p className="text-sm text-gray-600">
                        Create a temporary webhook URL to capture and inspect requests from Stripe
                        or any service that sends webhooks.
                    </p>

                    <p className="text-xs text-gray-500">
                        Use this URL in your provider’s webhook settings. Requests will appear instantly.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Input
                            placeholder="Paste your Webhook URL"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                        />

                        <Button
                            className="w-full py-3"
                            disabled={loading || !urlInput}
                            onClick={handleExtractAndSearch}
                        >
                            {loading ? (
                                <><Loader className='animate-spin mr-2' /> Fetching...</>
                            ) : (
                                "Fetch Requests"
                            )}
                        </Button>
                    </div>
                </div>

                <div className="w-full max-w-7xl mx-auto mt-5 bg-white p-6 rounded-sm shadow-sm space-y-4">
                    <div className="w-full flex items-center justify-between flex-wrap gap-5">
                        <div className="space-y-2">
                            <h1 className="text-xl md:text-2xl text-primary font-bold">Requests</h1>
                            <p className="text-sm text-gray-600 font-bold">All your requests debug them clearly</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <div>
                                <Input value={page} />
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant={'outline'} className="group">
                                    <ArrowBigLeft className="group-hover:text-primary transition-all duration-150 ease-in" />
                                </Button>
                                <Button variant={'outline'} className="group">
                                    <ArrowBigRight className="group-hover:text-primary transition-all duration-150 ease-in" />
                                </Button>
                            </div>
                        </div>

                        <div className="w-full">
                            <DataTable data={data} columns={columns} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Page 