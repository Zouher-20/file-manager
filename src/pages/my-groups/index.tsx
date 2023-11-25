import FolderCard from "~/components/folder";
import { Icon } from "@iconify/react/dist/iconify.js";
import { fileInterface } from "../interface";
import { useState } from "react";
import Table from "~/components/foldersTable";

const MyGroups = () => {
  const folders: fileInterface["folders"] = [
    { id: 1, name: "Book name aa1", state: "free", date: "22/4/2001" },
    { id: 2, name: "Book name aa1", state: "free", date: "22/4/2001" },
    { id: 3, name: "Book name aa1", state: "free", date: "22/4/2001" },
    { id: 4, name: "Book name aa1", state: "free", date: "22/4/2001" },
    { id: 5, name: "Book name aa1", state: "free", date: "22/4/2001" },
    { id: 6, name: "Book name aa1", state: "free", date: "22/4/2001" },
    { id: 7, name: "Book name aa1", state: "free", date: "22/4/2001" },
    // { id: 8, name: "Book name aa1", state: "free", date: "22/4/2001" },
    // { id: 9, name: "Book name aa1", state: "free", date: "22/4/2001" },
    // { id: 10, name: "Book name aa1", state: "free", date: "22/4/2001" },
    // { id: 11, name: "Book name aa1", state: "free", date: "22/4/2001" },
    // { id: 12, name: "Book name aa1", state: "free", date: "22/4/2001" },
    // { id: 13, name: "Book name aa1", state: "free", date: "22/4/2001" },
    // { id: 14, name: "Book name aa1", state: "free", date: "22/4/2001" },
    // { id: 15, name: "Book name aa1", state: "free", date: "22/4/2001" },
    // { id: 16, name: "Book name aa1", state: "free", date: "22/4/2001" },
  ];
  const [vertical, setVertical] = useState("grid");

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
