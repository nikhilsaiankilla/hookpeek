import { Button } from '@/src/components/ui/button';
import Image from 'next/image';

import {
  Send,
  FileJson,
  SlidersHorizontal,
  RotateCcw,
  Clock,
  ListOrdered,
  ArrowBigRight,
  Link2,
  Logs
} from "lucide-react";
import { CodeBlock } from '@/src/components/ui/code-block';
import Link from 'next/link';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HookPeek — Inspect & Debug Webhooks",
  description:
    "Capture, inspect, and debug webhook requests from Stripe and other providers in real time. See raw payloads, headers, retries, and timestamps instantly.",

  metadataBase: new URL("https://hookpeek.nikhilsai.in"),

  openGraph: {
    title: "HookPeek — Inspect & Debug Webhooks",
    description:
      "A simple webhook inspection tool to capture and debug requests from Stripe and other providers.",
    url: "https://hookpeek.nikhilsai.in",
    siteName: "HookPeek",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "HookPeek — Webhook Inspection Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "HookPeek — Inspect & Debug Webhooks",
    description:
      "Stop guessing. See your webhooks. Capture and inspect Stripe webhook requests in real time.",
    images: ["/og-image.png"],
    creator: "@nikhilbuildss",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export const features = [
  {
    label: "Any HTTP method",
    description: "Capture GET, POST, PUT, PATCH, DELETE nothing is blocked.",
    icon: Send,
  },
  {
    label: "Raw request body",
    description: "See the exact payload sent JSON, text, or malformed data.",
    icon: FileJson,
  },
  {
    label: "Headers & query params",
    description: "Inspect all headers and URL query parameters in one place.",
    icon: SlidersHorizontal,
  },
  {
    label: "Retry attempts",
    description: "Track retries from providers like Stripe/Dodo Payments when delivery fails.",
    icon: RotateCcw,
  },
  {
    label: "Timestamped history",
    description: "Every request is stored with precise arrival time.",
    icon: Clock,
  },
  {
    label: "Paginated request logs",
    description: "Browse large request histories without performance issues.",
    icon: ListOrdered,
  },
];

export const builtForPoints = [
  "Testing Stripe webhooks locally",
  "Debugging production payment issues",
  "Understanding third party integrations",
  "Learning how webhooks really work"
]

export const webhookCode = `{
  "id": "evt_***************",
  "object": "event",
  "api_version": "2023-10-16",
  "created": 1719926400,
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "id": "pi_***************",
      "object": "payment_intent",
      "amount": 49900,
      "currency": "inr",
      "status": "succeeded",
      "description": "Webhook test payment",
      "metadata": {
        "user_id": "123",
        "order_id": "order_456"
      },
      "payment_method": "pm_***************",
      "created": 1719926300
    }
  },
  "livemode": false,
  "pending_webhooks": 1,
  "request": {
    "id": "req_***************",
    "idempotency_key": null
  }
}
`

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white relative isolate">
      {/* Purple Gradient Grid Right Background */}
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

      {/* Main components */}
      <div className="relative z-10">
        {/* hero section  */}
        <section className="w-full min-h-[70vh] px-5 md:px-10 max-w-7xl mx-auto">
          <div className="w-full pt-44 lg:pt-50 text-center">
            <div className="flex justify-center">
              <div className="flex items-center rounded-full border border-gray-200 bg-gray-100 dark:border-gray-800 overflow-hidden text-xs md:text-sm shadow-2xl">
                <span className="px-3 py-1 bg-orange-600 text-white font-medium rounded-full">
                  Webhook Debugger
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-900 font-medium">
                  Debug in 10 seconds
                </span>
              </div>
            </div>
            <div className='space-y-3 md:space-y-7'>
              <h1 className="text-2xl md:text-7xl max-w-4xl mx-auto font-bold capitalize">
                Stop guessing. <br /> <span className="text-primary">See your webhooks.</span>
              </h1>
              <p className="text-sm md:text-xl max-w-4xl mx-auto">
                Capture, inspect, and debug webhook requests from Stripe and other providers in real time.
              </p>
              <div className="flex items-center flex-wrap gap-5 justify-center">
                <Link href={'/generate-endpoint'}>
                  <Button className='flex items-center gap-2'>Generate a webhook URL <Link2 size={20} /></Button>
                </Link>
                <Button variant="outline" className='flex items-center gap-2'>Monitor Requests <Logs /></Button>
              </div>
            </div>
          </div>
        </section>

        {/* problem  */}
        <section className="w-full px-5 md:px-10 py-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10  mt-10 md:mt-20 items-center">
          <div className="w-full">
            <h2 className="text-xl md:text-4xl text-primary font-bold">
              Webhooks fail silently. That’s the problem.
            </h2>

            <hr className="h-1 rounded-full bg-primary/70 w-3/4 mt-5" />
            <ul className="w-full mt-10 space-y-5 py-10">
              <li className="text-sm md:text-lg font-semibold items-center gap-3 grid grid-cols-7">
                <ArrowBigRight className="text-primary col-span-1" size={20} /> <span className='col-span-6'>Payment succeeds but your backend doesn’t update</span>
              </li>
              <li className="text-sm md:text-lg font-semibold items-center gap-3 grid grid-cols-7">
                <ArrowBigRight className="text-primary col-span-1" size={20} /> <span className='col-span-6'>Stripe says <span className="text-primary">“Webhook failed”</span> you don’t know why</span>
              </li>
              <li className="text-sm md:text-lg font-semibold items-center gap-3 grid grid-cols-7">
                <ArrowBigRight className="text-primary col-span-1" size={20} /> <span className='col-span-6'>Logs don’t show the full payload</span>
              </li>
              <li className="text-sm md:text-lg font-semibold items-center gap-3 grid grid-cols-7">
                <ArrowBigRight className="text-primary col-span-1" size={20} /> <span className='col-span-6'>Retried requests overwrite each other</span>
              </li>
            </ul>

            <h5 className="text-lg md:text-2xl font-bold">
              You’re debugging <span className="text-primary">blind.</span>
            </h5>
          </div>
          <div className='w-full'>
            <Image
              src={'/problems.png'}
              width={100}
              height={100}
              unoptimized
              alt="Illustration of a person looking at a screen with webhook data"
              className="w-full h-full aspect-square object-contain"
            />
          </div>
        </section>

        {/* solutions  */}
        <section className="w-full px-5 md:px-10 py-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10  mt-10 md:mt-20 items-center">
          <div className='w-full order-1 md:order-0'>
            <Image
              src={'/solutions.png'}
              width={100}
              height={100}
              unoptimized
              alt="Illustration of a person looking at a screen with webhook data"
              className="w-full h-full aspect-square object-contain"
            />
          </div>
          <div className="w-full">
            <h2 className="text-xl md:text-4xl text-primary font-bold">
              We show you exactly what happened.
            </h2>

            <hr className="h-1 rounded-full bg-primary/70 w-3/4 mt-5" />
            <ul className="w-full mt-10 space-y-5 py-10">
              <li className="text-sm md:text-lg font-semibold grid items-center gap-3 grid-cols-7">
                <ArrowBigRight className="text-primary grid-cols-1" size={20} /> <span className='col-span-6'>Generate a webhook URL</span>
              </li>
              <li className="text-sm md:text-lg font-semibold grid items-center gap-3 grid-cols-7">
                <ArrowBigRight className="text-primary grid-cols-1" size={20} /> <span className='col-span-6'>Plug it into Stripe / Dodo Payments or any provider</span>
              </li>
              <li className="text-sm md:text-lg font-semibold grid items-center gap-3 grid-cols-7">
                <ArrowBigRight className="text-primary grid-cols-1" size={20} /> <span className='col-span-6'>See every request headers, body, retries</span>
              </li>
            </ul>

            <h5 className="text-lg md:text-2xl font-bold">
              No parsing. No assumptions. <span className='text-primary'>Just raw truth.</span>
            </h5>
          </div>
        </section>

        {/* features  */}
        <section className='w-full px-5 md:px-10 py-10 max-w-7xl mx-auto  mt-10 md:mt-20'>
          <h2 className="text-xl md:text-4xl text-primary font-bold">
            What You Can Inspect.
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-10'>
            {
              features.map((feature, idx) => {
                return (
                  <div className='w-full border-2 border-primary/20 rounded-sm p-5 bg-white space-y-2' key={idx}>
                    <div className='rounded-sm bg-primary w-fit h-fit'>
                      {
                        <feature.icon size={40} className="text-white mb-3 p-2" />
                      }
                    </div>
                    <h4 className='font-bold'>{feature.label}</h4>
                    <p className='text-sm text-gray-700'>{feature.description}</p>
                  </div>
                )
              })
            }
          </div>
        </section>

        {/* <section className='w-full px-5 md:px-10 py-10 max-w-7xl mx-auto  mt-10 md:mt-20'>
          <h2 className="text-xl md:text-4xl text-primary font-bold">
            This is what Stripe actually sends.
          </h2>
          <div className='w-full mt-10 grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div className='w-full'>

            </div>
            <CodeBlock
              language="json"
              filename=''
              highlightLines={[]}
              code={webhookCode}
            />
          </div>
        </section> */}

        <section className='w-full px-5 md:px-10 py-10 max-w-7xl mx-auto  mt-10 md:mt-20'>
          <h2 className="text-xl md:text-4xl text-primary font-bold">
            Built for backend developers.
          </h2>
          <ul className='w-full mt-10 space-y-2.5'>
            {
              builtForPoints.map((point, idx) => <li className='flex text-lg font-semibold items-center gap-4' key={idx}><ArrowBigRight size={20} className='text-primary' />{point}</li>)
            }
          </ul>
        </section>

        <section className='w-full px-5 md:px-10 py-10 max-w-7xl mx-auto text-center space-y-5 mt-10 md:mt-20'>
          <h2 className="text-xl md:text-4xl text-primary font-bold text-center">
            Ready to see your webhooks?
          </h2>
          <p className='max-w-3xl mx-auto text-sm md:text-lg text-gray-700'>
            Create a temporary webhook endpoint and start capturing requests from Stripe, DodoPayments, or any service that sends webhooks.
          </p>
          <Link href={'/generate-endpoint'} className='w-fit mx-auto'>
            <Button className='flex items-center gap-2 w-fit mx-auto'>Generate a webhook URL <Link2 size={20} /></Button>
          </Link>
          <p className='text-black mt-5'>No signup required • Works instantly</p>
        </section>
      </div>
    </main>
  );
}