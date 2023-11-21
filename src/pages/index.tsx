import Head from "next/head";
import { useEffect } from "react";
import { ThemeChanger } from "~/components/ThemeChanger";
export default function Home() {
  useEffect(() => {
    const theme = localStorage.getItem("theme") ?? "light";
    document.documentElement.setAttribute("data-theme", theme);
  });
  return (
    <>
      <Head>
        <title>File Manager</title>
        <meta
          name="description"
          content="a small functional file manager project"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ThemeChanger />
      </main>
    </>
  );
}
