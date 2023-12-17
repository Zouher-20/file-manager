import { Icon } from "@iconify/react/dist/iconify.js";
import { File } from "@prisma/client";
import dayjs from "dayjs";
import fromNow from "dayjs/plugin/relativeTime";
import { downloadFile } from "~/utils/helpers";
import DropDownMenu from "../DropDownMenu";
import { useSession } from "next-auth/react";
dayjs.extend(fromNow);
const openModal = (modalName: string) => {
  const modal = document.getElementById(modalName);
  if (modal !== null) {
    (modal as unknown as { showModal: () => void }).showModal();
  }
};

const FileCard = ({
  file,
  onDeleteClicked,
  onCheckinClicked,
  onEditClicked,
  onCheckoutClicked,
}: {
  file: File;
  onDeleteClicked: (id: number) => void;
  onCheckinClicked: (id: number) => void;
  onEditClicked: (id: number) => void;
  onCheckoutClicked: (id: number) => void;
}) => {
  const { data: session } = useSession();

  const dropDownItems = !file.takenById
    ? [
        {
          label: "Check-in",
          color: "success",
          action: () => {
            onCheckinClicked(file.id);
          },
        },
        {
          label: "Download",
          color: "secondary",
          action: () => {
            downloadFile(file.path);
          },
        },
      ]
    : file.takenById === session?.user?.id
      ? [
          {
            label: "Delete",
            color: "error",
            action: () => {
              openModal("delete-file-modal");
              onDeleteClicked(file.id);
            },
          },
          {
            label: "Edit",
            color: "info",
            action: () => {
              openModal("edit-file-modal");
              onEditClicked(file.id);
            },
          },
          {
            label: "Check-out",
            color: "warning",
            action: () => {
              onCheckoutClicked(file.id);
            },
          },
          {
            label: "Download",
            color: "secondary",
            action: () => {
              downloadFile(file.path);
            },
          },
        ]
      : [
          {
            label: "Download",
            color: "secondary",
            action: () => {
              downloadFile(file.path);
            },
          },
        ];

  return (
    <div className="relative flex flex-col gap-4 rounded-lg bg-base-200 px-4 py-2 text-sm">
      <div className="flex flex-row-reverse">
        <DropDownMenu items={dropDownItems} />
      </div>
      <div className="mb-auto flex justify-center">
        <Icon className="h-12 w-12 text-gray-500" icon={"ci:file-blank"} />
      </div>
      <div className="grid ">
        <span className="mr-auto text-lg font-bold">{file.name}</span>
        <div className="flex">
          <span className="mr-auto">{dayjs(file.createdAt).fromNow()}</span>
          {file.takenById ? (
            <span className="text-error">taken</span>
          ) : (
            <span className="text-success">free</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileCard;
