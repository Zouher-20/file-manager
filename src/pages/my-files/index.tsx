import { Icon } from "@iconify/react/dist/iconify.js";
import { fileInterface } from "../interface";
import { useState, useEffect } from "react";
import Table from "~/components/table";
import UpdateModal from "~/components/modal/update_modal";
import DeleteModal from "~/components/modal/delete_modal";
import AddNewUserModal from "./../../components/modal/add_users_modal";
import GridListComponent from "~/components/grid_list_component";
import DropDownCommponent from "~/components/drop_down_component";
import FileCard from "~/components/card";
import { useRouter } from "next/router";

const MyFiles = (props) => {
  const router = useRouter();
  const id = router.query.id;
  const [vertical, setVertical] = useState("grid");
  const [group, setGroup] = useState({
    name: "",
    files: [{ id: 0, name: "", state: "", date: "" }],
  });
  const tableRows = ["", "Type", "Name", "State", "Date", "Actions"];

  useEffect(() => {
    if (id) {
      //getGroupFiles here
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
    } else {
      //getAllUserFile here
      const files: fileInterface["files"] = [
        { id: 1, name: "Book name aa1", state: "free", date: "22/4/2001" },
        { id: 2, name: "Book name aa1", state: "free", date: "22/4/2001" },
        { id: 3, name: "Book name aa1", state: "free", date: "22/4/2001" },
        { id: 4, name: "Book name aa1", state: "free", date: "22/4/2001" },
        { id: 5, name: "Book name aa1", state: "free", date: "22/4/2001" },
        { id: 6, name: "Book name aa1", state: "free", date: "22/4/2001" },
        { id: 7, name: "Book name aa1", state: "free", date: "22/4/2001" },
        { id: 8, name: "Book name aa1", state: "free", date: "22/4/2001" },
        { id: 9, name: "Book name aa1", state: "free", date: "22/4/2001" },
        { id: 10, name: "Book name aa1", state: "free", date: "22/4/2001" },
        { id: 11, name: "Book name aa1", state: "free", date: "22/4/2001" },
        { id: 12, name: "Book name aa1", state: "free", date: "22/4/2001" },
        { id: 13, name: "Book name aa1", state: "free", date: "22/4/2001" },
        { id: 14, name: "Book name aa1", state: "free", date: "22/4/2001" },
        { id: 15, name: "Book name aa1", state: "free", date: "22/4/2001" },
        { id: 16, name: "Book name aa1", state: "free", date: "22/4/2001" },
      ];
      setGroup({ name: "", files });
    }
  }, []);

  return (
    <div className="flex h-[82vh] flex-col gap-1">
      <AddNewUserModal />
      <UpdateModal />
      <DeleteModal />
      <span className=" text-2xl font-bold">
        {id ? group.name : "All Files"} {id}
      </span>
      <div className="my-2 mr-4 grid items-center gap-4 sm:flex sm:flex-row-reverse">
        <GridListComponent
          vertical={vertical}
          setVertical={(vertical: string) => setVertical(vertical)}
        />
        <DropDownCommponent
          defaultValue={"newest"}
          itemList={["newest", "latest"]}
          listName="Order by"
        />
        <DropDownCommponent
          defaultValue={"free"}
          itemList={["free", "used", "reserved"]}
          listName="Status"
        />

        {id && (
          <div className="flex w-full max-sm:justify-center">
            <button
              className="btn btn-square btn-outline btn-primary "
              onClick={() => {
                const modal = document.getElementById("add_user_modal");
                if (modal !== null) {
                  /// todo : send file to redux
                  // dispatch({ type: LOAD_MODAL_DATA, file });
                  modal.showModal();
                }
              }}
            >
              <Icon className="h-8 w-8" icon={"solar:user-broken"} />
            </button>
            <button className="btn btn-square btn-outline btn-primary mx-3">
              <Icon className="h-8 w-8" icon={"solar:add-folder-broken"} />
            </button>
          </div>
        )}
      </div>
      <div
        className={
          "xs:overflow-x-hidden xs:px-12 grid py-4 " +
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
          <Table
            dataTable={{ rows: tableRows, cols: group.files }}
            actionType="files"
          />
        )}
      </div>
    </div>
  );
};

export default MyFiles;
