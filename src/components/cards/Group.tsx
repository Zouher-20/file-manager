import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { Group } from "@prisma/client";
import DropDownMenu from "../DropDownMenu";

const dropDownItems = [
  {
    label: "Leave group",
    color : "error",
    action: () => openModal("leave_modal"),
  },
];

const openModal = (modalName: string) => {
  const modal = document.getElementById(modalName);
  if (modal !== null) {
    (modal as unknown as { showModal: () => void }).showModal();
  }
};

const Group = ({ group }: { group: Group }) => {
  return (
    <div className="relative flex flex-col gap-4 rounded-lg bg-base-200 p-4 text-sm">
      <DropDownMenu items={dropDownItems} />
      <Link
        href={{
          pathname: "/my-files",
          query: { id: group.id },
        }}
      >
        <div className="flex">
          <Icon
            className="mr-auto h-12 w-12 text-primary"
            icon={"bi:folder-fill"}
          />
          {/* <Avatars /> */}
        </div>
        <div className="grid">
          <span className="text-base font-bold">{group.name}</span>
        </div>
      </Link>
    </div>
  );
};

export default Group;

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

