import { Suspense } from "react"
import TimeZoneApp from "./TimeZoneApp"

const initialTimeZones = ["America/New_York", "Europe/London", "Asia/Tokyo", "Australia/Sydney", "Pacific/Auckland"]

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">World Time Zone App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <TimeZoneApp initialTimeZones={initialTimeZones} />
      </Suspense>
    </main>
  )
}

