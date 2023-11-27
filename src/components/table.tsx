import { fileInterface } from "~/pages/interface";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/router";

const Table = ({
  dataTable,
  actionType,
}: {
  dataTable: fileInterface["table"];
  actionType: string;
}) => {
  return (
    <table className="table table-zebra table-sm">
      <thead className="bg-primary text-white">
        <tr>
          {dataTable["rows"].map((row: string) => {
            return <th>{row}</th>;
          })}
        </tr>
      </thead>
      <tbody className="h-fit">
        {dataTable["cols"].map((col: any) => {
          return (
            <tr key={col.id}>
              <td>{col.id}</td>
              <td>
                {actionType === "group" ? (
                  <Icon
                    className="h-6 w-6 text-primary"
                    icon={"bi:folder-fill"}
                  />
                ) : (
                  <Icon
                    className="h-6 w-6 text-primary"
                    icon={"mdi:file-document-outline"}
                  />
                )}
              </td>
              <td>{col.name}</td>
              {actionType === "group" ? (
                <td>{col.files}</td>
              ) : (
                <td>{col.state}</td>
              )}
              <td>22/4/2004</td>
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
        onClick={() => {
          const modal = document.getElementById("leave_modal");
          if (modal !== null) {
            /// todo : send file to redux
            // dispatch({ type: LOAD_MODAL_DATA, file });
            modal.showModal();
          }
        }}
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
        onClick={() => {
          const modal = document.getElementById("update_modal");
          if (modal !== null) {
            /// todo : send file to redux
            // dispatch({ type: LOAD_MODAL_DATA, file });
            modal.showModal();
          }
        }}
      />
      <Icon className="h-6 w-6 " icon={"solar:download-outline"} />
      <Icon
        className="h-6 w-6 text-red-500"
        icon={"ant-design:delete-outlined"}
        onClick={() => {
          const modal = document.getElementById("delete_modal");
          if (modal !== null) {
            /// todo : send file to redux
            // dispatch({ type: delete_modal_MODAL_DATA, file });
            modal.showModal();
          }
        }}
      />
    </td>
  );
}
