import { useState, type SubmitEvent } from "react";
import Button from "./Button";
import { useHabits } from "../context/useHabits";


export function Habitform() {
  const [name, setName] = useState("")
  const { addHabit } = useHabits()
  function handleSubmit(e: SubmitEvent) {
    e.preventDefault()

    if (name.trim() === "")
      return
    setName("")
    addHabit?.(name)
  }

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        className="flex-1 rounded-lg bg-zinc-800   border border-zinc-500 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter a new habit..." />
      <Button
        disabled={name.trim() === ""}
        className="rounded-lg px-4 py-2 font-medium">Add Habit</Button>
    </form>
  )
}