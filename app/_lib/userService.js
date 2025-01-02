import prisma from "./prisma";

export async function getUserByEmail(email) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Could not fetch user.");
  }
}

export async function getActivity() {
  try {
    const data = await prisma.activity.findMany({
      include: { User: true },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAttacks() {
  try {
    const data = await prisma.attack.findMany();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.log(error);
  }
}

export async function getAttackOverview(data) {
  try {
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    const totalAttacks = data.length;

    const uniqueIps = new Set(data.map((item) => item.ipAddress));
    const uniqueIpCount = uniqueIps.size;

    const attackCounts = {};
    data.forEach((item) => {
      if (attackCounts[item.attackType]) {
        attackCounts[item.attackType]++;
      } else {
        attackCounts[item.attackType] = 1;
      }
    });

    return [
      {
        title: "Total Attacks",
        value: totalAttacks.toLocaleString(),
        description: "+20.1% from last month",
        icon: "💥",
      },
      {
        title: "Unique IPs",
        value: uniqueIpCount.toLocaleString(),
        description: "+180.1% from last month",
        icon: "🌐",
      },
      {
        title: "Total SMS Alerts",
        value: totalAttacks.toLocaleString(),
        description: "+201 since last hour",
        icon: "📱",
      },
    ];
  } catch (error) {
    console.error("Error fetching and processing attack data:", error);
    return [];
  }
}
