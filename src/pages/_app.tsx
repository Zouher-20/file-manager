import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { Inter } from "next/font/google";
export const inter = Inter({ subsets: ["latin"] });
import "~/styles/globals.css";
import { ThemeProvider } from "next-themes";
import Appbar from "~/components/appbar";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Exo_2 } from "next/font/google";
const roboto = Exo_2({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-exo-2",
});
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ThemeProvider>
          <Head>
            <title>File Manager</title>
            <meta
              name="description"
              content="a small functional file manager project"
            />
            <link rel="icon" href="/favicon.ico" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700&display=swap"
              rel="stylesheet"
            ></link>
          </Head>
          <Appbar />
          <div className="flex w-screen max-w-[1360px] justify-center px-8 py-3">
            <div className={`${inter.className} w-full  antialiased`}>
              <Component {...pageProps} />
            </div>
          </div>
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
