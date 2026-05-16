import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

type Variant = "primary" | "secondary" | "ghost-destructive"
type ButtonProps = {
    variant?: Variant
} & ComponentProps<"button">


export default function Button({ variant = "primary", className, ...props }: ButtonProps) {
    return (

        <button {...props}
            className={twMerge("bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded disabled:opacity-30 disabled:cursor-not-allowed",

                getVariantStyles(variant), className,
            )}
        />
    )
}


function getVariantStyles(variant: Variant) {
    switch (variant) {
        case "primary":
            return "bg-violet-500 hover:bg-violet-700 "
        case "secondary":
            return "bg-gray-500 hover:bg-gray-700 text-white"
        case "ghost-destructive":
            return " hover:bg-red-900 text-red-900 hover:text-red-300"
        default:
            throw new Error(`Unknown variant: ${variant satisfies never}`)
    }
}