import { Icon } from "@iconify/react/dist/iconify.js";
import { fileInterface } from "~/pages/interface";
import Link from "next/link";
import { Group } from "@prisma/client";

const openModal = (modalName: string) => {
  const modal = document.getElementById(modalName);
  if (modal !== null) {
    (modal as unknown as { showModal: () => void }).showModal();
  }
};

const Folder = ({ folder }: { folder: Group }) => {
  return (
    <div className="relative flex flex-col gap-4 rounded-lg bg-base-200 p-4 text-sm">
      <FileDropDown />
      <Link
        href={{
          pathname: "/my-files",
          query: { id: folder.id },
        }}
      >
        <div className="flex">
          <Icon
            className="mr-auto h-12 w-12 text-primary"
            icon={"bi:folder-fill"}
          />
          <Avatars />
        </div>
        <div className="grid">
          <span className="text-base font-bold">{folder.name}</span>
        </div>
      </Link>
    </div>
  );
};

export default Folder;

const Avatars = () => {
  return (
    <div>
      <div className="avatar-group -space-x-4 rtl:space-x-reverse">
        <div className="avatar placeholder">
          <div className="w-6 rounded-full bg-neutral p-4 text-neutral-content">
            <span>A</span>
          </div>
        </div>
        <div className="avatar placeholder">
          <div className="w-6 rounded-full bg-neutral p-4 text-neutral-content">
            <span>M</span>
          </div>
        </div>
        <div className="avatar placeholder h-10 w-10">
          <div className="h-10 w-10 bg-neutral pb-1 text-neutral-content">
            <span className=" p-2">+3</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function FileDropDown() {
  return (
    <div className="dropdown dropdown-end absolute right-1 top-1">
      <label tabIndex={0}>
        <Icon className="h-4 w-4 " icon={"pepicons-pop:dots-y"} />
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] w-32 rounded-box bg-base-100 p-2 shadow"
      >
        <li>
          <a onClick={() => openModal("leave_modal")}>leave</a>
        </li>
      </ul>
    </div>
  );
}
