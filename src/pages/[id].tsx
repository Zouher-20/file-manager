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
dayjs.extend(fromNow);

const Files = () => {
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
  const checkinFileMutation = api.file.checkin.useMutation();
  const checkoutMutation = api.file.checkout.useMutation();

  const lastSync = useMemo(() => {
    return dayjs(dataUpdatedAt).fromNow();
  }, [minutesPassed]);

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
          toast.success("Group deleted successfully!");
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

  return (
    <>
      {" "}
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
        onSubmit={(form: { name: string; contents: string }) =>
          createFile(form)
        }
      />
      <MainLayout>
        {isLoading && <div className="text-xl">Loading...</div>}
        {isSuccess && !isLoading && data && (
          <div>
            <div className="my-6 flex items-center justify-between">
              <h1 className=" text-3xl font-bold">{data.name}</h1>
              <div className="space-x-2">
                <span className="text-xs">Last sync : {lastSync}</span>
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
                  className="btn btn-success btn-sm capitalize text-base-100"
                  onClick={() => {
                    openModal("create-file-modal");
                  }}
                >
                  Create file
                </button>
              </div>
            </div>
            {data?.files.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {data.files.map((file) => (
                  <FileCard
                    key={file.id}
                    onDeleteClicked={setFileId}
                    onCheckinClicked={checkinFile}
                    onCheckoutClicked={checkoutFile}
                    onEditClicked={setFileId}
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
