import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken, signIn } from "next-auth/react";
import Link from "next/link";
import { AuthLayout } from "~/components/layout/AuthLayout";
import { FormEvent, useState } from "react";

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [errorMessage , setErrorMessage] = useState('')

  const onSigininSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement);
    signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    }).then((res) => {
      if (res?.ok) window.location.replace("/");
      else {
        if(res?.status === 401) {
          setErrorMessage('Incorrect email or password!')
        }
        else {
          setErrorMessage('Please try again later')
        }
      }
    })
  };


  return (
    <AuthLayout>
      <form onSubmit={onSigininSubmit}>
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

        <div className="mb-3 mt-5 text-center">
          New to file-manager?
          <br />
          <Link
            href="/auth/signup"
            className="link-hover link-primary link font-bold"
          >
            Create an account
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
