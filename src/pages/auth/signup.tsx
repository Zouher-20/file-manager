import Link from "next/link";
import { FormEventHandler } from "react";
import { AuthLayout } from "~/components/AuthLayout";
import { api } from "~/utils/api";
export default function Signup() {
  const { isLoading, mutateAsync } = api.user.create.useMutation();

  const signup: FormEventHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    await mutateAsync({
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
      confirmPassword: formData.get("confirmPassword")?.toString() || "",
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <AuthLayout>
      <form onSubmit={signup}>
        <h3 className="mb-6 text-3xl">
          Lets Get <span className="text-primary">Started</span> 🔥
        </h3>
        <div className="form-control w-full max-w-xs">
          <label htmlFor="name" className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            required
            id="name"
            name="name"
            type="text"
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>
        <div className="form-control mt-2 w-full max-w-xs">
          <label htmlFor="email" className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            required
            id="email"
            name="email"
            type="email"
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>
        <div className="form-control mt-2  w-full max-w-xs">
          <label htmlFor="password" className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            required
            minLength={8}
            id="password"
            name="password"
            type="password"
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>
        <div className="form-control mb-12 mt-2 w-full max-w-xs">
          <label htmlFor="confirm-password" className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input
            required
            minLength={8}
            id="confirm-password"
            name="confirmPassword"
            type="password"
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="btn btn-primary w-full hover:shadow-lg hover:shadow-primary/40"
        >
          Signup
        </button>

        <div className="mb-3 mt-5 text-center">
          Already has an account?{" "}
          <Link href="/auth/signin" className="link-hover link-primary link">
            signin
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
