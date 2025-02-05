import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatTime } from "@/lib/timeUtils"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"

interface ClockProps {
  zone: string
  time: string
  isLive: boolean
  onRemove: () => void
}

export function Clock({ zone, time, isLive, onRemove }: ClockProps) {
  const [currentTime, setCurrentTime] = useState(time)

  useEffect(() => {
    setCurrentTime(time)
  }, [time])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-sm font-medium">{zone}</CardTitle>
          <Badge variant={isLive ? "default" : "secondary"} className="mt-1">
            {isLive ? "Live" : "Local"}
          </Badge>
        </div>
        <Button variant="ghost" size="sm" onClick={onRemove}>
          Remove
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatTime(currentTime)}</div>
      </CardContent>
    </Card>
  )
}

