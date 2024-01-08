import GroupCard from "~/components/cards/Group";
import { useEffect, useState } from "react";
import ConfirmModal from "~/components/modal/ConfirmModal";
import { MainLayout } from "~/components/layout/MainLayout";
import { api } from "~/utils/api";
import { Group } from "@prisma/client";
import NoGroupsCaption from "~/components/NoGroupsCaption";
import toast from "react-hot-toast";
import UsersModal from "~/components/modal/UsersModal";
import CreateGroupModal from "~/components/modal/CreateGroupModal";
import UpdateGroupModal from "~/components/modal/UpdateGroupModal";

const MyGroups = () => {
  const { data, isLoading, refetch, isSuccess } =
    api.file.getUserGroups.useQuery({});

  const sharedGroups = api.file.getSharedGroups.useQuery({});
  const createGroupMutation = api.file.addNewGroup.useMutation();
  const updateGroupMutation = api.file.updateGroup.useMutation();
  const deltetGroupMutation = api.file.deleteGroup.useMutation();
  const leaveGroupMutation = api.file.leaveGroup.useMutation();

  const [groupsData, setGroupsData] = useState<Group[]>([]);
  const [groupId, setGroupId] = useState<number | null>(null);

  useEffect(() => {
    if (data) setGroupsData(data);
  }, [isSuccess]);

  const Submit = (inputObj: {
    name: string;
    checkinTimeOut: number;
    filesLimit: number;
    usersLimit: number;
  }) => {
    createGroupMutation.mutateAsync(inputObj).then((res) => {
      if (res?.id) {
        setGroupsData([...groupsData, res]);
        toast.success("Group created successfully!");
        refetch();
      }
    });
  };

  const updateGroup = (inputObj: {
    name: string;
    checkinTimeOut: number;
    filesLimit: number;
    usersLimit: number;
  }) => {
    if (groupId)
      updateGroupMutation.mutateAsync({ groupId, ...inputObj }).then((res) => {
        if (res?.id) {
          var updated = [...groupsData];
          updated.splice(
            updated.findIndex((el) => el.id === groupId),
            1,
            res,
          );
          setGroupsData(updated);
          toast.success("Group name updated successfully!");
        }
      });
  };

  const deleteGroup = () => {
    if (groupId)
      deltetGroupMutation.mutateAsync(groupId).then((res) => {
        if (res?.id) {
          toast.success("Group deleted successfully!");
          setGroupsData(groupsData.filter((g) => g.id !== groupId));
        }
      });
  };

  const leaveGroup = () => {
    if (groupId)
      leaveGroupMutation.mutateAsync(groupId).then((res) => {
        if (res?.id) {
          toast.success("Group deleted successfully!");
          sharedGroups.refetch();
        }
      });
  };

  const openModal = (modalName: string) => {
    const modal = document.getElementById(modalName);
    if (modal !== null) {
      (modal as unknown as { showModal: () => void }).showModal();
    }
  };

  return (
    <>
      <CreateGroupModal
        btnLabel="create"
        title="create group"
        id="create-group-modal"
        color="success"
        onSubmit={(inputObj: {
          name: string;
          checkinTimeOut: number;
          filesLimit: number;
          usersLimit: number;
        }) => Submit(inputObj)}
      />
      {groupId && (
        <UpdateGroupModal
          btnLabel="update"
          title="update Group"
          id="update-group-modal"
          color="primary"
          groupId={groupId}
          onSubmit={(inputObj: {
            name: string;
            checkinTimeOut: number;
            filesLimit: number;
            usersLimit: number;
          }) => updateGroup(inputObj)}
        />
      )}
      <ConfirmModal
        id="leave-modal"
        title="Confirm leaving group"
        text="Are you sure you want to leave this group ?"
        btnLabel="Leave"
        color="error"
        callback={leaveGroup}
      />
      <ConfirmModal
        id="delete-modal"
        title="Confirm deleting group"
        text="Are you sure you want to delete this group ?"
        btnLabel="delete"
        color="error"
        callback={deleteGroup}
      />
      <MainLayout>
        <div className="flex flex-col gap-1">
          {groupId && <UsersModal groupId={groupId} />}
          <div className="mb-2 mt-6 flex items-center justify-between ">
            <h1 className="text-3xl font-bold">My Groups</h1>
            <button
              className="btn btn-success btn-sm capitalize text-base-100"
              onClick={() => openModal("create-group-modal")}
            >
              Create group
            </button>
          </div>
          {groupsData && groupsData.length > 0 ? (
            <div className="xs:overflow-x-hidden xs:px-12 grid grid-cols-2 gap-4  py-4 md:grid-cols-3 xl:grid-cols-5">
              {groupsData?.map((group: Group) => {
                return (
                  <div key={group.id}>
                    <GroupCard
                      onUpdateClicked={setGroupId}
                      onDeleteGroupClicked={setGroupId}
                      onUsersClicked={setGroupId}
                      group={group}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <NoGroupsCaption />
          )}

          <h1 className="mt-8 text-3xl font-bold">Shared Groups</h1>
          {sharedGroups.data && sharedGroups.data.length > 0 ? (
            <div className="xs:overflow-x-hidden xs:px-12 grid grid-cols-2 gap-4 py-4 md:grid-cols-3 xl:grid-cols-5">
              {sharedGroups.data?.map((group: Group) => {
                return (
                  <div key={group.id}>
                    <GroupCard onLeaveGroupClicked={setGroupId} group={group} />
                  </div>
                );
              })}
            </div>
          ) : (
            <NoGroupsCaption />
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default MyGroups;
