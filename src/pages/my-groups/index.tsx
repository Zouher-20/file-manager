import FolderCard from "~/components/folder";
import { Icon } from "@iconify/react/dist/iconify.js";
import { fileInterface } from "../interface";
import { useEffect, useState } from "react";
import Table from "~/components/foldersTable";

const MyGroups = () => {
  const [folders, setFolders] = useState([
    { id: 1, name: "Book name aa1", state: "free", date: "22/4/2001" },
    { id: 2, name: "Book name aa1", state: "free", date: "22/4/2001" },
    { id: 3, name: "Book name aa1", state: "free", date: "22/4/2001" },
  ]);
  const [vertical, setVertical] = useState("grid");
  const [groupName, setGroupName] = useState("");

  const Submit = () => {
    // create group there
    let obj = {
      id: folders.length + 1,
      name: groupName,
      state: "free",
      date: "22/4/2001",
    };
    setFolders((folders) => [...folders, obj]);
    setGroupName("");
  };

  const onChange = ({ target: e }) => {
    let name: string = groupName;
    name = e.value;
    setGroupName(name);
  };
  useEffect(() => {}, [folders]);

  return (
    <div className="flex h-[82vh] flex-col gap-1">
      <span className=" text-2xl font-bold">Groups (4)</span>
      <div className="mr-4 grid gap-4 sm:flex sm:flex-row-reverse">
        <div className="join join-vertical lg:join-horizontal">
          <div
            onClick={() => setVertical("grid")}
            className={
              "join-item flex justify-center px-2 py-1 " +
              (vertical === "grid" ? " bg-primary text-white" : "border")
            }
          >
            <Icon className="h-6 w-6" icon={"mingcute:grid-line"} />
          </div>
          <div
            onClick={() => setVertical("list")}
            className={
              "join-item flex justify-center px-2 py-1 " +
              (vertical === "list" ? " bg-primary text-white" : "border")
            }
          >
            <Icon className="h-6 w-6 " icon={"bi:list"} />
          </div>
        </div>
        <button
          className="btn btn-primary btn-sm capitalize text-white"
          onClick={() => document.getElementById("my_modal_1").showModal()}
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
                <button onClick={Submit} className="btn btn-primary text-white">
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
          <Table folders={folders} />
        )}
      </div>
    </div>
  );
};

export default MyGroups;
