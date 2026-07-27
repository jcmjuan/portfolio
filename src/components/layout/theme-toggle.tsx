"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

function ThemeToggle({ className, ...props }: React.ComponentProps<typeof Button>) {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      data-slot="theme-toggle"
      variant="ghost"
      size="icon"
      className={className}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      {...props}
    >
      <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}

export { ThemeToggle }
