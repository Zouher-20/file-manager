import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { Group, User } from "@prisma/client";
import DropDownMenu from "../DropDownMenu";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const openModal = (modalName: string) => {
  const modal = document.getElementById(modalName);
  if (modal !== null) {
    (modal as unknown as { showModal: () => void }).showModal();
  }
};

const Group = ({
  group,
  onDeleteGroupClicked,
  onUpdateClicked,
  onLeaveGroupClicked,
  onUsersClicked,
}: {
  group: Group & { createdBy: Pick<User, "id" | "name"> };
  onDeleteGroupClicked: (id: number) => void;
  onUpdateClicked: (id: number) => void;
  onLeaveGroupClicked: (id: number) => void;
  onUsersClicked: (id: number) => void;
}) => {
  const { data: session } = useSession();
  const dropDownItems =
    session?.user?.id === group.createdById
      ? [
          {
            label: "Update",
            color: "primary",
            action: () => {
              onUpdateClicked(group.id);
              setTimeout(() => {
                openModal("update-group-modal");
              }, 0);
            },
          },
          {
            label: "Users",
            color: "success",
            action: () => {
              onUsersClicked(group.id);
              setTimeout(() => {
                openModal("users-modal");
              }, 0);
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
            color: "warning",
            action: () => {
              openModal("leave-modal");
              onLeaveGroupClicked(group.id);
            },
          },
        ];
  return (
    <div className="relative flex flex-col gap-4 rounded-lg bg-base-200 p-6 text-sm">
      <DropDownMenu items={dropDownItems} />
      <Link href={`/${group.id}`}>
        <div className="flex">
          <Icon
            className="mr-auto h-12 w-12 text-primary"
            icon={"bi:folder-fill"}
          />
          {/* <Avatars /> */}
        </div>
        <h3 className="text-base font-bold">{group.name}</h3>
        <div className="mt-1 flex flex-col gap-1 px-1">
          {session?.user?.id !== group.createdById && (
            <div className="flex items-center gap-2">
              <Icon className="inline h-4 w-4" icon={"solar:user-broken"} />
              {group.createdBy.name}
            </div>
          )}
          <time className="flex items-center gap-2 text-xs font-light">
            <Icon
              className="inline h-4 w-4"
              icon={"solar:clock-circle-broken"}
            />
            {dayjs(group.createdAt).fromNow()}
          </time>
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
