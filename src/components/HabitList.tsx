
import { useHabits, type Habit } from "../context/useHabits";
import Button from "./Button";
import {  format, isFuture, isSameDay, subDays } from "date-fns"

type HabitlistProps = {
    visibleDates: Date[]
}

export function HabitList( { visibleDates }: HabitlistProps) {
    const { habits } = useHabits()

    if (habits.length === 0) {
        return (
            <p className="text-center text-zinc-500 py-12">
                No habits added yet.
            </p>
        )
    }
    return (
        <div className="flex flex-col gap-3">
            {habits.map((habit) => (
                <HabitItem key={habit.id} habit={habit} visibleDates={visibleDates}/>
            ))}
        </div>
    )
}

type HabitItemProps = {
    habit: Habit
    visibleDates: Date[]
}


function HabitItem({ habit, visibleDates}: HabitItemProps) {
    const { deleteHabit, toggleHabit } = useHabits()

    const streak = getStreak(habit.completion)

    return (
        <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between ">
                <div className="flex gap-3 items-center ">
                    <span className="font-medium">{habit.name}</span>
                    {streak !== 0 && (
                        <span className="text-sm text-amber-400" >{streak  }🔥</span>
                    )}
                </div>
                <Button
                    onClick={() => deleteHabit(String(habit.id))}
                    variant="ghost-destructive" className="test-sm"  >Delete</Button>
            </div>
            <div className="flex gap-1.5">
                {visibleDates.map(date => (
                    <Button
                        className="flex flex-1 flex-col items-center gap-0.5 rounded-lg text-xs"
                        key={date.toISOString()} disabled={isFuture(date)} onClick={() => toggleHabit(String(habit.id), date)}
                        variant={habit.completion.some(d => isSameDay(date, d)) ?
                            "primary" : "secondary"
                        }
                    >
                        <span className="font-medium">{format(date, "EEE")}</span>
                        <span className="text-sm ">{format(date, "d")}</span>
                    </Button>
                ))}
            </div>
        </div>
    )
}


function getStreak(completion: Date[]) {
    let streak = 0
    let date = new Date()

    while (completion.some(c => isSameDay(c, date))) {
        streak++
        date = subDays(date, 1)
    }
    return streak
}