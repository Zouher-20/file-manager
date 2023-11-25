import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { fileInterface } from "~/pages/interface";
import { Icon } from "@iconify/react/dist/iconify.js";
import FileCard from "~/components/card";
import Table from "~/components/table";
import UpdateModal from "~/components/modal/update_modal";
import DeleteModal from "~/components/modal/delete_modal";

const Group = () => {
  const router = useRouter();
  const [group, setGroup] = useState({
    name: "",
    files: [{ id: 0, name: "", state: "", date: "" }],
  });
  const [vertical, setVertical] = useState("grid");

  useEffect(() => {
    //get group here and updte state ! setGroup(data)
    const data = {
      name: "Alpha group",
      files: [
        { id: 1, name: "Book name aa1", state: "free", date: "22/4/2001" },
        { id: 2, name: "Book name aa1", state: "free", date: "22/4/2001" },
        { id: 3, name: "Book name aa1", state: "free", date: "22/4/2001" },
        { id: 4, name: "Book name aa1", state: "free", date: "22/4/2001" },
        { id: 5, name: "Book name aa1", state: "free", date: "22/4/2001" },
        { id: 6, name: "Book name aa1", state: "free", date: "22/4/2001" },
        { id: 7, name: "Book name aa1", state: "free", date: "22/4/2001" },
        { id: 8, name: "Book name aa1", state: "free", date: "22/4/2001" },
        { id: 9, name: "Book name aa1", state: "free", date: "22/4/2001" },
      ],
    };
    setGroup(data);
  }, []);

  return (
    <div className="flex h-[82vh] flex-col gap-4 pt-4">
      <UpdateModal />
      <DeleteModal />
      <span className=" text-2xl font-bold">
        {group.name} {router.query.groupId}
      </span>
      <div className="mr-4 grid gap-4 pl-8 sm:flex">
        <span className=" text-2xl font-bold sm:mr-auto">Files (4)</span>
        <select
          className="select select-bordered select-primary select-sm w-full border-2 md:max-w-[25%] xl:max-w-[12%]"
          defaultValue={"free"}
        >
          <option>free</option>
          <option>used</option>
          <option>reserved</option>
        </select>
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
          "xs:overflow-x-hidden xs:px-12 grid overflow-y-auto  " +
          (vertical === "grid"
            ? "gap-4 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-5"
            : "")
        }
      >
        {vertical === "grid" ? (
          group.files.map((file: fileInterface["file"]) => {
            return (
              <div key={file.id}>
                <FileCard card={file} />
              </div>
            );
          })
        ) : (
          <Table files={group.files} />
        )}
      </div>
    </div>
  );
};

export default Group;
