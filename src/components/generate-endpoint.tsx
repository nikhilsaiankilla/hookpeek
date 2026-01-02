"use client"

import { useState } from 'react'
import { Button } from './ui/button'
import { toast } from 'sonner';
import { Copy, CopyCheck, Loader } from 'lucide-react';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import Link from 'next/link';

const GenerateEndpoint = () => {
    const [generatedLink, setGeneratedLink] = useState<string>("");
    const [copied, setCopied] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);

    const handleClick = async () => {
        try {
            setLoading(true)
            const response = await fetch(`/api/endpoints`, {
                method: 'POST'
            })

            const json = await response.json();

            setGeneratedLink(json?.data?.url)
            setLoading(false)
        } catch (error: unknown) {
            console.log(error);
            const err = error instanceof Error ? error.message : 'Internal Server Error'
            toast.error(err)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    const handleCopy = async () => {
        try {
            await window.navigator.clipboard.writeText(generatedLink);
            toast.success("Copied to clipboard!");
            setCopied(true)

            setTimeout(() => {
                setCopied(false)
            }, 2000)
        } catch (error: unknown) {
            const err = error instanceof Error ? error.message : 'Failed to copy';
            toast.error(err);
        }
    }

    return (
        <div className="w-full flex items-center justify-center flex-col">
            <div className="max-w-xl w-full mx-auto bg-white p-6 rounded-sm shadow-xl space-y-4">
                <h1 className="text-xl font-semibold text-primary">
                    Generate a Webhook Endpoint
                </h1>

                <p className="text-sm text-gray-600">
                    Create a temporary webhook URL to capture and inspect requests from Stripe
                    or any service that sends webhooks.
                </p>

                <p className="text-xs text-gray-500">
                    Use this URL in your provider’s webhook settings. Requests will appear instantly.
                </p>

                <Button className="w-full py-3" disabled={loading} onClick={handleClick}>
                    {
                        loading ? <><Loader className='animate-spin' /> Generating!</> : "Generate Webhook Endpoint"
                    }
                </Button>
            </div>

            {
                generatedLink && <Separator />
            }

            {
                generatedLink && <div className='max-w-xl w-full mx-auto bg-white p-6 rounded-sm shadow-xl space-y-4'>
                    <Input className='w-full' value={generatedLink} />
                    <Button className="w-full py-3" variant={'outline'} onClick={handleCopy}>
                        {
                            copied ? <><CopyCheck size={18} className='text-green-500' /> Copied!!</> : <><Copy size={18} className='text-primary'/> Copy Webhook URL</>
                        }
                    </Button>
                </div>
            }

            <div className='max-w-xl w-full mx-auto bg-white p-6 rounded-sm shadow-xl space-y-4'>
                <p className='text-sm text-gray-500'>Already Have the endpoint? <Link href={'/debug'} className='text-primary'>Click here to monitor requests</Link></p>
            </div>
        </div>

    )
}

export default GenerateEndpoint