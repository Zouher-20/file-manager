import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/router";
import { Group, File } from "@prisma/client";

const openModal = (modalName: string) => {
  const modal = document.getElementById(modalName);
  if (modal !== null) {
    (modal as unknown as { showModal: () => void }).showModal();
  }
};

const Table = ({
  dataTable,
  actionType,
}: {
  dataTable: { rows: File[] | Group[]; cols: unknown };
  actionType: string;
}) => {
  return (
    <table className="table table-zebra table-sm">
      <thead className="bg-primary text-white">
        <tr>
          {dataTable["rows"].map((row: File | Group, index: number) => {
            return <th key={index}>{row.name}</th>;
          })}
        </tr>
      </thead>
      <tbody className="h-fit">
        {dataTable["cols"].map((col: any) => {
          return (
            <tr key={col.id}>
              <td>{col.id}</td>
              <td>{col.name}</td>
              {actionType === "group" ? (
                <td>{col.files}</td>
              ) : (
                <td>{col.state}</td>
              )}
              <td>{col.date}</td>
              {actionType === "group" ? (
                <GroupAction id={col.id} />
              ) : (
                <FilesAction />
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;

function GroupAction({ id }: { id: number }) {
  const router = useRouter();
  const HandleClick = (id: number) => {
    router.push({
      pathname: "/my-files",
      query: { id: id },
    });
  };

  return (
    <td className="flex gap-4">
      <Icon
        className="h-6 w-6 text-green-500"
        icon={"pajamas:details-block"}
        onClick={() => HandleClick(id)}
      />
      <Icon
        className="h-6 w-6 text-red-500"
        icon={
          "streamline:interface-logout-arrow-exit-frame-leave-logout-rectangle-right"
        }
        onClick={() => openModal("leave-modal")}
      />
    </td>
  );
}

function FilesAction() {
  return (
    <td className="flex gap-4 ">
      <Icon
        className="h-6 w-6 text-green-500"
        icon={"mynaui:edit-one"}
        onClick={() => openModal("update_modal")}
      />
      <Icon className="h-6 w-6 " icon={"solar:download-outline"} />
      <Icon
        className="h-6 w-6 text-red-500"
        icon={"ant-design:delete-outlined"}
        onClick={() => openModal("delete_modal")}
      />
    </td>
  );
}
