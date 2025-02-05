import { NextResponse } from "next/server";

// export const revalidate = 1; // Revalidate every second

async function getTimeForZone(
  zone: string
): Promise<{ time: string; isLive: boolean }> {
  try {
    const response = await fetch(
      `https://worldtimeapi.org/api/timezone/${zone}`
      // { next: { revalidate: 60 } }
    );
    if (!response.ok) throw new Error("Failed to fetch time");
    const data = await response.json();
    console.log("🚀 ~ data1:", zone, data);
    return { time: data.datetime, isLive: true };
  } catch (error) {
    console.error(`Error fetching time for ${zone}:`, error);
    // Fallback to local date
    return {
      time: new Date().toLocaleString("en-US", { timeZone: zone }),
      isLive: false,
    };
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const zones = searchParams.get("zones")?.split(",") || [];

  if (zones.length === 0) {
    return NextResponse.json(
      { error: "No time zones provided" },
      { status: 400 }
    );
  }

  const timeData: Record<string, { time: string; isLive: boolean }> = {};

  for (const zone of zones) {
    timeData[zone] = await getTimeForZone(zone);
  }

  return NextResponse.json(timeData);
}
