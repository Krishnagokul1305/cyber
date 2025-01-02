import { ChartUi } from "@/app/_components/ChartUi";
import DashboardCards from "@/app/_components/DashboardCards";
import { TableAttack } from "@/app/_components/TableAttacks";
import {
  getActivity,
  getAttackOverview,
  getAttacks,
} from "@/app/_lib/userService";

async function page() {
  // Fetch data from services
  const data = (await getActivity()) || [];
  const attack = await getAttacks();
  const Summary = await getAttackOverview(attack);

  console.log(attack);

  return (
    <div>
      <DashboardCards attack={Summary} />
      <div className="mt-5"></div>
      {/* <ChartUi activities={data} /> */}
      <TableAttack data={attack} />
    </div>
  );
}

export default page;
