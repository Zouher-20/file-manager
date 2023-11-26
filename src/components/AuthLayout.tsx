import { PropsWithChildren } from "react";

export function AuthLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="card w-96 border  border-primary border-opacity-50  bg-base-200 shadow-xl">
          <div className="card-body">{children}</div>
        </div>
      </div>
    </>
  );
}
