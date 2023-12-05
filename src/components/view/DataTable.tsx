import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/router";
import { Group, File } from "@prisma/client";
import { TableCol } from "shared-types";

const openModal = (modalName: string) => {
  const modal = document.getElementById(modalName);
  if (modal !== null) {
    (modal as unknown as { showModal: () => void }).showModal();
  }
};

function DataTable({
  records,
  fields,
}: {
  records: Array<Record<string, unknown>>;
  fields: Array<TableCol>;
}) {
  return (
    <table className="table table-zebra table-sm">
      <thead className="bg-primary text-white">
        <tr>
          {fields.map((field, index) => (
            <th key={index}>
              {field.label ??
                field.key.charAt(0).toUpperCase() + field.key.slice(1)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="h-fit">
        {records.map((record, index) => (
          <tr key={index}>
            {fields.map((field, index) => (
              <td key={index}>
                {field.formatter
                  ? field.formatter(record[field.key])
                  : `${record[field.key]}`}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
