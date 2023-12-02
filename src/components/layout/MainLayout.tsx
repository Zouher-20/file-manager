import { PropsWithChildren } from "react";
import Appbar from "./Appbar";

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Appbar />
      <div className="container mx-auto flex w-screen justify-center p-4">
        <div className="w-full">{children}</div>
      </div>
    </>
  );
}
