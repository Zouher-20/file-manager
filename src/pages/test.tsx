import { api } from "~/utils/api";

export default function test() {
  const fileMutation = api.file.create.useMutation();

  return (
    <>
      <h1>Hello world </h1>
    </>
  );
}
