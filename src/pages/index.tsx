import Image from 'next/image'
import { Inter } from 'next/font/google'
import Landing from '<@>/components/home/Landing'
import Welcome from '<@>/components/home/Welcome'
import HowToJoin from '<@>/components/home/HowToJoin'
import Partners from '<@>/components/home/Partners'
import GetStarted from '<@>/components/home/GetStarted'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex flex-col bg-primarybg">
      <Landing/>
      <Welcome/>
      <HowToJoin/>
      <Partners/>
      <GetStarted/>
    </main>
  )
}
