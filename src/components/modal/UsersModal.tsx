import { Icon } from "@iconify/react/dist/iconify.js";
import { connect } from "react-redux";
import { User } from "@prisma/client";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { useMemo } from "react";

const mapStateToProps = (state: any) => ({
  ...state.ModalReducer,
});

function UsersModal({ groupId }: { groupId: number }) {
  const usersToAddQuery = api.user.getUsersOutsideGroup.useQuery(groupId);
  const usersInGroupQuery = api.user.getUsersInGroup.useQuery(groupId);
  const groupDataQuery = api.file.getGroupById.useQuery(groupId);

  const addToGroupMutation = api.user.addUserToGroup.useMutation();
  const removeFromGroupMutation = api.user.removeUserFromGroup.useMutation();

  const isAddingDisabled = useMemo(() => {
    if (groupDataQuery.data && usersInGroupQuery.data) {
      return usersInGroupQuery.data.length >= groupDataQuery.data.usersLimit;
    }
  }, [groupDataQuery.data, usersInGroupQuery.data]);

  const addToGroup = (id: string) => {
    addToGroupMutation.mutateAsync({ userId: id, groupId }).then((res) => {
      if (res?.id) {
        usersToAddQuery.refetch();
        usersInGroupQuery.refetch();
        toast.success("User added to group", {
          position: "bottom-right",
        });
      }
    });
  };

  const removeFromGroup = (id: string) => {
    removeFromGroupMutation.mutateAsync({ userId: id, groupId }).then((res) => {
      if (res?.id) {
        usersToAddQuery.refetch();
        usersInGroupQuery.refetch();
        toast.success("User removed from group", {
          position: "bottom-right",
        });
      }
    });
  };

  return (
    <dialog id="users-modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="mb-4 text-lg font-bold">Manage group users :</h3>
        {/* <SearchFeild /> */}

        {usersInGroupQuery.data && (
          <UserList
            out={false}
            addClicked={addToGroup}
            removeClicked={removeFromGroup}
            items={usersInGroupQuery.data}
          />
        )}
        {isAddingDisabled && (
          <div className="text-center text-error opacity-75">
            Can't add more users to group, users limit reached
          </div>
        )}
        {usersToAddQuery.data && !isAddingDisabled && (
          <UserList
            out={true}
            addClicked={addToGroup}
            removeClicked={removeFromGroup}
            items={usersToAddQuery.data}
          />
        )}
      </div>
    </dialog>
  );
}

export default connect(mapStateToProps)(UsersModal);

function UserList({
  items,
  out,
  addClicked,
  removeClicked,
}: {
  items: User[];
  out: boolean;
  addClicked: (id: string) => void;
  removeClicked: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 ">
      {items.map((item: any) => {
        return (
          <div
            className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-base-200"
            key={item.id}
          >
            <UserInUsersListComponent item={item} />
            <button
              onClick={() => {
                if (out) addClicked(item.id);
                else removeClicked(item.id);
              }}
              className="btn btn-circle btn-ghost btn-sm"
            >
              {out ? (
                <Icon
                  className="h-8 w-8 p-1 text-success"
                  icon={"tabler:user-plus"}
                />
              ) : (
                <Icon
                  className="h-8 w-8 p-1 text-error"
                  icon={"tabler:user-minus"}
                />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}

function UserInUsersListComponent({ item }: { item: User }) {
  return (
    <div className=" ">
      <p className="text-sm font-bold">{item.name}</p>
      <p className="text-xs font-medium">{item.email}</p>
    </div>
  );
}
