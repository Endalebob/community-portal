<<<<<<< HEAD
import Image from "next/image";
import { Inter } from "next/font/google";
import Landing from "<@>/components/home/Landing";
import Welcome from "<@>/components/home/Welcome";
import HowToJoin from "<@>/components/home/HowToJoin";
import Partners from "<@>/components/home/Partners";
import GetStarted from "<@>/components/home/GetStarted";
=======
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Landing from '<@>/components/home/Landing'
import Welcome from '<@>/components/home/Welcome'
import HowToJoin from '<@>/components/home/HowToJoin'
import Partners from '<@>/components/home/Partners'
import GetStarted from '<@>/components/home/GetStarted'
>>>>>>> 7632e57 (implement landing page)

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex flex-col bg-primarybg">
<<<<<<< HEAD
      <Landing />
      <Welcome />
      <HowToJoin />
      <Partners />
      <GetStarted />
=======
      <Landing/>
      <Welcome/>
      <HowToJoin/>
      <Partners/>
      <GetStarted/>
>>>>>>> 7632e57 (implement landing page)
    </main>
  );
}
