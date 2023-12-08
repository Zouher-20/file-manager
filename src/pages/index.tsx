import FolderCard from "~/components/cards/Group";
import { useEffect, useState } from "react";
import Table from "~/components/view/Table";
import GridListComponent from "~/components/form/GridList";
import LeaveModal from "~/components/modal/LeaveModal";
import { MainLayout } from "~/components/layout/MainLayout";
import GroupModal from "~/components/modal/GroupModal";
import { api } from "~/utils/api";
import { Group } from "@prisma/client";
import NoGroupsCaption from "~/components/NoGroupsCaption";

const MyGroups = () => {
  const { data, isLoading, isSuccess } = api.file.getAllGroup.useQuery({});
  const createGroupMutation = api.file.addNewGroup.useMutation();

  const [groupsData, setGroupsData] = useState<Group[]>([]);
  const [vertical, setVertical] = useState("grid");
  const tableRows = ["", "Name", "files", "Date", "Actions"];

  useEffect(() => {
    if (data) setGroupsData(data);
  }, [isSuccess]);

  const Submit = (groupName: string) => {
    createGroupMutation.mutateAsync({ groupName }).then((res) => {
      if (createGroupMutation.isSuccess && res)
        setGroupsData([...groupsData, res]);
    });
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
        <GroupModal
          btnLabel="create"
          title="create group"
          id="create-group-modal"
          color="success"
          onSubmit={(name: string) => Submit(name)}
        />
        <GroupModal
          btnLabel="change"
          title="Change Group Name"
          id="change-name-modal"
          color="info"
          onSubmit={(name: string) => Submit(name)}
        />
        <LeaveModal />
        <h1 className="text-3xl font-bold">My Groups</h1>
        <div className="flex gap-4 justify-between md:justify-start mt-6 md:flex-row-reverse">
          <GridListComponent
            vertical={vertical}
            setVertical={(vertical: string) => setVertical(vertical)}
          />
          <button
            className="btn btn-success btn-sm capitalize text-base-100"
            onClick={() => openModal("create-group-modal")}
          >
            Create group
          </button>
        </div>
        {groupsData && groupsData.length > 0 ? (
          <div
            className={
              "xs:overflow-x-hidden xs:px-12 grid overflow-y-auto py-4 " +
              (vertical === "grid" &&
                "gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-5")
            }
          >
            {vertical === "grid" ? (
              groupsData?.map((group: Group) => {
                return (
                  <div key={group.id}>
                    <FolderCard group={group} />
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
        ) : (
          <NoGroupsCaption />
        )}
      </div>
    </MainLayout>
  );
};

export default MyGroups;
