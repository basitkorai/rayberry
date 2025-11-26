'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const [user, setUser] = useState(null)

  // useEffect(() => {
  //   supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null))
  //   const { data: listener } = supabase.auth.onAuthStateChange(
  //     (_event, session) => {
  //       setUser(session?.user ?? null)
  //     }
  //   )
  //   return () => listener.subscription.unsubscribe()
  // }, [])

  // const signIn = async () => {
  //   // opens provider (Google/GitHub) sign-in flow
  //   await supabase.auth.signInWithOAuth({ provider: 'google' })
  // }

  // const signOut = async () => {
  //   await supabase.auth.signOut()
  //}

  return (
    <nav
      className="sticky top-0 z-40 flex items-center justify-between px-2 py-2
      bg-white/10 dark:bg-black/20 backdrop-blur-md backdrop-saturate-150 border border-white/20 dark:border-white/10"
    >
      <div className="flex items-center gap-3">
        <div className="text-2xl font-bold text-black">rayberry</div>
      </div>

      {/* center nav links - max 5 options */}
      <div className="hidden md:flex items-center justify-center flex-1">
        <div className="flex items-center gap-1 bg-transparent">
          {['Pricing', 'Learn', 'Enterprise', 'Other']
            .slice(0, 5)
            .map((label) => (
              <a
                key={label}
                href="#"
                className="px-3 py-2 rounded-md text-sm font-medium text-white/90 hover:text-white hover:bg-white/5 transition-colors"
              >
                {label}
              </a>
            ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/90">{user.email}</span>
            <Button variant="outline">Sign out</Button>
          </div>
        ) : (
          <Button>Sign in</Button>
        )}
      </div>
    </nav>
  )
}
