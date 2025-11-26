'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button' // your button (plain JS)

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null // avoid SSR mismatch

  const current = resolvedTheme || theme || 'light'

  return (
    <Button
      onClick={() => setTheme(current === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {current === 'dark' ? '☀️' : '🌙'}
    </Button>
  )
}
