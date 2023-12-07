import FolderCard from "~/components/cards/Folder";
import { useState } from "react";
import Table from "~/components/view/Table";
import GridListComponent from "~/components/form/GridList";
import LeaveModal from "~/components/modal/LeaveModal";
import { MainLayout } from "~/components/layout/MainLayout";
import AddGroupModal from "~/components/modal/AddGroupModal";
import { api } from "~/utils/api";
import { Group } from "@prisma/client";
import NoGroupsCaption from "~/components/NoGroupsCaption";
const MyGroups = () => {
  const { data, isLoading } = api.file.getAllGroup.useQuery({});
  const { mutateAsync , isSuccess , isError, error } = api.file.addNewGroup.useMutation();

  const [vertical, setVertical] = useState("grid");
  const tableRows = ["", "Name", "files", "Date", "Actions"];
  const Submit = (groupName: string) => {
    mutateAsync({groupName}).then((res)=>{
      console.log(res , isSuccess , isError, error);
    })
  };
  const openModal = (modalName: string) => {
    const modal = document.getElementById(modalName);
    if (modal !== null) {
      (modal as unknown as { showModal: () => void }).showModal();
    }
  };

  return (
    <MainLayout>
      <div className="flex h-[82vh] flex-col gap-1">
        <AddGroupModal onSubmit={(name: string) => Submit(name)} />
        <LeaveModal />
        <h1 className="text-3xl font-bold">My Groups</h1>
        <div className=" grid gap-4 sm:flex sm:flex-row-reverse">
          <GridListComponent
            vertical={vertical}
            setVertical={(vertical: string) => setVertical(vertical)}
          />
          <button
            className="btn btn-success btn-sm capitalize text-base-100"
            onClick={() => openModal("add_group_modal")}
          >
            Create group
          </button>
        </div>
        {data && data.length > 0 ? (
          <div
            className={
              "xs:overflow-x-hidden xs:px-12 grid overflow-y-auto py-4 " +
              (vertical === "grid" &&
                "gap-4 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-5")
            }
          >
            {vertical === "grid" ? (
              data?.map((folder: Group) => {
                return (
                  <div key={folder.id}>
                    <FolderCard folder={folder} />
                  </div>
                );
              })
            ) : (
              <Table
                dataTable={{ rows: tableRows, cols: data }}
                actionType="group"
              />
            )}
          </div>
        ) : (<NoGroupsCaption />)}
      </div>
    </MainLayout>
  );
};

export default MyGroups;
