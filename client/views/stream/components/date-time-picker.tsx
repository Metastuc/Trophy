import { ChevronDownIcon } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DateTimePickerProps {
    defaultTime?: string;
    onChange: (date?: Date) => void;
}

export function DateTimePicker({ defaultTime, onChange }: DateTimePickerProps) {
    const [state, setState] = useState<DateTimePickerState>(() => ({
        date: undefined,
        isOpen: false,
        time: defaultTime || "10:30:00",
    }));

    useEffect(
        function () {
            if (!state.date || !state.time) {
                onChange(undefined);
                return;
            }

            const [hours, minutes, seconds = "00"] = state.time.split(":");
            const combined = new Date(state.date);
            combined.setHours(Number(hours), Number(minutes), Number(seconds));

            onChange(combined);
        },
        [state.date, state.time, onChange],
    );

    return (
        <div className="flex justify-between gap-4">
            <div className="flex flex-col gap-3">
                <Label htmlFor="date-picker" className="px-1">
                    Date
                </Label>

                <Popover open={state.isOpen} onOpenChange={(isOpen) => setState((state) => ({ ...state, isOpen }))}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" id="date-picker" className="w-32 justify-between font-normal">
                            {state.date ? state.date.toLocaleDateString() : "Select date"}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={state.date}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                                setState((state) => ({ ...state, date, isOpen: false }));
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <div className="flex flex-col gap-3">
                <Label htmlFor="time-picker" className="px-1">
                    Time
                </Label>

                <Input
                    type="time"
                    id="time-picker"
                    step="1"
                    defaultValue={state.time}
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setState((state) => ({ ...state, time: event.target.value }));
                    }}
                />
            </div>
        </div>
    );
}
