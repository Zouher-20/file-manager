import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { Group, User } from "@prisma/client";
import DropDownMenu from "../DropDownMenu";
import { useSession } from "next-auth/react";

const openModal = (modalName: string) => {
  const modal = document.getElementById(modalName);
  if (modal !== null) {
    (modal as unknown as { showModal: () => void }).showModal();
  }
};

const Group = ({
  group,
  onDeleteGroupClicked,
  onChangeNameClicked,
  onLeaveGroupClicked,
}: {
  group: Group & { createdBy: Pick<User, "id" | "name"> };
  onDeleteGroupClicked: (id: number) => unknown;
  onChangeNameClicked: (id: number) => unknown;
  onLeaveGroupClicked: (id: number) => unknown;
}) => {
  const { data: session } = useSession();
  const dropDownItems =
    session?.user?.id === group.createdById
      ? [
          {
            label: "Change name",
            color: "primary",
            action: () => {
              openModal("change-name-modal");
              onChangeNameClicked(group.id);
            },
          },
          {
            label: "Delete",
            color: "error",
            action: () => {
              openModal("delete-modal");
              onDeleteGroupClicked(group.id);
            },
          },
        ]
      : [
          {
            label: "Leave",
            color: "error",
            action: () => {
              openModal("leave-modal");
              onLeaveGroupClicked(group.id);
            },
          },
        ];
  return (
    <div className="relative flex flex-col gap-4 rounded-lg bg-base-200 p-4 text-sm">
      <DropDownMenu items={dropDownItems} />
      <Link href={`/${group.id}`}>
        <div className="flex">
          <Icon
            className="mr-auto h-12 w-12 text-primary"
            icon={"bi:folder-fill"}
          />
          {/* <Avatars /> */}
        </div>
        <div className="grid">
          <span className="text-base font-bold">{group.name}</span>
          {session?.user?.id !== group.createdById && (
            <small>owner: {group.createdBy.name}</small>
          )}
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
