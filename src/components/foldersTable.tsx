import { fileInterface } from "~/pages/interface";
import { Icon } from "@iconify/react/dist/iconify.js";

const Table = ({ folders }: { folders: fileInterface["folders"] }) => {
  return (
    <table className="table table-zebra table-sm">
      <thead className="bg-primary text-white">
        <tr>
          <th></th>
          <th>type</th>
          <th>Name</th>
          <th>State</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className="h-fit">
        {folders.map((folder: fileInterface["folder"]) => {
          return (
            <tr key={folder.id}>
              <th>{folder.id}</th>
              <td>
                <Icon
                  className="h-6 w-6 text-gray-500"
                  icon={"mdi:file-document-outline"}
                />
              </td>
              <td>{folder.name}</td>
              <td>{folder.state}</td>
              <td>22/4/2004</td>
              <td>actions</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
