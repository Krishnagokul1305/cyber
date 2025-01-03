import { TableUi } from "@/app/_components/TableUi";
import { getActivity } from "@/app/_lib/userService";

export const dynamic = "force-dynamic";
async function page() {
  const data = await getActivity();
  return (
    <div>
      <TableUi data={data} />
    </div>
  );
}

export default page;
