import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { Exo_2 } from "next/font/google";
export const exo = Exo_2({ subsets: ["latin"], weight: ["500", "300", "700"] });
import "~/styles/globals.css";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "../redux/store";

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
          </Head>
          <div className={`${exo.className} antialiased`}>
            <Component {...pageProps} />
          </div>
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
