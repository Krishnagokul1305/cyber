import { ChartUi } from "@/app/_components/ChartUi";
import DashboardCards from "@/app/_components/DashboardCards";
import { TableAttack } from "@/app/_components/TableAttacks";
import {
  getActivity,
  getAttackOverview,
  getAttacks,
} from "@/app/_lib/userService";

export const revalidate = 0;

async function page() {
  const data = (await getActivity()) || [];
  const attack = await getAttacks();
  const Summary = await getAttackOverview(attack);
  console.log(data);
  return (
    <div>
      <DashboardCards attack={Summary} />
      <div className="my-5 grid grid-cols-[2fr_4fr] gap-6">
        <ChartUi />
        <TableAttack data={attack} />
      </div>
    </div>
  );
}

export default page;
