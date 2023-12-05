import FolderCard from "~/components/cards/Folder";
import { fileInterface } from "./interface";
import { ChangeEvent, useEffect, useState } from "react";
import Table from "~/components/view/Table";
import GridListComponent from "~/components/form/GridList";
import LeaveModal from "~/components/modal/LeaveModal";
import { MainLayout } from "~/components/layout/MainLayout";
import Add_group_modal from "~/components/modal/AddGroupModal";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import {Group} from '@prisma/client'
const MyGroups = () => {

  const {data , isLoading} = api.file.getAllGroup.useQuery({})

  const [vertical, setVertical] = useState("grid");
  const tableRows = ["", "Name", "files", "Date", "Actions"];
  const Submit = (groupName: string) => {
    // create group there

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
        {data && <div
          className={
            "xs:overflow-x-hidden xs:px-12 grid overflow-y-auto py-4 " +
            (vertical === "grid" &&
              "gap-4 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-5")
          }
        >
          {vertical === "grid" ? (
            data?.map((folder : Group) => {
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
        </div>}
      </div>
    </MainLayout>
  );
};

export default MyGroups;
