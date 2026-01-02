"use client"

import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const Navbar = () => {
    const navlinks = [
        { name: 'Home', path: '/' },
        { name: 'Generate Webhook', path: '/generate-endpoint' },
        { name: 'Requests', path: '/debug' },
        { name: 'Github', path: 'https://github.com/nikhilsaiankilla/hookpeek', target: true },
        // { name: 'Founder', path: 'https:nikhilsai.in', target: true },
    ]

    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <nav className='w-[95%] max-w-7xl px-5 md:px-10 py-4 backdrop-blur-lg shadow-md absolute top-2 md:top-5 left-1/2 -translate-x-1/2 z-40 rounded-md flex items-center justify-between'>
            <Link href={'/'} className='flex items-center gap-3'>
                <Image
                    src={'/hookpeek-primary.png'}
                    alt='Logo'
                    width={150}
                    height={150}
                    className='w-10 h-10 object-contain'
                />
                <h1 className='text-xl font-semibold text-primary hidden md:block'>HookPeek</h1>
            </Link>

            <ul className='md:flex items-center gap-5 hidden'>
                {
                    navlinks.map(
                        (link, idx) => <Link
                            href={link.path}
                            key={idx}
                            target={link.target ? '_blank' : '_self'}
                            className='text-sm hover:text-primary transaction-all duration-200 ease-in-out cursor-pointer'
                        >
                            {link.name}
                        </Link>
                    )
                }
            </ul>

            <div className='block md:hidden'>
                {
                    !isOpen ? <Menu onClick={() => setIsOpen(!isOpen)} /> : <X onClick={() => setIsOpen(!isOpen)} />
                }
            </div>

            <nav className={`w-full h-fit backdrop-blur-3xl bg-white rounded-sm shadow-lg flex flex-col items-start absolute top-16 p-5 space-y-5 md:hidden ${isOpen ? "left-1/2 -translate-x-1/2" : "-left-[300%]"} transition-all duration-300 ease-in`}>
                {
                    navlinks.map(
                        (link, idx) => <Link
                            href={link.path}
                            key={idx}
                            target={link.target ? '_blank' : '_self'}
                            onClick={() => setIsOpen(false)}
                            className='text-sm font-bold hover:text-primary transaction-all duration-200 ease-in-out cursor-pointer'
                        >
                            {link.name}
                        </Link>
                    )
                }
            </nav>
        </nav>
    )
}

export default Navbar