import FolderCard from "~/components/cards/folder";
import { fileInterface } from "./interface";
import { ChangeEvent, useEffect, useState } from "react";
import Table from "~/components/form/table";
import GridListComponent from "~/components/form/grid_list_component";
import LeaveModal from "~/components/modal/leave-modal";
import { MainLayout } from "~/components/layout/MainLayout";
import Add_group_modal from "~/components/modal/add_group_modal";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

const MyGroups = () => {
  const [folders, setFolders] = useState<Array<fileInterface["folder"]>>([
    { id: 1, name: "Book name aa1", files: "15", date: "22/4/2001" },
    { id: 2, name: "Book name aa1", files: "45", date: "22/4/2001" },
    { id: 3, name: "Book name aa1", files: "27", date: "22/4/2001" },
    { id: 4, name: "Book name aa1", files: "27", date: "22/4/2001" },
    { id: 5, name: "Book name aa1", files: "27", date: "22/4/2001" },
  ]);
  const [vertical, setVertical] = useState("grid");
  const tableRows = ["", "Name", "files", "Date", "Actions"];
  const Submit = (groupName: string) => {
    // create group there
    let obj = {
      id: folders.length + 1,
      name: groupName,
      files: "33",
      date: "22/4/2001",
    };
    setFolders((folders) => [...folders, obj]);
  };
  const openModal = (modalName: string) => {
    const modal = document.getElementById(modalName);
    if (modal !== null) {
      (modal as unknown as { showModal: () => void }).showModal();
    }
  };
  // api.file.getAllGroup.useQuery({ page: 1, pageSize: 10 });

  useEffect(() => {}, [folders]);

  return (
    <MainLayout>
      <div className="flex h-[82vh] flex-col gap-1">
        <Add_group_modal onSubmit={(name: string) => Submit(name)} />
        <LeaveModal />
        <span className=" text-3xl font-bold">Groups (4)</span>
        <div className=" grid gap-4 sm:flex sm:flex-row-reverse">
          <GridListComponent
            vertical={vertical}
            setVertical={(vertical: string) => setVertical(vertical)}
          />
          <button
            className="btn btn-primary btn-sm capitalize text-base-100"
            onClick={() => openModal("add_group_modal")}
          >
            Create group +
          </button>
        </div>
        <div
          className={
            "xs:overflow-x-hidden xs:px-12 grid overflow-y-auto py-4 " +
            (vertical === "grid" &&
              "gap-4 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-5")
          }
        >
          {vertical === "grid" ? (
            folders.map((folder: fileInterface["folder"]) => {
              return (
                <div key={folder.id}>
                  <FolderCard folder={folder} />
                </div>
              );
            })
          ) : (
            <Table
              dataTable={{ rows: tableRows, cols: folders }}
              actionType="group"
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default MyGroups;
