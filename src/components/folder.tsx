import { Icon } from "@iconify/react/dist/iconify.js";
import { fileInterface } from "~/pages/interface";

const Folder = ({ card }: { card: fileInterface["card"] }) => {
  return (
    <div className="flex h-32 flex-col gap-4 rounded-lg bg-gray-100 p-4 text-sm">
      {/* <div className="flex flex-row-reverse gap-2"></div> */}
      <div className="flex">
        <Icon
          className="mr-auto h-12 w-12 text-primary"
          icon={"bi:folder-fill"}
        />
        <div>
          <div className="avatar-group -space-x-4 rtl:space-x-reverse">
            <div className="avatar placeholder h-10 w-10">
              <div className="h-10 w-10 rounded-full bg-neutral text-neutral-content">
                <Icon
                  className="mt-auto h-10 w-10 "
                  icon={"formkit:avatarman"}
                />
              </div>
            </div>
            <div className="avatar placeholder h-10 w-10">
              <div className="h-10 w-10 rounded-full bg-neutral text-neutral-content">
                <Icon
                  className="mt-auto h-10 w-10 "
                  icon={"formkit:avatarwoman"}
                />
              </div>
            </div>
            <div className="avatar placeholder h-10 w-10">
              <div className="h-10 w-10 bg-neutral pb-1 text-neutral-content">
                <span className=" p-2">+3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid">
        <span className=" font-bold">{card.name}</span>
        <span className=" text-gray-500">{card.state} files</span>
      </div>
    </div>
  );
};

export default Folder;
