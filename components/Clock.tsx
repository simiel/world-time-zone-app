import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/lib/timeUtils";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "./ui/input";

interface ClockProps {
  zone: string;
  time: string;
  isLive: boolean;
  onRemove: () => void;
  offset: number;
  onOffsetChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Clock({
  zone,
  time,
  isLive,
  onRemove,
  offset,
  onOffsetChange,
}: ClockProps) {
  const [currentTime, setCurrentTime] = useState(time);

  useEffect(() => {
    setCurrentTime(time);
  }, [time]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-sm font-medium">{zone}</CardTitle>
          <Badge variant={isLive ? "default" : "secondary"} className="mt-1">
            {isLive ? "Live" : "Local"}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={offset}
            onChange={onOffsetChange}
            className="w-20"
            placeholder="Offset"
          />
          <Button variant="ghost" size="sm" onClick={onRemove}>
            Remove
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatTime(currentTime)}</div>
      </CardContent>
    </Card>
  );
}
