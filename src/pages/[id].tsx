import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import NoFilesCaption from "~/components/NoFilesCaption";
import FileCard from "~/components/cards/File";
import { MainLayout } from "~/components/layout/MainLayout";
import ConfirmModal from "~/components/modal/ConfirmModal";
import FileModal from "~/components/modal/FileModal";
import { api } from "~/utils/api";
import fromNow from "dayjs/plugin/relativeTime";
import { EditModal } from "~/components/modal/EditModal";
import { useSession } from "next-auth/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
dayjs.extend(fromNow);
const Files = () => {
  const { data: session } = useSession();
  const [fileId, setFileId] = useState<number | null>(null);

  const [minutesPassed, setMinutesPassed] = useState<number>(0);
  setInterval(() => {
    setMinutesPassed(minutesPassed + 1);
  }, 60000);

  const router = useRouter();

  const { data, isSuccess, isLoading, dataUpdatedAt, refetch } =
    api.file.getAllFileInGroup.useQuery({
      groupId: parseInt(router.query?.id as string),
    });

  const createFileMutation = api.file.createFile.useMutation();
  const deleteFileMutation = api.file.deleteFile.useMutation();
  const editFileMutation = api.file.deleteFile.useMutation();
  const checkinFileMutation = api.file.checkin.useMutation();
  const bulkCheckinMutation = api.file.bulkCheckin.useMutation();
  const checkoutMutation = api.file.checkout.useMutation();

  const lastSync = useMemo(() => {
    return dayjs(dataUpdatedAt).fromNow();
  }, [minutesPassed]);

  const canEditFile = useMemo(() => {
    var fileQuery = data?.files.find((file) => file.id === fileId);
    return session?.user?.id === fileQuery?.takenById;
  }, [fileId]);

  const [bulkSet, setBulkSet] = useState<Array<number>>([]);
  const openModal = (modalName: string) => {
    const modal = document.getElementById(modalName);
    if (modal !== null) {
      (modal as unknown as { showModal: () => void }).showModal();
    }
  };

  const createFile = ({
    name,
    contents,
  }: {
    name: string;
    contents: string;
  }) => {
    if (data && data.id)
      createFileMutation
        .mutateAsync({ name, contents, groupId: data?.id })
        .then((res) => {
          if (res?.id) {
            toast.success("File created successfully!");
            refetch();
            setMinutesPassed(minutesPassed + 1);
          }
        });
  };

  const deleteFile = () => {
    if (fileId)
      deleteFileMutation.mutateAsync(fileId).then((res) => {
        if (res?.id) {
          toast.success("File deleted successfully!");
          refetch();
          setMinutesPassed(minutesPassed + 1);
        }
      });
  };

  const editFile = () => {
    if (fileId)
      editFileMutation.mutateAsync(fileId).then((res) => {
        if (res?.id) {
          toast.success("File Updated successfully!");
          refetch();
          setMinutesPassed(minutesPassed + 1);
        }
      });
  };

  const checkinFile = (id: number) => {
    checkinFileMutation.mutateAsync(id).then((res) => {
      if (res?.id) {
        toast.success("File is checked in by you now");
        refetch();
        setMinutesPassed(minutesPassed + 1);
      }
    });
  };

  const checkoutFile = (id: number) => {
    checkoutMutation.mutateAsync(id).then((res) => {
      if (res?.id) {
        toast.success("File is free to use now");
        refetch();
        setMinutesPassed(minutesPassed + 1);
      }
    });
  };

  const updateBulkSet = (id: number, isChecked: boolean) => {
    if (isChecked) setBulkSet([...bulkSet, id]);
    else {
      setBulkSet(bulkSet.filter((arrId) => arrId !== id));
    }
  };

  const bulkCheckin = () => {
    bulkCheckinMutation.mutateAsync(bulkSet).then((res) => {
      if (res?.count) {
        toast.success("Files are checked in by you now");
        refetch();
        setMinutesPassed(minutesPassed + 1);
        setBulkSet([]);
      }
    });
  };

  const isBulkInvoked = useMemo(() => {
    return bulkSet.length > 0;
  }, [bulkSet]);

  const isCreationDisabled = useMemo(() => {
    if (data) return data?.files.length >= data?.filesLimit;
  }, [data]);

  return (
    <>
      <ConfirmModal
        id="delete-file-modal"
        title="Confirm deleting file"
        text="Are you sure you want to delete this file ?"
        btnLabel="Delete"
        color="error"
        callback={deleteFile}
      />

      <FileModal
        btnLabel="create"
        title="create file"
        id="create-file-modal"
        color="success"
        onSubmit={createFile}
      />

      {fileId && (
        <EditModal
          id="edit-file-modal"
          fileId={fileId}
          isCheckedIn={canEditFile}
          onSubmit={editFile}
        />
      )}

      <MainLayout>
        {isLoading && <div className="text-xl">Loading...</div>}
        {isSuccess && !isLoading && data && (
          <div>
            <Link className="block w-fit hover:text-primary" href="/">
              <Icon icon="solar:arrow-left-broken" className="h-10 w-10 " />
            </Link>
            <div className="mb-6 mt-2 flex items-center justify-between">
              <h1 className=" text-3xl font-bold">
                {data.name}
                <span className="block text-xs">Last sync : {lastSync}</span>
              </h1>
              <div className="flex flex-col gap-4">
                <div className="space-x-2">
                  <button
                    className="btn btn-info btn-sm capitalize text-base-100"
                    onClick={async () => {
                      await refetch();
                      setMinutesPassed(minutesPassed + 1);
                    }}
                  >
                    sync
                  </button>
                  <button
                    disabled={isCreationDisabled}
                    className="btn btn-success btn-sm capitalize text-base-100"
                    onClick={() => {
                      openModal("create-file-modal");
                    }}
                  >
                    Create file
                  </button>
                </div>
                {isBulkInvoked && (
                  <div className=" text-sm text-info">
                    selected : {bulkSet.length}{" "}
                    <button
                      onClick={bulkCheckin}
                      className="btn btn-primary btn-sm ms-1"
                    >
                      Checkin
                    </button>
                  </div>
                )}
              </div>
            </div>
            {data?.files.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                {data.files.map((file) => (
                  <FileCard
                    key={file.id}
                    onDeleteClicked={setFileId}
                    onCheckinClicked={checkinFile}
                    onCheckoutClicked={checkoutFile}
                    onEditClicked={setFileId}
                    onSelected={updateBulkSet}
                    file={file}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-6">
                <NoFilesCaption />
              </div>
            )}
          </div>
        )}
      </MainLayout>
    </>
  );
};

export default Files;
