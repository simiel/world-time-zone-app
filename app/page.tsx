import { Suspense } from "react";
import TimeZoneApp from "./TimeZoneApp";

const initialTimeZones = [
  "Africa/Accra",
  "Asia/Kolkata",
  "America/New_York",
  "Europe/London",
  "Australia/Sydney",
];

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">World Time Zone App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <TimeZoneApp initialTimeZones={initialTimeZones} />
      </Suspense>
    </main>
  );
}
