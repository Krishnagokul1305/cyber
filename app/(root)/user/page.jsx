import { TableUi } from "@/app/_components/TableUi";
import { getActivity } from "@/app/_lib/userService";

export const revalidate = 0;
async function page() {
  const data = await getActivity();
  return (
    <div>
      <TableUi data={data} />
    </div>
  );
}

export default page;
