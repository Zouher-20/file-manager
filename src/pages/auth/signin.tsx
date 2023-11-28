import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken } from "next-auth/react";
import Link from "next/link";
import { AuthLayout } from "~/components/layout/AuthLayout";
import { useRouter } from "next/router";
import { useMemo } from "react";

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const errorMessage = useMemo(() => {
    if (router.query.error === "CredentialsSignin")
      return "Incorrect Email or Password";
    else return null;
  }, [router.query.error]);

  return (
    <AuthLayout>
      <form method="post" action="/api/auth/callback/credentials">
        <h3 className="mb-6 text-3xl">Welcome Back 👋</h3>

        {/* Alert for error */}
        {errorMessage && (
          <div
            role="alert"
            className="alert my-2 border border-error bg-error bg-opacity-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-error"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span className="text-error">{errorMessage}</span>
          </div>
        )}

        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <div className="form-control w-full max-w-xs">
          <label htmlFor="email" className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="input input-bordered input-primary w-full max-w-xs"
            required
          />
        </div>
        <div className="form-control mb-12 mt-2  w-full max-w-xs">
          <label htmlFor="password" className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="input input-bordered input-primary  w-full max-w-xs"
            required
            minLength={8}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full hover:shadow-lg hover:shadow-primary/40"
        >
          Signin
        </button>

        <div className="mb-3 mt-5">
          New to file-manager?{" "}
          <Link href="/auth/signup" className="link-hover link-primary link">
            create new account
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
