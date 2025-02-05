import { useState, useEffect, useCallback } from "react"
import { adjustTime } from "@/lib/timeUtils"

interface TimeData {
  time: string
  isLive: boolean
}

export function useTimeZones(initialZones: string[]) {
  const [timeZones, setTimeZones] = useState(initialZones)
  const [times, setTimes] = useState<Record<string, TimeData>>({})
  const [offset, setOffset] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const fetchTimes = useCallback(async () => {
    setIsLoading(true)
    const query = new URLSearchParams({ zones: timeZones.join(",") }).toString()
    try {
      const response = await fetch(`/api/time?${query}`)
      if (!response.ok) throw new Error("Failed to fetch times")
      const data = await response.json()
      
      // Ensure each timezone has its own distinct time
      const processedData: Record<string, TimeData> = {}
      for (const zone of timeZones) {
        if (data[zone]) {
          processedData[zone] = {
            time: new Date(data[zone].time).toISOString(),
            isLive: data[zone].isLive
          }
        }
      }
      setTimes(processedData)
    } catch (error) {
      console.error("Error fetching times:", error)
    } finally {
      setIsLoading(false)
    }
  }, [timeZones])

  useEffect(() => {
    fetchTimes()
    const fetchInterval = setInterval(fetchTimes, 60000) // Fetch from server every minute

    const updateInterval = setInterval(() => {
      setTimes((prevTimes) => {
        const newTimes: Record<string, TimeData> = {}
        for (const [zone, data] of Object.entries(prevTimes)) {
          const date = new Date(data.time)
          date.setSeconds(date.getSeconds() + 1)
          newTimes[zone] = { ...data, time: date.toISOString() }
        }
        return newTimes
      })
    }, 1000) // Update every second

    return () => {
      clearInterval(fetchInterval)
      clearInterval(updateInterval)
    }
  }, [fetchTimes])

  const getAdjustedTimes = useCallback(() => {
    if (offset === 0) return times
    const adjustedTimes: Record<string, TimeData> = {}
    for (const [zone, data] of Object.entries(times)) {
      adjustedTimes[zone] = { ...data, time: adjustTime(data.time, offset) }
    }
    return adjustedTimes
  }, [times, offset])

  const addTimeZone = useCallback(
    (newZone: string) => {
      if (newZone && !timeZones.includes(newZone)) {
        setTimeZones((prev) => [...prev, newZone])
        setIsLoading(true) // Set loading to true when adding a new time zone
      }
    },
    [timeZones],
  )

  const removeTimeZone = useCallback((zone: string) => {
    setTimeZones((prev) => prev.filter((tz) => tz !== zone))
  }, [])

  return {
    timeZones,
    times: getAdjustedTimes(),
    offset,
    setOffset,
    addTimeZone,
    removeTimeZone,
    isLoading,
  }
}

