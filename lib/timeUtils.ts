export function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })
}

export function adjustTime(time: string, offsetMinutes: number): string {
  const date = new Date(time)
  date.setMinutes(date.getMinutes() + offsetMinutes)
  return date.toISOString()
}

