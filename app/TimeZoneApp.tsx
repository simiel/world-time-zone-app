"use client";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "@/components/Clock";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { useTimeZones } from "@/hooks/useTimeZones";
import { useDebouncedCallback } from "use-debounce";
import type React from "react";

interface TimeZoneAppProps {
  initialTimeZones: string[];
}

export default function TimeZoneApp({ initialTimeZones }: TimeZoneAppProps) {
  const {
    timeZones,
    times,
    offset,
    setOffset,
    addTimeZone,
    removeTimeZone,
    isLoading,
  } = useTimeZones(initialTimeZones);
  const [newZone, setNewZone] = useState("");
  const [localOffset, setLocalOffset] = useState(offset.toString());

  const debouncedSetOffset = useDebouncedCallback((value: number) => {
    setOffset(value);
  }, 300);

  const handleAddTimeZone = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      addTimeZone(newZone);
      setNewZone("");
    },
    [addTimeZone, newZone]
  );

  const handleOffsetChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newOffset = e.target.value;
      setLocalOffset(newOffset);
      debouncedSetOffset(Number(newOffset) || 0);
    },
    [debouncedSetOffset]
  );

  return (
    <div>
      <LoadingOverlay isLoading={isLoading} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {timeZones.map((zone) => (
          <Clock
            key={zone}
            zone={zone}
            time={times[zone]?.time || ""}
            isLive={times[zone]?.isLive || false}
            onRemove={() => removeTimeZone(zone)}
            offset={offset}
            onOffsetChange={handleOffsetChange}
          />
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Add Time Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleAddTimeZone}
            className="flex items-end space-x-2"
          >
            <div className="flex-grow">
              <Label htmlFor="newZone">Time Zone</Label>
              <Input
                id="newZone"
                value={newZone}
                onChange={(e) => setNewZone(e.target.value)}
                placeholder="e.g. Europe/Paris"
              />
            </div>
            <Button type="submit">Add</Button>
          </form>
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Adjust Offset</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Label htmlFor="offset">Offset (minutes)</Label>
            <Input
              id="offset"
              type="number"
              value={localOffset}
              onChange={handleOffsetChange}
              className="w-24"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
