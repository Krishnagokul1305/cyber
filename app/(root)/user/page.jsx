import { TableUi } from "@/app/_components/TableUi";
import { getActivity } from "@/app/_lib/userService";

async function page() {
  // Fetch activity data
  const data = await getActivity();
console.log(data)
  return (
    <div>
      <TableUi data={data} />
    </div>
  );
}

export default page;
