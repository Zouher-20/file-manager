import { Icon } from "@iconify/react/dist/iconify.js";

function NoGroups() {
  return <>
  <div className="flex my-6 gap-4 flex-col items-center justify-center">
    <Icon icon="solar:folder-broken" className="h-16 w-16" />
    <div className="text-center text-lg">
      You don't have any groups yet.
    </div>
  </div>
  </>;
}

export default NoGroups;
