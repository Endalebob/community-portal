import RootLayout from "<@>/layout/default";
import { store } from "<@>/store";
import "<@>/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <RootLayout>
        <main className={"flex-grow flex flex-col" + inter.className}>
          <Component {...pageProps} />
        </main>
      </RootLayout>
    </Provider>
  );
}
