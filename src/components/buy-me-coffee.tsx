import { Coffee } from 'lucide-react'
import Link from 'next/link'

const BuyMeCoffee = () => {
    return (
        <Link
            href={'https://buymeacoffee.com/nikhilsaiankilla'}
            target='_blank'
            className='w-fit p-3 rounded-full bg-amber-300 flex items-center justify-center fixed right-2.5 bottom-2.5'
        >
            <Coffee size={18} className='text-black'/>
        </Link>
    )
}

export default BuyMeCoffee