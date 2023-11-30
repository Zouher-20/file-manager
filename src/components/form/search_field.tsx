import { Icon } from "@iconify/react/dist/iconify.js";

export default function SearchFeild() {
  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered my-3 w-full"
      />
      <button className="btn btn-square ml-2">
        <Icon className="h-8 w-8" icon={"solar:magnifer-broken"} />
      </button>
    </div>
  );
}
