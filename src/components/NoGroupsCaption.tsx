import { Icon } from "@iconify/react/dist/iconify.js";

function NoGroups() {
  return (
    <>
      <div className="my-6 flex flex-col items-center justify-center gap-4">
        <Icon icon="solar:folder-broken" className="h-16 w-16" />
        <div className="text-center text-lg">There is no groups here yet</div>
      </div>
    </>
  );
}

export default NoGroups;
