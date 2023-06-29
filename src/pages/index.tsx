import GetStarted from "<@>/components/home/GetStarted";
import HowToJoin from "<@>/components/home/HowToJoin";
import Landing from "<@>/components/home/Landing";
import Partners from "<@>/components/home/Partners";
import Welcome from "<@>/components/home/Welcome";
import "apexcharts/dist/apexcharts.css";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>home</title>
      </Head>
      <main className="flex flex-col bg-primarybg">
        <Landing />
        <Welcome />
        <HowToJoin />
        <Partners />
        <GetStarted />
      </main>
    </>
  );
}
