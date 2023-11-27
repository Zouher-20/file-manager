import FolderCard from "~/components/folder";
import { Icon } from "@iconify/react/dist/iconify.js";
import { fileInterface } from "../interface";
import { ChangeEvent, useEffect, useState } from "react";
import Table from "~/components/table";
import GridListComponent from "~/components/grid_list_component";
import LeaveModal from "~/components/modal/leave-modal";
import { MainLayout } from "~/components/MainLayout";

const MyGroups = () => {
  const [folders, setFolders] = useState<Array<fileInterface["folder"]>>([
    { id: 1, name: "Book name aa1", files: "15", date: "22/4/2001" },
    { id: 2, name: "Book name aa1", files: "45", date: "22/4/2001" },
    { id: 3, name: "Book name aa1", files: "27", date: "22/4/2001" },
  ]);
  const [vertical, setVertical] = useState("grid");
  const [groupName, setGroupName] = useState("");
  const tableRows = ["", "Type", "Name", "files", "Date", "Actions"];

  const Submit = () => {
    // create group there
    let obj = {
      id: folders.length + 1,
      name: groupName,
      files: "33",
      date: "22/4/2001",
    };
    setFolders((folders) => [...folders, obj]);
    setGroupName("");
  };

  const onChange = (e: ChangeEvent) => {
    let name: string = groupName;
    name = (e.target as HTMLInputElement).value;
    setGroupName(name);
  };
  useEffect(() => {}, [folders]);

  return (
    <MainLayout>
      <div className="flex h-[82vh] flex-col gap-1">
        <LeaveModal />
        <span className=" text-2xl font-bold">Groups (4)</span>
        <div className="mr-4 grid gap-4 sm:flex sm:flex-row-reverse">
          <GridListComponent
            vertical={vertical}
            setVertical={(vertical: string) => setVertical(vertical)}
          />
          <button
            className="btn btn-primary btn-sm capitalize text-base-100"
            onClick={() => {
              const modal = document.getElementById("my_modal_1");
              if (modal !== null) {
                modal?.showModal();
              }
            }}
          >
            Create group +
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <h3 className="text-center text-2xl font-bold text-primary">
                Create group
              </h3>
              <div className="flex flex-col gap-1 py-4">
                <label className="mb-1 font-bold">Name</label>
                <input
                  value={groupName}
                  onChange={(e) => onChange(e)}
                  type="text"
                  placeholder="Name"
                  className="input input-bordered input-primary w-full "
                />
              </div>
              <div className="modal-action ">
                <form method="dialog" className="flex gap-1">
                  <button className="btn">Close</button>
                  <button
                    onClick={Submit}
                    className="btn btn-primary text-base-100"
                  >
                    submit
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
        <div
          className={
            "xs:overflow-x-hidden xs:px-12 grid overflow-y-auto py-4 " +
            (vertical === "grid"
              ? "gap-4 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-5"
              : "")
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
