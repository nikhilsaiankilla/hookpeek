import { Github, Globe, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
    const navlinks = [
        { name: 'Home', path: '/' },
        { name: 'Generate Webhook', path: '/generate-endpoint' },
        { name: 'Requests', path: '/debug' },
        { name: 'Github', path: 'https://github.com/nikhilsaiankilla/hookpeek', target: true },
        // { name: 'Founder', path: 'https:nikhilsai.in', target: true },
    ]

    return (
        <footer className='w-full bg-primary'>
            <div className='w-full max-w-7xl mx-auto py-10 px-10'>
                <div className='w-full flex items-center justify-between flex-wrap'>
                    <Link href={'/'} className='flex items-center gap-1'>
                        <Image
                            src={'/hookpeek-white.png'}
                            width={100}
                            height={200}
                            alt='Logo'
                            className='w-20 h-20 object-contain'
                        />
                        <h1 className='text-xl font-semibold text-white hidden md:block'>HookPeek</h1>
                    </Link>

                    <div className='flex items-center gap-5 flex-wrap'>
                        <Link href={'https://github.com/nikhilsaiankilla/hookpeek'}>
                            <Github className='text-white' size={20} />
                        </Link>
                        <Link href={'https://linkedin.com/in/nikhilsaiankilla'}>
                            <Linkedin className='text-white' size={20} />
                        </Link>
                        <Link href={'https://x.com/nikhilbuildss'}>
                            <Twitter className='text-white' size={20} />
                        </Link>
                        <Link href={'https://nikhilsai.in'}>
                            <Globe className='text-white' size={20} />
                        </Link>
                    </div>
                </div>

                <ul className='w-fit mx-auto mt-10 flex-wrap flex items-start md:items-center gap-5'>
                    {
                        navlinks.map(
                            (link, idx) => <Link
                                href={link.path}
                                key={idx}
                                target={link.target ? '_blank' : '_self'}
                                className='text-sm text-white transaction-all duration-200 ease-in-out cursor-pointer'
                            >
                                {link.name}
                            </Link>
                        )
                    }
                </ul>

                <hr className='w-full h-px mt-5 bg-white'/>

                <p className='text-center text-white font-semibold mt-10'>Made by ❤ <Link href={'http://nikhilsai.in'} className='underline'>Nikhil Sai</Link></p>
            </div>
        </footer>
    )
}

export default Footer