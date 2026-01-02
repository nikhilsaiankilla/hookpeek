import Image from "next/image"
import Navbar from "../../components/navbar"

export default function NotFoundPage() {
  return (
    <div className="w-full h-screen bg-red-500">
      <Navbar />
      <div className="w-full h-full flex items-center justify-center">
        <Image
          src={'/404.png'}
          width={400}
          height={400}
          alt="404 image"
          className="w-3/5 h-3/5 object-contain aspect-square"
        />
      </div>
    </div>
  )
}