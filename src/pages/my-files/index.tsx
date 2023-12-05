import { Icon } from "@iconify/react/dist/iconify.js";
import { fileInterface } from "../interface";
import { useState, useEffect } from "react";
import Table from "~/components/view/Table";
import UpdateModal from "~/components/modal/UpdateModal";
import DeleteModal from "~/components/modal/DeleteModal";
import AddNewUserModal from "../../components/modal/AddUsersModal";
import GridListComponent from "~/components/form/GridList";
import DropDownCommponent from "~/components/form/Dropdown";
import FileCard from "~/components/cards/File";
import { useRouter } from "next/router";
import { MainLayout } from "~/components/layout/MainLayout";
import AddFileModal from "~/components/modal/AddFileModal";

const MyFiles = () => {
  const router = useRouter();
  const id = router.query.id;
  const [vertical, setVertical] = useState("grid");
  const [group, setGroup] = useState({
    name: "",
    files: [{ id: 0, name: "", state: "", date: "" }],
  });
  const tableRows = ["", "Name", "State", "Date", "Actions"];

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

  const openModal = (modalName: string) => {
    const modal = document.getElementById(modalName);
    if (modal !== null) {
      (modal as unknown as { showModal: () => void }).showModal();
    }
  };
  return (
    <MainLayout>
      <div className="flex flex-col gap-2">
        <AddNewUserModal />
        <UpdateModal />
        <DeleteModal />
        <AddFileModal />
        <span className=" text-3xl font-bold">
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
            <div className="flex w-full gap-2 max-sm:justify-center">
              <button
                className="btn btn-square btn-outline btn-primary btn-sm "
                onClick={() => openModal("add_user_modal")}
              >
                <Icon className="h-6 w-6" icon={"solar:user-broken"} />
              </button>
              <button
                title="add-folder"
                type="button"
                className="btn btn-square btn-outline btn-primary btn-sm"
                onClick={() => openModal("add_file_modal")}
              >
                <Icon className="h-6 w-6" icon={"solar:add-folder-broken"} />
              </button>
            </div>
          )}
        </div>
        <div
          className={
            "grid overflow-x-hidden py-4 " +
            (vertical === "grid" &&
              "gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5")
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
    </MainLayout>
  );
};

export default MyFiles;
