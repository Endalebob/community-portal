import HowToJoin from "<@>/components/home/HowToJoin";
import Landing from "<@>/components/home/Landing";
import Partners from "<@>/components/home/Partners";
import Welcome from "<@>/components/home/Welcome";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main className="flex flex-col bg-primarybg justify-center items-center">
        <Landing />
        <Partners />
        <Welcome />
        <HowToJoin />
      </main>
    </>
  );
}
