import { fileInterface } from "~/pages/interface";
import { Icon } from "@iconify/react/dist/iconify.js";

const Table = ({ files }: { files: fileInterface["files"] }) => {
  return (
    <table className="table table-zebra table-sm border-2">
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
        {files.map((file: fileInterface["file"]) => {
          return (
            <tr key={file.id}>
              <th>{file.id}</th>
              <td>
                <Icon
                  className="h-6 w-6 text-gray-500"
                  icon={"mdi:file-document-outline"}
                />
              </td>
              <td>{file.name}</td>
              <td>{file.state}</td>
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
