import { getAllMembersAsArray } from "@/actions/actions";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export default async function Dashboard() {
  const membros = await getAllMembersAsArray();
  return (
    <div className="w-full flex flex-col gap-4 p-2 lg:p-4 mx-auto h-screen ">
      <DataTable columns={columns} data={membros} />
    </div>
  );
}
